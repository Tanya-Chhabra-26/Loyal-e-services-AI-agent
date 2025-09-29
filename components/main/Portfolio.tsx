'use client';

import { Easing, motion, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { hitApi } from '@/lib/apiHandler';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 9;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeInOut' as Easing,
    },
  }),
};

type PortfolioItem = {
  id: number;
  title: string;
  vimeo_video_link: string;
};

type PortfolioProps = {
  categoryId: number;       // 👈 new required prop
  limit?: number;           
  showPagination?: boolean; 
};

export default function Portfolio({ categoryId, limit, showPagination = true }: PortfolioProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null);
  const closeModal = () => setSelectedVideo(null);

  const extractVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return match ? match[1] : '';
  };

  // ─────────────────────────────────────────────
  // Fetch Portfolio Items
  // ─────────────────────────────────────────────
  const fetchPortfolio = async (page: number) => {
    hitApi({
      api: 'portfolios',
      method: 'GET',
      params: showPagination
        ? { per_page: ITEMS_PER_PAGE, page, category_id: categoryId } // 👈 include categoryId
        : { category_id: categoryId },                               // 👈 dynamic instead of 3
      showLoader: setLoading,
      successCallBack: (res) => {
        if (res.data) {
          let data = res.data.data;

          if (!showPagination && limit) {
            data = data.slice(0, limit);
          }

          setPortfolio(data);
          if (showPagination) {
            setTotalPages(res.data.last_page);
          }
        }
      },
      failureCallBack: (err) => {
        console.error('Error fetching portfolios:', err);
      },
    });
  };

  useEffect(() => {
    fetchPortfolio(currentPage);
  }, [currentPage, showPagination, categoryId]); // 👈 also watch categoryId

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <>
      {/* Grid */}
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-8"
      >
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                className="animate-pulse cursor-default"
              >
                <div className="w-full h-64 rounded-lg bg-gray-200" />
                <div className="bg-gray-300 h-12 mx-6 -mt-8 rounded-lg shadow-md" />
              </motion.div>
            ))
          : portfolio.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -6, scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedVideo(item)}
              >
                {/* Thumbnail */}
                <div className="w-full h-64 rounded-lg relative overflow-hidden border border-gray-200 shadow-lg group">
                  <iframe
                    src={`${item.vimeo_video_link}?background=1`}
                    width="100%"
                    height="100%"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="w-full h-full rounded-lg pointer-events-none"
                    title={item.title}
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white text-lg"> Click to Play</span>
                  </div>
                </div>

                {/* Label */}
                <motion.div
                  whileHover={{ rotate: 0 }}
                  className="bg-blue-900 text-white flex items-center justify-between p-4 mx-6 -mt-8 relative z-10 rounded-lg shadow-md"
                >
                  <span className="text-sm font-medium">{item.title}</span>
                  <Image
                    src="/main/arrow-right-up.svg"
                    width={32}
                    height={32}
                    alt="Open"
                  />
                </motion.div>
              </motion.div>
            ))}
      </div>

      {/* Pagination */}
      {showPagination && !loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 py-10">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-5 transition ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            variant="secondary"
          >
            ← Previous
          </Button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-5 transition ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            variant="primary"
          >
            Next →
          </Button>
        </div>
      )}

      {/* Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-6.5 w-[90vw] max-w-3xl shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 text-gray-700 hover:text-red-600 transition"
            >
              <img src="/main/cross.svg" alt="Close" className="w-8 h-8" />
            </button>

            <div className="w-full aspect-video overflow-hidden rounded">
              <iframe
                src={`https://player.vimeo.com/video/${extractVimeoId(
                  selectedVideo.vimeo_video_link
                )}?autoplay=1&title=0&byline=0&portrait=0`}
                allow="autoplay; fullscreen"
                allowFullScreen
                title={selectedVideo.title}
                className="w-full h-full"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-center text-blue-900">
              {selectedVideo.title}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
