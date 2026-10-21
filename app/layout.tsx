import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/ui/JsonLd';
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';
import { constructMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = constructMetadata({
  title: 'AdsPeek | Shopify Store Development & eCommerce Agency',
  description:
    'AdsPeek builds, designs, and scales high-converting Shopify and Shopify Plus storefronts for ambitious direct-to-consumer brands globally.',
  path: '',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#0C5A48] selection:text-white">
        {children}
      </body>
    </html>
  );
}
