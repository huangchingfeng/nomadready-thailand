'use client';

const LICENSE_KEY_STORAGE = 'nomadready_license_key';

export function isProUser(): boolean {
  if (typeof window === 'undefined') return false;
  const key = localStorage.getItem(LICENSE_KEY_STORAGE);
  return !!key && key.trim().length > 0;
}

export function setLicenseKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LICENSE_KEY_STORAGE, key.trim());
}

export function clearLicenseKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LICENSE_KEY_STORAGE);
}

export function getLicenseKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LICENSE_KEY_STORAGE);
}
