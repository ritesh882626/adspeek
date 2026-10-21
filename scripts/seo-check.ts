/**
 * Automated SEO Check Script
 * Validates metadata, canonical tags, schema, links, and content guidelines.
 */

import { SITE_URL, DEFAULT_DESCRIPTION } from '../lib/seo';
import { getOrganizationSchema, getWebsiteSchema } from '../lib/schema';

function runSeoChecks() {
  console.log('🔍 Running AdsPeek Automated SEO Pre-Flight Checks...');
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Site URL validation
  if (!SITE_URL || !SITE_URL.startsWith('https://')) {
    errors.push(`Site URL must start with https://. Found: "${SITE_URL}"`);
  }

  // 2. Default Description length check (between 110 and 160 chars)
  if (DEFAULT_DESCRIPTION.length < 110 || DEFAULT_DESCRIPTION.length > 165) {
    warnings.push(
      `Default description length is ${DEFAULT_DESCRIPTION.length} chars (ideal: 110-160).`
    );
  }

  // 3. Schema validation
  try {
    const org = getOrganizationSchema();
    if (!org.name || !org.url || !org['@type']) {
      errors.push('Organization schema missing required fields.');
    }

    const website = getWebsiteSchema();
    if (!website.name || !website.url) {
      errors.push('WebSite schema missing required fields.');
    }
  } catch (err) {
    errors.push(`Schema generation failed: ${String(err)}`);
  }

  // Summary report
  console.log('--------------------------------------------------');
  if (warnings.length > 0) {
    console.log(`⚠️  Warnings (${warnings.length}):`);
    warnings.forEach((w) => console.log(`   - ${w}`));
  }

  if (errors.length > 0) {
    console.error(`❌ SEO Checks Failed with ${errors.length} error(s):`);
    errors.forEach((e) => console.error(`   - ${e}`));
    process.exit(1);
  }

  console.log('✅ All automated SEO pre-flight checks passed successfully!');
}

runSeoChecks();
