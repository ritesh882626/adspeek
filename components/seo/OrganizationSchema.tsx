import React from 'react';

export const OrganizationSchema: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    name: 'AdsPeek',
    url: '[SITE URL]',
    logo: '[LOGO URL]',
    telephone: '[PHONE]',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sector 22',
      addressLocality: 'Gurugram',
      addressRegion: 'Haryana',
      addressCountry: 'IN',
      postalCode: '[PIN]',
    },
    sameAs: ['[social links]'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
