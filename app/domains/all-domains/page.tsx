'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import Footer from '@/components/shared/Footer';
import { hitApi } from '@/lib/apiHandler';

type Domain = {
    id: number;
    domain_name: string;
    icon: string;
    links: string;
};

const ITEMS_PER_PAGE = 9;

const AllDomains = () => {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const fetchDomains = async (page: number) => {
        hitApi({
            api: 'domains',
            method: 'GET',
            params: { per_page: ITEMS_PER_PAGE, status: 1, page },
            showLoader: setLoading,
            successCallBack: (res) => {
                setDomains(res.data);
                if (res.pagination && res.pagination.last_page) {
                    setTotalPages(res.pagination.last_page);
                }
            },
            failureCallBack: (err) => {
                console.log('Error fetching domains:', err);
            },
        });
    };

    useEffect(() => {
        fetchDomains(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <>
            <div className="mt-0 bg-blue-100 h-100 py-16 items-center justify-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Domains <span className="text-blue-700">Available</span>
                </h2>
            </div>
            <div className="min-h-screen flex flex-col justify-between pb-5">
                <div className="flex-grow">
                    <div className="container mx-auto px-4 py-6">
                        {loading ? (
                            // Skeleton Loading
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-6">
                                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white shadow-md rounded-xl p-4 border animate-pulse flex flex-col justify-between min-h-[320px] h-full"
                                    >
                                        {/* Image Placeholder */}
                                        <div className="w-full flex justify-center h-[150px]">
                                            <div className="w-[150px] h-[150px] bg-gray-300 rounded"></div>
                                        </div>
                                        {/* Text Placeholder */}
                                        <div className="mt-4">
                                            <div className="h-4 bg-gray-300 rounded mb-2 w-3/4 mx-auto"></div>
                                        </div>
                                        {/* Button Placeholder */}
                                        <div className="mt-auto">
                                            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-6">
                                    {domains.map((domain, idx) => (
                                        <motion.div
                                            key={domain.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                                            className="bg-white shadow-md rounded-xl p-4 border hover:border-blue-500 transition flex flex-col justify-between min-h-[320px] h-full"
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className="w-full flex justify-center h-[150px]">
                                                    <Image
                                                        src={domain.icon}
                                                        alt={domain.domain_name}
                                                        width={150}
                                                        height={150}
                                                        className="object-contain mb-2"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-800 text-center mb-2">
                                                    {domain.domain_name}
                                                </h3>
                                            </div>
                                            <div className="mt-auto text-center">
                                                <a
                                                    href={domain.links}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 font-medium hover:underline"
                                                >
                                                    Buy Now →
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center items-end gap-4 pb-10">
                                    <Button
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1}
                                        className={`mt-6 px-5 transition ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        variant="secondary"
                                    >
                                        ← Previous
                                    </Button>

                                    <span className="font-medium mt-6">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <Button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className={`mt-6 px-5 transition ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        variant="primary"
                                    >
                                        Next →
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default AllDomains;
