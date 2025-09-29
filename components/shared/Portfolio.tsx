'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

type PortfolioItem = {
    id: number;
    vimeo_video_link: string;
    title: string;
    category_id: number;   // ✅ added category_id for filtering
    isLarge?: boolean;
    isWide?: boolean;
};

type PortfolioProps = {
    portfolio: PortfolioItem[];
    categoryId?: number;     // ✅ dynamic categoryId prop
    showPagination?: boolean;
    loading?: boolean;
};

const ITEMS_PER_PAGE = 3;

export default function Portfolio({ portfolio, loading, categoryId }: PortfolioProps) {
    const [currentPage, setCurrentPage] = useState(0);

    // ✅ Filter by categoryId if provided
    const filteredPortfolio = useMemo(() => {
        if (!categoryId) return portfolio;
        return portfolio.filter((item) => item.category_id === categoryId);
    }, [portfolio, categoryId]);

    const totalPages = Math.ceil(filteredPortfolio.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleItems = filteredPortfolio.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
    };

    return (
        <div className="space-y-8">
            <motion.div
                className="grid gap-6 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
            >
                {loading ? (
                    Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                        <motion.div key={idx} className="h-60 bg-gray-200 animate-pulse rounded-lg" />
                    ))
                ) : (
                    visibleItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            className="group relative overflow-hidden rounded-lg shadow-lg"
                        >
                            <iframe
                                src={item.vimeo_video_link}
                                allow="autoplay; fullscreen"
                                allowFullScreen
                                className="w-full h-[240px] md:h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="border border-white px-4 py-2 text-xl font-semibold text-white">
                                    {item.title}
                                </span>
                            </div>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentPage >= totalPages - 1}
                        className={`px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
