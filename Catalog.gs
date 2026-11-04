/**
 * Catalog.gs
 * Reads Services, Components and Settings and returns what the form needs.
 *
 * Public API (callable from the form with google.script.run):
 *   getCatalog(staffToken) -> Catalog object
 */

/**
 * Returns the catalog for the form.
 * Staff-only components are included only when staffToken is valid.
 * Cached for 10 minutes; the cache is cleared when the sheet is edited (see onEdit in Code.gs).
 */
function getCatalog(staffToken) {
  const isStaff = isStaffSession_(staffToken);
  const cache = CacheService.getScriptCache();
  const key = isStaff ? CONFIG.CACHE.STAFF : CONFIG.CACHE.PUBLIC;

  const cached = cache.get(key);
  if (cached) return JSON.parse(cached);

  const catalog = buildCatalog_(isStaff);
  try {
    cache.put(key, JSON.stringify(catalog), CONFIG.CACHE.TTL_SECONDS);
  } catch (err) {
    // Cache values are limited to 100 KB. If the catalog grows past that, it is simply not cached.
    console.warn('Catalog not cached: ' + err.message);
  }
  return catalog;
}

/** True when a valid staff token is passed. verifyStaffToken_ is defined in Auth.gs (Step 4). */
function isStaffSession_(staffToken) {
  if (!staffToken) return false;
  if (typeof verifyStaffToken_ !== 'function') return false;
  return verifyStaffToken_(staffToken) === true;
}

/** Builds the catalog object from the sheet (no cache). */
function buildCatalog_(isStaff) {
  const S = CONFIG.SERVICE;
  const C = CONFIG.COMPONENT;
  const K = CONFIG.SETTING_KEYS;

  // ---- Services ----
  const svcData = getSheetObjects_(CONFIG.SHEETS.SERVICES);
  requireHeaders_(CONFIG.SHEETS.SERVICES, svcData.headers, [S.ID, S.NAME, S.BASE_PRICE, S.ACTIVE]);

  const services = svcData.rows
    .filter(function (r) { return toStr_(r[S.ID]); })
    .map(function (r) {
      return {
        id: toStr_(r[S.ID]),
        name: toStr_(r[S.NAME]),
        basePrice: toNum_(r[S.BASE_PRICE], 0),
        active: isYes_(r[S.ACTIVE]),
        sortOrder: toNum_(r[S.SORT], 999),
        description: toStr_(r[S.DESCRIPTION])
      };
    })
    .sort(function (a, b) { return a.sortOrder - b.sortOrder; });

  // ---- Components ----
  const compData = getSheetObjects_(CONFIG.SHEETS.COMPONENTS);
  requireHeaders_(CONFIG.SHEETS.COMPONENTS, compData.headers,
    [C.ID, C.SERVICE_ID, C.STEP, C.NAME, C.TYPE, C.RATE, C.ACTIVE, C.VISIBLE_TO]);
  const hasTag = compData.headers.indexOf(C.TAG) !== -1;

  const components = compData.rows
    .filter(function (r) { return toStr_(r[C.ID]) && isYes_(r[C.ACTIVE]); })
    .filter(function (r) { return isStaff || toStr_(r[C.VISIBLE_TO]) !== 'Staff'; })
    .map(function (r) {
      return {
        id: toStr_(r[C.ID]),
        serviceId: toStr_(r[C.SERVICE_ID]),
        step: toStr_(r[C.STEP]),
        name: toStr_(r[C.NAME]),
        description: toStr_(r[C.DESCRIPTION]),
        type: toStr_(r[C.TYPE]),
        rate: toNum_(r[C.RATE], 0),
        unit: toStr_(r[C.UNIT]),
        batchSize: toNum_(r[C.BATCH], 0),
        includedQty: toNum_(r[C.INCLUDED], 0),
        minQty: toNum_(r[C.MIN], null),
        maxQty: toNum_(r[C.MAX], null),
        defaultOn: isYes_(r[C.DEFAULT_ON]),
        monthlyCost: toStr_(r[C.MONTHLY]),
        visibleTo: toStr_(r[C.VISIBLE_TO]) || 'Public',
        discountable: isYes_(r[C.DISCOUNTABLE]),
        sortOrder: toNum_(r[C.SORT], 999),
        tag: hasTag ? (toStr_(r[C.TAG]) || null) : null
        // Base value is internal and intentionally NOT sent to the form.
      };
    })
    .sort(function (a, b) {
      const stepDiff = CONFIG.STEPS.indexOf(a.step) - CONFIG.STEPS.indexOf(b.step);
      return stepDiff !== 0 ? stepDiff : a.sortOrder - b.sortOrder;
    });

  // ---- Settings ----
  const map = getSettingsMap_();
  const whatsapp = toStr_(map[K.WHATSAPP]).replace(/\D/g, '');
  const settings = {
    gstRate: toFraction_(map[K.GST_RATE], 0.18),
    homeStateCode: toStateCode_(map[K.HOME_STATE]) || '06',
    maxStaffDiscount: toFraction_(map[K.MAX_DISCOUNT], 0.15),
    estimateValidityDays: toNum_(map[K.VALIDITY_DAYS], 15),
    whatsappNumber: whatsapp || null
  };

  const catalog = {
    services: services,
    components: components,
    settings: settings,
    states: CONFIG.STATES,
    isStaff: isStaff
  };
  catalog.catalogVersion = shortHash_(JSON.stringify(catalog));
  return catalog;
}

