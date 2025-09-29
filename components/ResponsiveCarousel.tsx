'use client';

import { Swiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ResponsiveCarousel({ children, breakPoints }: any) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      breakpoints={breakPoints}
      className="pb-16 custom-swiper justify-center"
    >
      {children}
    </Swiper>
  );
}
