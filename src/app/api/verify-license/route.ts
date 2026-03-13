import { NextRequest, NextResponse } from 'next/server';

// Gumroad product ID (replace with actual value after listing)
const GUMROAD_PRODUCT_ID = process.env.GUMROAD_PRODUCT_ID || 'nomadready-thailand';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json(null, { status: 204, headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { license_key } = body as { license_key?: string };

    if (!license_key || typeof license_key !== 'string' || license_key.trim().length === 0) {
      return NextResponse.json(
        { valid: false, error: 'License key is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const gumroadApiKey = process.env.GUMROAD_API_KEY;

    // Dev mode: no Gumroad API key, accept any non-empty license key
    if (!gumroadApiKey) {
      console.log('[verify-license] Dev mode: accepting any non-empty license key');
      return NextResponse.json(
        {
          valid: true,
          email: 'dev@nomadready.com',
          purchase: {
            id: 'dev-mode',
            product_name: 'NomadReady Thailand Guide (Dev)',
            created_at: new Date().toISOString(),
          },
          dev_mode: true,
        },
        { headers: corsHeaders }
      );
    }

    // Production mode: call Gumroad API to verify license key
    const gumroadResponse = await fetch('https://api.gumroad.com/v2/licenses/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        product_id: GUMROAD_PRODUCT_ID,
        license_key: license_key.trim(),
      }).toString(),
    });

    const gumroadData = await gumroadResponse.json();

    if (gumroadResponse.ok && gumroadData.success) {
      const purchase = gumroadData.purchase || {};
      return NextResponse.json(
        {
          valid: true,
          email: purchase.email || null,
          purchase: {
            id: purchase.id,
            product_name: purchase.product_name,
            created_at: purchase.created_at,
            variants: purchase.variants,
            refunded: purchase.refunded || false,
            chargebacked: purchase.chargebacked || false,
          },
        },
        { headers: corsHeaders }
      );
    }

    // Verification failed
    return NextResponse.json(
      { valid: false, error: gumroadData.message || 'Invalid license key' },
      { status: 401, headers: corsHeaders }
    );
  } catch (error) {
    console.error('[verify-license] Error:', error);
    return NextResponse.json(
      { valid: false, error: 'Verification service unavailable' },
      { status: 500, headers: corsHeaders }
    );
  }
}