/** Removes both cached catalogs. Called by onEdit and the AdsPeek menu. */
function clearCatalogCache_() {
  CacheService.getScriptCache().removeAll([CONFIG.CACHE.PUBLIC, CONFIG.CACHE.STAFF]);
}

/**
 * Checks the master sheet for mistakes and returns a list of problems.
 * Runs from the AdsPeek menu ("Check price sheet") and from testCatalog().
 */
function validateCatalog_() {
  const S = CONFIG.SERVICE;
  const C = CONFIG.COMPONENT;
  const issues = [];

  const svcRows = getSheetObjects_(CONFIG.SHEETS.SERVICES).rows;
  const compRows = getSheetObjects_(CONFIG.SHEETS.COMPONENTS).rows;
  const serviceIds = svcRows.map(function (r) { return toStr_(r[S.ID]); });
  const seenIds = {};

  compRows.forEach(function (r) {
    const id = toStr_(r[C.ID]);
    const where = 'Components row ' + r._row + (id ? ' (' + id + ')' : '');
    if (!id) { issues.push(where + ': Component ID is empty.'); return; }
    if (seenIds[id]) issues.push(where + ': duplicate Component ID (also row ' + seenIds[id] + ').');
    seenIds[id] = r._row;

    if (serviceIds.indexOf(toStr_(r[C.SERVICE_ID])) === -1) issues.push(where + ': Service ID "' + toStr_(r[C.SERVICE_ID]) + '" does not exist in Services.');
    if (CONFIG.STEPS.indexOf(toStr_(r[C.STEP])) === -1) issues.push(where + ': Step "' + toStr_(r[C.STEP]) + '" is not valid.');
    const type = toStr_(r[C.TYPE]);
    if (CONFIG.TYPES.indexOf(type) === -1) issues.push(where + ': Type "' + type + '" is not valid.');
    if (CONFIG.VISIBILITY.indexOf(toStr_(r[C.VISIBLE_TO]) || 'Public') === -1) issues.push(where + ': Visible to must be Public or Staff.');

    const rate = toNum_(r[C.RATE], 0);
    if ((type === 'Quantity' || type === 'Optional' || type === 'Optional + Qty') && rate <= 0) {
      issues.push(where + ': ' + type + ' item needs a Rate above 0.');
    }
    const min = toNum_(r[C.MIN], null);
    const max = toNum_(r[C.MAX], null);
    if (min !== null && max !== null && min > max) issues.push(where + ': Min qty is greater than Max qty.');
  });

  // Base check: active components' base values must add up to each active service's base price
  svcRows.forEach(function (s) {
    if (!isYes_(s[S.ACTIVE])) return;
    const sid = toStr_(s[S.ID]);
    const base = toNum_(s[S.BASE_PRICE], 0);
    const sum = compRows
      .filter(function (r) { return toStr_(r[C.SERVICE_ID]) === sid && isYes_(r[C.ACTIVE]); })
      .reduce(function (t, r) { return t + toNum_(r[C.BASE_VALUE], 0); }, 0);
    if (sum !== base) issues.push('Service ' + sid + ': base values add up to ₹' + sum + ' but Base price is ₹' + base + '.');
    const count = compRows.filter(function (r) { return toStr_(r[C.SERVICE_ID]) === sid && isYes_(r[C.ACTIVE]); }).length;
    if (count === 0) issues.push('Service ' + sid + ' is active but has no active components.');
  });

  return issues;
}

/**
 * TEST: run this from the Apps Script editor (select testCatalog > Run).
 * Shows counts in the execution log and lists any sheet problems.
 */
function testCatalog() {
  clearCatalogCache_();
  const pub = buildCatalog_(false);
  const staff = buildCatalog_(true);
  console.log('Services: ' + pub.services.length + ' (active: ' +
    pub.services.filter(function (s) { return s.active; }).length + ')');
  console.log('Public components: ' + pub.components.length + ' | Staff components: ' + staff.components.length);
  CONFIG.STEPS.forEach(function (step) {
    console.log('  ' + step + ': ' + pub.components.filter(function (c) { return c.step === step; }).length);
  });
  console.log('Settings: ' + JSON.stringify(pub.settings));
  console.log('Catalog version: ' + pub.catalogVersion);
  const issues = validateCatalog_();
  console.log(issues.length ? 'PROBLEMS FOUND:\n- ' + issues.join('\n- ') : 'Price sheet check: no problems found.');
}
