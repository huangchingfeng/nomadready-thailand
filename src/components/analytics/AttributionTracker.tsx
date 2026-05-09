'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

const STORAGE_KEY = 'nomadready_attribution';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export type AttributionFields = {
  landing_path?: string;
  referrer?: string;
  captured_at?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export function getStoredAttribution(): AttributionFields {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AttributionFields) : {};
  } catch {
    return {};
  }
}

export default function AttributionTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmFields = UTM_KEYS.reduce<AttributionFields>((acc, key) => {
      const value = params.get(key);
      if (value) acc[key] = value;
      return acc;
    }, {});

    const hasUtm = Object.keys(utmFields).length > 0;
    const existing = getStoredAttribution();
    const shouldCapture = hasUtm || !existing.landing_path;

    if (!shouldCapture) return;

    const attribution: AttributionFields = {
      ...existing,
      ...utmFields,
      landing_path: window.location.pathname,
      referrer: document.referrer || existing.referrer || '',
      captured_at: new Date().toISOString(),
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));

    if (hasUtm) {
      track('utm_captured', {
        source: attribution.utm_source || '',
        medium: attribution.utm_medium || '',
        campaign: attribution.utm_campaign || '',
        content: attribution.utm_content || '',
        term: attribution.utm_term || '',
        landing_path: attribution.landing_path || '',
      });
    }
  }, []);

  return null;
}
