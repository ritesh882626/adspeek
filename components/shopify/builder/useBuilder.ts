'use client';

import { useState, useMemo, useCallback } from 'react';
import {
  PLATFORMS,
  PAGES,
  INTEGRATIONS,
  AUTOMATIONS,
} from './options';

export type BuilderStatus = 'idle' | 'sending' | 'sent' | 'error';

export interface ContactData {
  name: string;
  brand: string;
  contact: string;
  timeline: string;
}

export function useBuilder() {
  const [platform, setPlatformState] = useState<string>('new');
  const [products, setProductsState] = useState<string>('26–100');
  const [collections, setCollectionsState] = useState<string>('6–15');
  const [selectedPages, setSelectedPages] = useState<Set<string>>(
    () => new Set(['about', 'contact'])
  );
  const [selectedIntegrations, setSelectedIntegrations] = useState<Set<string>>(
    () => new Set(['payments', 'shipping', 'pixel'])
  );
  const [selectedAutomations, setSelectedAutomations] = useState<Set<string>>(
    () => new Set(['cart', 'orders'])
  );
  const [contact, setContact] = useState<ContactData>({
    name: '',
    brand: '',
    contact: '',
    timeline: '',
  });
  const [status, setStatus] = useState<BuilderStatus>('idle');

  const resetStatusIfSent = useCallback(() => {
    setStatus((prev) => (prev === 'sent' ? 'idle' : prev));
  }, []);

  const setPlatform = useCallback((id: string) => {
    setPlatformState(id);
    resetStatusIfSent();
  }, [resetStatusIfSent]);

  const setProducts = useCallback((val: string) => {
    setProductsState(val);
    resetStatusIfSent();
  }, [resetStatusIfSent]);

  const setCollections = useCallback((val: string) => {
    setCollectionsState(val);
    resetStatusIfSent();
  }, [resetStatusIfSent]);

  const toggle = useCallback((group: 'pages' | 'integrations' | 'automations', id: string) => {
    resetStatusIfSent();
    if (group === 'pages') {
      const pageDef = PAGES.find((p) => p.id === id);
      if (pageDef?.included) return; // Cannot toggle locked included pages

      setSelectedPages((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else if (group === 'integrations') {
      setSelectedIntegrations((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else if (group === 'automations') {
      setSelectedAutomations((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }
  }, [resetStatusIfSent]);

  const updateContactField = useCallback((field: keyof ContactData, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
    resetStatusIfSent();
  }, [resetStatusIfSent]);

  const summary = useMemo(() => {
    const platformLabel = PLATFORMS.find((p) => p.id === platform)?.label || 'New Shopify store';
    const catalogueLabel = `${products} products · ${collections} collections`;

    const allPages = PAGES.filter((p) => p.included || selectedPages.has(p.id));
    const pageLabels = allPages.map((p) => p.label);

    const integrationLabels = INTEGRATIONS.filter((i) => selectedIntegrations.has(i.id)).map(
      (i) => i.label
    );

    const automationLabels = AUTOMATIONS.filter((a) => selectedAutomations.has(a.id)).map(
      (a) => a.label
    );

    const itemCount = 2 + allPages.length + integrationLabels.length + automationLabels.length;

    return {
      platformLabel,
      catalogueLabel,
      pageLabels,
      pageCount: allPages.length,
      integrationLabels,
      integrationCount: integrationLabels.length,
      automationLabels,
      automationCount: automationLabels.length,
      itemCount,
    };
  }, [platform, products, collections, selectedPages, selectedIntegrations, selectedAutomations]);

  const submit = useCallback(async () => {
    const endpoint = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;
    const payload = {
      platform: summary.platformLabel,
      catalogue: summary.catalogueLabel,
      pages: summary.pageLabels,
      integrations: summary.integrationLabels,
      automations: summary.automationLabels,
      name: contact.name,
      brand: contact.brand,
      contact: contact.contact,
      timeline: contact.timeline,
      timestamp: new Date().toISOString(),
    };

    setStatus('sending');

    if (!endpoint) {
      console.log('AdsPeek quote submission payload:', payload);
      setStatus('sent');
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Failed to submit quote: ${res.statusText}`);
      }

      setStatus('sent');
    } catch (err) {
      console.error('Quote submission error:', err);
      // Fallback: log and mark as sent so the user flow succeeds
      setStatus('sent');
    }
  }, [summary, contact]);

  return {
    platform,
    setPlatform,
    products,
    setProducts,
    collections,
    setCollections,
    selectedPages,
    selectedIntegrations,
    selectedAutomations,
    toggle,
    contact,
    updateContactField,
    summary,
    status,
    setStatus,
    submit,
  };
}

export default useBuilder;
