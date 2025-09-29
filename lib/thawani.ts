export async function createThawaniSession({
    client_reference_id,
    product,
    amount,
    metadata,
    success_url,
    cancel_url,
}: {
    client_reference_id: string;
    product: string;
    amount: number;
    metadata?: Record<string, string>;
    success_url: string;
    cancel_url: string;
}) {
    try {
        const response = await fetch("https://checkout.thawani.om/api/v1/checkout/session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "thawani-api-key": process.env.NEXT_PUBLIC_THAWANI_SECRET_KEY!,
            },
            body: JSON.stringify({
                client_reference_id,
                mode: "payment",
                products: [
                    {
                        name: product,
                        quantity: 1,
                        unit_amount: amount,
                    },
                ],
                success_url,
                cancel_url,
                metadata,
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error("Thawani API Error:", result);
            throw new Error(result.message || "Thawani session creation failed");
        }

        return result;
    } catch (error) {
        console.error("Failed to create Thawani session", error);
        throw error;
    }
}
