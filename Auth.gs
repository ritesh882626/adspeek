/**
 * Auth.gs
 * Staff authentication and session management.
 *
 * Public API (callable from the form with google.script.run):
 *   staffLogin(password) -> { token, expiresInMinutes }
 *   staffLogout(token)   -> { ok: true }
 *
 * Internal API:
 *   verifyStaffToken_(token) -> boolean
 */

const AUTH_CONFIG = {
  TOKEN_PREFIX: 'STAFF_SESSION_',
  FAILURES_KEY: 'STAFF_LOGIN_FAILURES',
  LOCKED_KEY: 'STAFF_LOGIN_LOCKED',
  // Apps Script ScriptCache max TTL is 21600 seconds (6 hours / 360 minutes)
  TOKEN_TTL_SECONDS: 21600,
  LOCKOUT_SECONDS: 900, // 15 minutes
  MAX_FAILURES: 10
};

/**
 * Validates staff password against Script Property STAFF_PASSWORD.
 * Issues a temporary UUID session token on success.
 * @param {string} password
 * @return {{token: string, expiresInMinutes: number}}
 */
function staffLogin(password) {
  const cache = CacheService.getScriptCache();

  // 1. Check brute-force lockout
  const isLocked = cache.get(AUTH_CONFIG.LOCKED_KEY);
  if (isLocked) {
    throw new Error('Too many attempts. Try again in 15 minutes.');
  }

  const failures = Number(cache.get(AUTH_CONFIG.FAILURES_KEY)) || 0;
  if (failures >= AUTH_CONFIG.MAX_FAILURES) {
    cache.put(AUTH_CONFIG.LOCKED_KEY, '1', AUTH_CONFIG.LOCKOUT_SECONDS);
    throw new Error('Too many attempts. Try again in 15 minutes.');
  }

  // 2. Verify password from Script Properties
  const scriptProps = PropertiesService.getScriptProperties();
  const correctPassword = scriptProps.getProperty(CONFIG.PROPS.STAFF_PASSWORD);

  if (!correctPassword) {
    throw new Error('Staff password is not configured in Script Properties.');
  }

  if (typeof password !== 'string' || password !== correctPassword) {
    const newFailures = failures + 1;
    cache.put(AUTH_CONFIG.FAILURES_KEY, String(newFailures), AUTH_CONFIG.LOCKOUT_SECONDS);
    if (newFailures >= AUTH_CONFIG.MAX_FAILURES) {
      cache.put(AUTH_CONFIG.LOCKED_KEY, '1', AUTH_CONFIG.LOCKOUT_SECONDS);
      throw new Error('Too many attempts. Try again in 15 minutes.');
    }
    throw new Error('Incorrect password. Try again.');
  }

  // 3. Successful login - clear failure count and issue token
  cache.remove(AUTH_CONFIG.FAILURES_KEY);
  cache.remove(AUTH_CONFIG.LOCKED_KEY);

  const token = Utilities.getUuid();
  cache.put(AUTH_CONFIG.TOKEN_PREFIX + token, '1', AUTH_CONFIG.TOKEN_TTL_SECONDS);

  return {
    token: token,
    expiresInMinutes: Math.round(AUTH_CONFIG.TOKEN_TTL_SECONDS / 60)
  };
}

/**
 * Internal: returns true if the staff token exists and is valid in cache.
 * @param {string} token
 * @return {boolean}
 */
function verifyStaffToken_(token) {
  if (!token || typeof token !== 'string') return false;
  const cache = CacheService.getScriptCache();
  const val = cache.get(AUTH_CONFIG.TOKEN_PREFIX + token);
  return val === '1';
}

/**
 * Logs out staff by invalidating the token in cache.
 * @param {string} token
 * @return {{ok: boolean}}
 */
function staffLogout(token) {
  if (token && typeof token === 'string') {
    CacheService.getScriptCache().remove(AUTH_CONFIG.TOKEN_PREFIX + token);
  }
  return { ok: true };
}

/**
 * TEST: run this from the Apps Script editor (select testAuth > Run).
 * Verifies token creation, verification, and logout.
 */
function testAuth() {
  console.log('--- Testing Auth Logic ---');
  // Mock test using random token
  const testToken = Utilities.getUuid();
  const cache = CacheService.getScriptCache();
  cache.put(AUTH_CONFIG.TOKEN_PREFIX + testToken, '1', 60);

  if (!verifyStaffToken_(testToken)) throw new Error('verifyStaffToken_ failed for valid token.');
  console.log('✓ Token verification succeeded for active token.');

  staffLogout(testToken);
  if (verifyStaffToken_(testToken)) throw new Error('verifyStaffToken_ succeeded for revoked token.');
  console.log('✓ Token revocation succeeded on logout.');

  if (verifyStaffToken_('invalid-random-token')) throw new Error('verifyStaffToken_ succeeded for invalid token.');
  console.log('✓ Invalid token correctly rejected.');

  console.log('--- All Auth tests passed ---');
}

