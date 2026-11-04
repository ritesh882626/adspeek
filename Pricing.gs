/**
 * Pricing.gs
 * Server-side wrapper for PricingCore.
 * Loads PricingCore.html, evaluates it, and provides server pricing calculations and tests.
 */

/**
 * Loads PricingCore.html and returns the pure pricing functions.
 * @return {{computeQuote: Function, stateCodeFromGstin: Function, roundRupee: Function}}
 */
function getPricingEngine_() {
  const html = HtmlService.createHtmlOutputFromFile('PricingCore').getContent();
  const src = html.replace(/<\/?script>/gi, '');
  return new Function(src + '\nreturn { computeQuote: computeQuote, stateCodeFromGstin: stateCodeFromGstin, roundRupee: roundRupee };')();
}

/**
 * Server-side endpoint: recalculates quote from master catalog data.
 * @param {Object} payload User selections and input data
 * @param {string} [staffToken] Optional staff authentication token
 * @return {Object} QuoteResult
 */
function computeQuoteServer(payload, staffToken) {
  const isStaff = isStaffSession_(staffToken);
  const catalog = buildCatalog_(isStaff);
  const engine = getPricingEngine_();
  return engine.computeQuote(catalog, payload, isStaff);
}

/**
 * TEST: run this from the Apps Script editor (select testPricing > Run).
 * Tests all 5 pricing rules and edge cases specified in Section 6.
 */
