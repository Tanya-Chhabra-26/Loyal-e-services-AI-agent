"use client";

import { Easing, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Modal from "../Modal";
import StepTwo from "../animation/package/StepTwo";
import { hitApi } from "@/lib/apiHandler";
import ThankYou from "./ThankYouPage";
import { createThawaniSession } from "@/lib/thawani";
import toast from "react-hot-toast";

// Convert OMR to baisa
const convertToBaisa = (priceOMR: number): number => Math.round(priceOMR * 1000);

// USD → OMR conversion rate (update if needed)
const USD_TO_OMR = 0.385;

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeInOut" as Easing },
    },
};

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 },
    },
};

type Feature = { name: string; is_included: boolean };
type DurationPricing = {
    duration_id: number;
    duration_name: string;
    duration_value: number;
    price: number;
    formatted_price: string;
    is_active: boolean;
};
type Plan = {
    id: number;
    name: string;
    price: string;
    icon: string;
    features: Feature[];
    duration_pricing: DurationPricing[];
};

export default function PricingCard({
    data,
    loading,
}: {
    data: Plan[];
    loading: boolean;
}) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [showThankYou, setShowThankYou] = useState(false);
    const [selectedDurations, setSelectedDurations] = useState<
        Record<number, DurationPricing | null>
    >({});
    const [emailStatus, setEmailStatus] = useState<"completed" | "failed" | null>(null);
    const [packageLoading, sePackageLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const sendOrderEmail = async (orderId: string, email: string) => {
        hitApi({
            api: "send-email",
            method: "POST",
            params: {
                email,
                subject: "Important Announcement",
                content:
                    "This is a plain text email content. You can write multiple lines here.\n\nBest regards,\nYour Company",
                order_id: orderId,
                status: "completed",
            },
            showLoader: sePackageLoading,
            successCallBack: (res) => {
                toast.success(res.message || "Message sent successfully!");
            },
            failureCallBack: (err) => {
                toast.error(err.message || "Submission failed.");
            },
        });
    };

    useEffect(() => {
        const success = searchParams.get("success");
        const cancel = searchParams.get("cancel");
        const orderId = searchParams.get("order_id");
        const email = searchParams.get("email");

        if (success && orderId && emailStatus === null && email) {
            sendOrderEmail(orderId, email).then(() => {
                setShowThankYou(true);
                router.replace("/", undefined);
            });
        }

        if (cancel && emailStatus === null) {
            setEmailStatus("failed");
            router.replace("/", undefined);
        }
    }, [searchParams]);

    const handleBuy = (plan: Plan) => {
        const selected = selectedDurations[plan.id];
        if (!selected) {
            toast.error("Please select a duration first");
            return;
        }

        setSelectedPlan(plan);
        setFormData({
            service_id: plan.id,
            base_price: selected.price,
            duration_seconds: selected.duration_value,
            duration_id: selected.duration_id,
        });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedPlan(null);
        setFormData({});
    };

    const placeOrder = async () => {
        // Convert base_price from USD → OMR
        const totalOMR = formData.base_price * USD_TO_OMR;
        const amountInBaisa = convertToBaisa(totalOMR);

        const payload = {
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            postal_code: formData.zip,
            address: formData.street,
            service_id: formData.service_id,
            duration_seconds: "30",
            base_price: totalOMR,
            total_amount: amountInBaisa,
            currency: "OMR",
            order_note: formData.order_note || "",
        };

        hitApi({
            api: "orders",
            method: "POST",
            params: payload,
            authHeaders: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_AUTH_TOKEN}`,
            },
            successCallBack: async (res) => {
                const orderId = res?.data.order.id;

                const thawaniResponse = await createThawaniSession({
                    client_reference_id: orderId,
                    amount: amountInBaisa,
                    product: selectedPlan?.name || "Custom Plan",
                    metadata: {
                        user_email: formData.email,
                        plan_name: selectedPlan?.name || "",
                    },
                    success_url: `${window.location.origin}/?success=true&order_id=${orderId}&email=${formData.email}`,
                    cancel_url: `${window.location.origin}/?cancel=true`,
                });

                const sessionId = thawaniResponse?.data?.session_id;

                if (sessionId) {
                    toast.success("Redirecting to payment...");
                    window.location.href = `https://checkout.thawani.om/pay/${sessionId}?key=${process.env.NEXT_PUBLIC_THAWANI_PUBLISHABLE_KEY}`;
                } else {
                    toast.error("Payment failed to initiate.");
                    setEmailStatus("failed");
                }
            },
            failureCallBack: () => {
                toast.error("Order failed. Please try again.");
                setEmailStatus("failed");
            },
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-40"
            >
                {data.map((plan, index) => {
                    const selected = selectedDurations[plan.id];
                    const displayPrice = selected
                        ? selected.price.toFixed(2)
                        : parseFloat(plan.price).toFixed(2);

                    return (
                        <motion.div
                            key={plan.id}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className={`${index === 1 ? "lg:-mt-15" : ""}`}
                        >
                            <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden mx-auto">
                                <div className="bg-blue-900 text-white text-center pb-10 pt-2">
                                    <h3 className="text-3xl font-semibold">{plan.name}</h3>
                                    <p className="text-xl font-medium">Starting At</p>
                                    <p className="text-2xl font-semibold text-yellow-400">
                                         $ {displayPrice}
                                    </p>
                                </div>
                                <div className="flex justify-center -mt-8 mb-4">
                                    <div className="bg-blue-900 border border-white rounded-full p-6">
                                        <Image
                                            src={
                                                index === 0
                                                    ? "/animation/basic-plan.svg"
                                                    : index === 1
                                                        ? "/animation/pro-plan.svg"
                                                        : "/animation/premium.svg"
                                            }
                                            alt="plan icon"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2 mb-6 py-5">
                                    {plan.features.map(({ name, is_included }, idx) => (
                                        <li
                                            key={idx}
                                            className="border-b border-gray-300 py-2 last:border-none"
                                        >
                                            <p className="flex items-center gap-6 px-5">
                                                <Image
                                                    src={
                                                        is_included
                                                            ? "/animation/check.svg"
                                                            : "/animation/remove.svg"
                                                    }
                                                    alt={is_included ? "check" : "remove"}
                                                    width={25}
                                                    height={25}
                                                />
                                                <span>{name}</span>
                                            </p>
                                        </li>
                                    ))}
                                </ul>

                                <div className="px-5 mb-4">
                                    <select
                                        className="w-full border border-gray-300 rounded p-2"
                                        value={selected?.duration_id ?? ""}
                                        onChange={(e) => {
                                            const selectedOption = plan.duration_pricing.find(
                                                (d) => d.duration_id === parseInt(e.target.value)
                                            );
                                            setSelectedDurations((prev) => ({
                                                ...prev,
                                                [plan.id]: selectedOption || null,
                                            }));
                                        }}
                                    >
                                        <option value="" disabled>
                                            Select duration
                                        </option>
                                        {plan.duration_pricing
                                            .filter((d) => d.is_active)
                                            .map((d) => (
                                                <option key={d.duration_id} value={d.duration_id}>
                                                    {d.duration_name} sec — {d.price.toFixed(2)} $
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <div className="w-full">
                                    <button
                                        className="bg-blue-900 text-white px-6 py-3 font-semibold hover:bg-blue-800 transition w-full"
                                        onClick={() => handleBuy(plan)}
                                    >
                                        BUY NOW
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedPlan && (
                    <StepTwo
                        data={formData}
                        onChange={(field: string, value: any) =>
                            setFormData((prev: any) => ({ ...prev, [field]: value }))
                        }
                        onBack={handleCloseModal}
                        onSubmit={placeOrder}
                    />
                )}
            </Modal>

            <ThankYou
                show={showThankYou}
                onClose={() => setShowThankYou(false)}
                title="Thank you for your order!"
                description="We've received your payment and will begin processing shortly."
            />
        </>
    );
}
