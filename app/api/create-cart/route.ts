// app/api/create-cart/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { domains } = await req.json();

        if (!domains || !Array.isArray(domains)) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const response = await fetch('https://api.ote-godaddy.com/v1/shoppers/carts', {
            method: 'POST',
            headers: {
                Authorization: `sso-key ${process.env.GODADDY_KEY}:${process.env.GODADDY_SECRET}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                items: domains.map((domain: string) => ({
                    product: 'domain',
                    domain,
                    duration: 1,
                })),
            }),
        });

        const data = await response.json();

        if (!response.ok || !data.redirectUrl) {
            console.error('❌ Cart creation failed:', data);
            return NextResponse.json({ error: 'Cart creation failed', details: data }, { status: 500 });
        }

        console.log('✅ GoDaddy Cart Created:', data.redirectUrl);
        return NextResponse.json({ redirectUrl: data.redirectUrl });
    } catch (err) {
        console.error('❌ Server error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
