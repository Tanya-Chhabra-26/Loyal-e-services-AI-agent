// app/api/thawani-session/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const body = await req.json();

    const response = await fetch('https://checkout.thawani.om/api/v1/checkout/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.THAWANI_SECRET_KEY}`,
        },
        body: JSON.stringify({
            client_reference_id: body.client_reference_id,
            mode: 'payment',
            products: body.products,
            success_url: body.success_url,
            cancel_url: body.cancel_url,
            metadata: body.metadata,
        }),
    });

    const data = await response.json();
    return NextResponse.json(data);
}
