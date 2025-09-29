// app/api/check-domain/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.ote-godaddy.com/v1'; // ✅ OTE URL
const headers = {
  Authorization: `sso-key ${process.env.GODADDY_KEY}:${process.env.GODADDY_SECRET}`,
  Accept: 'application/json',
};

export async function GET(req: NextRequest) {
  const domain = req.nextUrl.searchParams.get('search');
  if (!domain) {
    return NextResponse.json({ error: 'No domain provided' }, { status: 400 });
  }

  const base = domain.split('.')[0];
  const tldExtensions = ['.com', '.net', '.org', '.co'];
  const variations = tldExtensions.map((ext) => `${base}${ext}`);

  const domains = [];

  for (let d of variations) {
    try {
      const response = await fetch(
        `${BASE_URL}/domains/available?domain=${d}&checkType=FAST&forTransfer=false`,
        { headers }
      );

      const data = await response.json();

      domains.push({
        domain: d,
        available: data.available || false,
        price: data.price ? data.price / 1_000_000 : 0,
        currency: data.currency || 'USD',
        buyLink: `https://www.godaddy.com/domainsearch/find?checkAvail=1&tmskey=&domainToCheck=${d}`,
      });
    } catch (err) {
      console.error(`❌ Failed for ${d}:`, err);
    }
  }

  return NextResponse.json({ domains });
}
