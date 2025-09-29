'use client';

import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/button";
import Image from "next/image";

type Domain = {
    name: string;
    url: string;
    image: string;
};

export async function GET() {
    console.log('API was Hit');
}

const featuredDomains: Domain[] = [
    {
        name: "BlisSologyLife.com",
        url: "https://BlisSologyLife.com",
        image: "/assets/blissologylife.png",
    },
    {
        name: "GlobalTrustAdvisors.com",
        url: "https://www.atom.com/view/name/GlobalTrustAdvisors",
        image: "/assets/globaltrustadvisors.png",
    },
    {
        name: "EliteRefinery.com",
        url: "https://www.atom.com/view/name/EliteRefinery",
        image: "/assets/Elite-Refinery.png",
    },
];

export const FeaturedDomains = () => {
    return (
        <section className="py-12 px-4 text-center w-full overflow-x-hidden">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Featured Domain for <span className="text-blue-700">Sale</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6 ">
                {featuredDomains.map((domain, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="bg-white shadow-md rounded-xl p-6 border hover:border-blue-500 transition"
                    >
                        <div className='flex justify-center'>
                            <Image
                                src={domain.image}
                                alt={domain.name}
                                width={200}
                                height={200}
                                className="rounded mb-3 object-cover"
                                loading="lazy"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {domain.name}
                        </h3>
                        <a
                            href={domain.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Buy Now →
                        </a>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button href="/domains/all-domains" variant="secondary" className="mt-6 px-5">
                    View More
                </Button>
            </motion.div>
        </section>
    );
};
