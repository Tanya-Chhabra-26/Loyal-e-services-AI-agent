"use client";

import { useEffect, useState } from "react";
import { hitApi } from "@/lib/apiHandler";
import Portfolio from "@/components/main/Portfolio";
import Footer from "@/components/shared/Footer";
import Button from "@/components/ui/button"; 
type PortfolioItem = {
    id: number;
    title: string;
    vimeo_video_link: string;
};

function getVimeoId(url: string): string {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : "";
}

export default function PortfolioPage() {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 9;

    const fetchPortfolio = () => {
        hitApi({
            api: "portfolios",
            method: "GET",
            params: { category_id: 3 },
            showLoader: setLoading,
            successCallBack: (res) => {
                setPortfolio(res.data.data);
            },
            failureCallBack: (err) => {
                console.error("Error fetching portfolio:", err);
            },
        });
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const totalPages = Math.ceil(portfolio.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = portfolio.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="mt-0 bg-blue-100 h-100 py-16 items-center justify-center text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Portfolio <span className="text-blue-700">Created</span>
                </h2>
            </div>

            <section className="text-center my-20 px-4">
                <div className="max-w-6xl mx-auto ">
                    <Portfolio categoryId={3} showPagination={true} />

                    {/* Pagination with your Button variants */}
                    {/* {!loading && totalPages > 0 && (
                        <div className="flex justify-center items-end gap-4 pt-8">
                            <Button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className={`mt-6 px-5 transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
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
                                className={`mt-6 px-5 transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                                variant="primary"
                            >
                                Next →
                            </Button>
                        </div>
                    )} */}
                </div>
            </section>

            <Footer />
        </>
    );
}
