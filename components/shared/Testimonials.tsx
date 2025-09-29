import { Easing, motion } from "framer-motion";
import Image from "next/image";
import ResponsiveCarousel from "../ResponsiveCarousel";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  image: string;
  review: string;
  rating: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' as Easing },
  },
};

const breakPoints = {
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
}

export const Testimonials = ({ data, loading }: { data: Testimonial[], loading: boolean }) => {
  const renderSkeletons = () =>
    Array.from({ length: 4 }).map((_, i) => (
      <SwiperSlide key={`skeleton-${i}`}>
        <div className="relative rounded-xl bg-white p-6 pt-10 text-center shadow animate-pulse">
          <div className="mb-4 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 rounded-full bg-gray-200" />
            ))}
          </div>
          <div className="h-4 bg-gray-200 mx-auto w-3/4 mb-2 rounded" />
          <div className="h-4 bg-gray-200 mx-auto w-2/3 mb-2 rounded" />
          <div className="h-4 bg-gray-200 mx-auto w-1/2 mb-6 rounded" />
          <div className="h-4 bg-gray-300 w-1/3 mx-auto mb-5 rounded" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
            <div className="h-16 w-16 bg-gray-300 rounded-full border-4 border-white shadow-md" />
          </div>
        </div>
      </SwiperSlide>
    ));

  return (
    <div className="max-w-6xl mx-auto overflow-x-hidden">
      <ResponsiveCarousel breakPoints={breakPoints}>
        {loading
          ? renderSkeletons()
          : data && data.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="relative flex flex-col items-center justify-center h-[340px] rounded-xl bg-white px-6 pt-10 pb-20 text-center shadow-[-1px_1px_13px_-1px_rgba(0,0,0,0.25)]"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex justify-center text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < t.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="relative text-sm italic text-gray-600 min-h-[80px] px-2">
                    <span className="absolute -top-5 left-0 text-2xl text-gray-300">“</span>
                    {t.review}
                    <span className="absolute -bottom-5 right-0 text-2xl text-gray-300">”</span>
                  </p>

                  <p className="font-semibold text-blue-600">{t.name}</p>
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-4 border-white shadow-md">
                    <Image
                      src={t.image || '/animation/avatar.png'}
                      alt={t.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>


            </SwiperSlide>
          ))}
      </ResponsiveCarousel>
    </div>
  );
};
