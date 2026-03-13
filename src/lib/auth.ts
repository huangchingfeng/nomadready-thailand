'use client';

const LICENSE_KEY_STORAGE = 'nomadready_license_key';
export const LICENSE_VERIFIED_KEY = 'nomadready_license_verified_at';

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
  localStorage.removeItem(LICENSE_VERIFIED_KEY);
}

export function getLicenseKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(LICENSE_KEY_STORAGE);
}

/**
 * Verify a license key server-side via /api/verify-license.
 * On success: stores the key + verification timestamp in localStorage.
 * On failure: removes the key from localStorage.
 */
export async function verifyLicenseKey(key: string): Promise<boolean> {
  if (!key || key.trim().length === 0) {
    clearLicenseKey();
    return false;
  }

  try {
    const response = await fetch('/api/verify-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license_key: key.trim() }),
    });

    const data = await response.json();

    if (data.valid) {
      // Store the key and mark verification timestamp
      setLicenseKey(key);
      localStorage.setItem(LICENSE_VERIFIED_KEY, new Date().toISOString());
      return true;
    }

    // Verification failed — remove stored key
    clearLicenseKey();
    return false;
  } catch (error) {
    console.error('[auth] License verification failed:', error);
    // Network error — don't clear the key (might be offline)
    // but return false so caller knows verification didn't succeed
    return false;
  }
}
