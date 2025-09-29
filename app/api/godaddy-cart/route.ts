import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { domains } = await req.json();

        if (!domains || !Array.isArray(domains)) {
            console.error("Invalid domains input:", domains);
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const planId = process.env.GODADDY_RESELLER_PLAN_ID;
        const resellerKey = process.env.GODADDY_RESELLER_KEY;
        const resellerSecret = process.env.GODADDY_RESELLER_SECRET;

        // ✅ Log environment (only for local debugging — remove in production!)
        console.log("Plan ID:", planId);
        console.log("Reseller Key:", resellerKey?.slice(0, 4) + '****');
        console.log("Reseller Secret:", resellerSecret?.slice(0, 4) + '****');

        const url = `https://salesproducts.api.secureserver.net/v1/pl/${planId}/cart/packages`;

        const payload = {
            items: domains.map((domain: string) => ({
                product: 'domain',
                domain: domain,
                duration: 1,
                tlds: [domain.split('.').pop()],
            })),
        };

        // ✅ Log payload being sent
        console.log("Sending Payload to GoDaddy Cart API:", JSON.stringify(payload, null, 2));

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `sso-key ${resellerKey}:${resellerSecret}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        // ✅ Log raw response
        console.log("GoDaddy Cart API Response:", JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error("GoDaddy Cart API Error:", data);
            return NextResponse.json({ error: 'Failed to add to cart', details: data }, { status: 500 });
        }

        // ✅ Success
        return NextResponse.json(data);

    } catch (err: any) {
        console.error("Unexpected Error in godaddy-cart API:", err.message || err);
        return NextResponse.json({ error: 'Server error', details: err.message || err }, { status: 500 });
    }
}