function testPricing() {
  const engine = getPricingEngine_();

  const mockCatalog = {
    services: [{ id: 'SHOPIFY', name: 'Shopify Store', basePrice: 19499, active: true }],
    components: [
      { id: 'PROD', serviceId: 'SHOPIFY', step: 'Catalogue', name: 'Number of products', type: 'Quantity', rate: 1500, batchSize: 25, includedQty: 20, minQty: 20, maxQty: 500, discountable: true },
      { id: 'CAT', serviceId: 'SHOPIFY', step: 'Catalogue', name: 'Number of categories', type: 'Quantity', rate: 250, batchSize: 1, includedQty: 5, minQty: 5, maxQty: 50, discountable: true },
      { id: 'PAGE-BLOG', serviceId: 'SHOPIFY', step: 'Pages', name: 'Blog', type: 'Optional', rate: 1500, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'PAGE-SIZE', serviceId: 'SHOPIFY', step: 'Pages', name: 'Size guide', type: 'Optional', rate: 750, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'FEAT-HOME', serviceId: 'SHOPIFY', step: 'Features', name: 'Custom homepage', type: 'Optional', rate: 8000, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'FEAT-REV', serviceId: 'SHOPIFY', step: 'Features', name: 'Product reviews', type: 'Optional', rate: 1000, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'FEAT-WISH', serviceId: 'SHOPIFY', step: 'Features', name: 'Wishlist', type: 'Optional', rate: 2000, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'INT-META', serviceId: 'SHOPIFY', step: 'Integrations', name: 'Meta Pixel + Conversions API', type: 'Optional', rate: 2000, batchSize: 0, includedQty: 0, discountable: true },
      { id: 'INT-GST', serviceId: 'SHOPIFY', step: 'Integrations', name: 'GST invoice automation', type: 'Optional', rate: 5000, batchSize: 0, includedQty: 0, discountable: true }
    ],
    settings: { gstRate: 0.18, homeStateCode: '06', maxStaffDiscount: 0.15 }
  };

  console.log('--- Running Pricing Tests ---');

  // Test 1: Full package expected price
  const res1 = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    selections: [
      { componentId: 'PROD', qty: 40 },
      { componentId: 'CAT', qty: 8 },
      { componentId: 'PAGE-BLOG', qty: 1 },
      { componentId: 'PAGE-SIZE', qty: 1 },
      { componentId: 'FEAT-HOME', qty: 1 },
      { componentId: 'FEAT-REV', qty: 1 },
      { componentId: 'FEAT-WISH', qty: 1 },
      { componentId: 'INT-META', qty: 1 },
      { componentId: 'INT-GST', qty: 1 }
    ]
  }, false);

  if (res1.expectedPrice !== 41999) throw new Error('Test 1 Failed: Expected ₹41,999, got ₹' + res1.expectedPrice);
  if (res1.gstAmount !== 7559.82) throw new Error('Test 1 Failed: Expected GST ₹7,559.82, got ₹' + res1.gstAmount);
  if (res1.grandTotal !== 49558.82) throw new Error('Test 1 Failed: Expected Total ₹49,558.82, got ₹' + res1.grandTotal);
  console.log('✓ Test 1 Passed: Expected ₹41,999, GST ₹7,559.82, Total ₹49,558.82');

  // Test 2: Staff price override and discount allocation
  const res2 = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    selections: [
      { componentId: 'PROD', qty: 40 },
      { componentId: 'CAT', qty: 8 },
      { componentId: 'PAGE-BLOG', qty: 1 },
      { componentId: 'PAGE-SIZE', qty: 1 },
      { componentId: 'FEAT-HOME', qty: 1 },
      { componentId: 'FEAT-REV', qty: 1 },
      { componentId: 'FEAT-WISH', qty: 1 },
      { componentId: 'INT-META', qty: 1 },
      { componentId: 'INT-GST', qty: 1 }
    ],
    finalPriceOverride: 38000
  }, true);

  const lineSum = res2.lines.reduce(function(sum, l) { return sum + l.finalAmount; }, 0);
  if (res2.discountPct !== 9.52) throw new Error('Test 2 Failed: Expected 9.52% discount, got ' + res2.discountPct + '%');
  if (lineSum !== 38000) throw new Error('Test 2 Failed: Lines sum to ₹' + lineSum + ', expected ₹38,000');
  if (res2.gstAmount !== 6840) throw new Error('Test 2 Failed: Expected GST ₹6,840, got ₹' + res2.gstAmount);
  if (res2.grandTotal !== 44840) throw new Error('Test 2 Failed: Expected Total ₹44,840, got ₹' + res2.grandTotal);
  console.log('✓ Test 2 Passed: Staff final ₹38,000, 9.52% discount, lines sum exactly to ₹38,000, Total ₹44,840');

  // Test 3: Base only
  const res3 = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    selections: [
      { componentId: 'PROD', qty: 20 },
      { componentId: 'CAT', qty: 5 }
    ]
  }, false);

  if (res3.expectedPrice !== 19499) throw new Error('Test 3 Failed: Expected ₹19,499, got ₹' + res3.expectedPrice);
  console.log('✓ Test 3 Passed: Base package only is ₹19,499');

  // Test 4: Batch tiers (25 products / batch)
  const res4a = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    selections: [{ componentId: 'PROD', qty: 45 }]
  }, false);
  const res4b = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    selections: [{ componentId: 'PROD', qty: 46 }]
  }, false);

  const extra4a = res4a.expectedPrice - 19499;
  const extra4b = res4b.expectedPrice - 19499;
  if (extra4a !== 1500) throw new Error('Test 4a Failed: Expected ₹1,500 for 25 extra, got ₹' + extra4a);
  if (extra4b !== 3000) throw new Error('Test 4b Failed: Expected ₹3,000 for 26 extra, got ₹' + extra4b);
  console.log('✓ Test 4 Passed: 25 extra = 1 batch (₹1,500); 26 extra = 2 batches (₹3,000)');

  // Test 5: GST State logic (06 -> CGST+SGST, 07 -> IGST)
  const res5a = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    client: { gstin: '06AAAAA0000A1Z5' }
  }, false);
  const res5b = engine.computeQuote(mockCatalog, {
    serviceId: 'SHOPIFY',
    client: { gstin: '07AAAAA0000A1Z5' }
  }, false);

  if (res5a.taxType !== 'CGST+SGST') throw new Error('Test 5a Failed: Expected CGST+SGST for 06, got ' + res5a.taxType);
  if (res5b.taxType !== 'IGST') throw new Error('Test 5b Failed: Expected IGST for 07, got ' + res5b.taxType);
  console.log('✓ Test 5 Passed: GSTIN starting 06 -> CGST+SGST; starting 07 -> IGST');

  console.log('--- ALL PRICING TESTS PASSED (5/5) ---');
}

