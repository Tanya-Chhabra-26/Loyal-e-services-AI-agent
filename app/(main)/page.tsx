"use client";
import Link from "next/link";
import About from "@/components/main/About";
import Hero from "@/components/main/Hero";
import Portfolio from "@/components/main/Portfolio";
import Process from "@/components/main/Process";
import QualitySection from "@/components/main/QualitySection";
import Stats from "@/components/main/Stats";
import ResponsiveCarousel from "@/components/ResponsiveCarousel";
import ContactForm from "@/components/shared/ContactForm";
import FAQ from "@/components/shared/FAQ";
import Footer from "@/components/shared/Footer";
import Button from "@/components/ui/button";
import SectionHeading from "@/components/ui/sectionHeading";
import { items, mainFaq, strategicServices } from "@/data";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { hitApi } from "@/lib/apiHandler";

const breakPoints = {
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 4 },
}

type Service = {
  id: string | number;
  title: string;
  image: string;
  // add other properties if needed
};

type PortfolioItem = {
  id: number;
  title: string;
  vimeo_video_link: string;
  // Add other portfolio fields
};



export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [faqLoading, setFaqLoading] = useState(true);
  const [faq, setFaq] = useState([]);

  const fetchServices = () => {
    hitApi({
      api: 'services',
      method: 'GET',
      params: { category_id: 3 },
      showLoader: setLoadingServices,
      successCallBack: (res) => {
        setServices(res.data.data)
        console.log(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  const fetchPortfolio = () => {
    hitApi({
      api: 'portfolios',
      method: 'GET',
      params: { category_id: 3 },
      showLoader: setLoadingPortfolio,
      successCallBack: (res) => {
        setPortfolio(res.data.data.slice(0, 6))
      },
      failureCallBack: (err) => {
        console.error('Error fetching services:', err);
      },
    });
  };

  const fetchFaq = () => {
    hitApi({
      api: 'faqs',
      method: 'GET',
      params: { category_id: 1 },
      showLoader: setFaqLoading,
      successCallBack: (res) => {
        setFaq(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  useEffect(() => {
    fetchServices();
    fetchPortfolio();
    fetchFaq();
  }, [])

  useEffect(() => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100); // delay to ensure DOM is ready
      }
    }
  }, []);

  return (
    <>

      <main className="relative bg-white snap-mandatory scroll-smooth flex-1 overflow-y-auto overflow-x-hidden">
        {/* ===== HERO SECTION ===== */}
        <section className="slider-section" id="home">
          <div className="py-16 px-4" style={{ background: 'url(/main/hero-bg.png)' }}>
            <Hero />
          </div>
          <Stats />
        </section>

        {/* ===== ABOUT US SECTION ===== */}
        <section className="py-16 px-4 mt-20" id="about-us">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              align="left"
              heading={'About'}
              highlighted={"Us"}
            />
            <About />
          </div>
        </section>

        {/* ===== SERVICES SECTION ===== */}
        <section className="bg-gray-200 mt-20 py-16 px-4" id="services">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              heading={'Our'}
              highlighted={"Services"}
            />
            {/* Services Carousel */}
            <ResponsiveCarousel breakPoints={breakPoints}>
              {loadingServices
                ? Array.from({ length: 4 }).map((_, i) => (
                  <SwiperSlide key={`skeleton-${i}`}>
                    <motion.div
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-white shadow-lg rounded-md overflow-hidden h-80 md:h-96 flex flex-col justify-between p-2"
                    >
                      <div className="w-full h-40 md:h-52 bg-gray-200 rounded-md" />
                      <div className="mt-4 px-2">
                        <div className="h-5 md:h-6 bg-gray-200 rounded w-3/4 mx-auto" />
                      </div>
                      <div className="flex items-center justify-center my-5">
                        <div className="w-16 h-16 rounded-full bg-gray-200" />
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))
                :

                services && services.map((item) => (
                  <SwiperSlide key={item.id}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white shadow-lg rounded-md overflow-hidden cursor-pointer group transition duration-300 h-80 md:h-96 flex flex-col justify-between"
                    >
                      <Image
                        width={320}
                        height={400}
                        src={item.image ? `https://admin.loyaleservices.com/storage/${item.image}` : '/main/service.png'}
                        alt={item.title}
                        className="w-full h-40 md:h-52 object-contain md:object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Service title */}
                      <p className="text-center font-heading text-lg md:text-xl font-semibold capitalize text-gray-800 mt-4 px-2">
                        {item.title}
                      </p>
                      {/* Arrow icon */}
                      <div className="flex items-center justify-center my-5">
                        <Link href="http://animation.loyaleservices.com/animation/#packages" scroll={true}>
                          <motion.div
                            className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center"
                            whileHover={{ rotate: 20, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                          >
                            <Image
                              width={12}
                              height={12}
                              src="/main/arrow-right-up.svg"
                              alt="arrow icon"
                              className="w-12 h-12"
                            />
                          </motion.div></Link>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
            </ResponsiveCarousel>
          </div>
        </section>

        {/* ===== QUALITY SECTION ===== */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <QualitySection />
          </div>
        </section>

        {/* ===== WORK TOGETHER SECTION ===== */}
        <section className="py-20 px-4 shadow-md work-together" id="our-process">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <SectionHeading
                heading={'Let’s'}
                highlighted={"Work Together!"}
              />
              <p className="text-gray-600 mb-6 text-base font-light">Immerse yourself in a realm of animated wonders that will ignite your senses and transport you to extraordinary worlds. Join our subscriber list now to access mind-blowing visuals, captivating stories, and endless inspiration. Hurry and share your details to embark on an exhilarating adventure! Let your imagination soar!.</p>
              <Button variant="primary" href="#contact">Get in Touch</Button>
            </div>
          </div>
        </section>

        {/* ===== STRATEGIC PROCESS SECTION ===== */}
        <section className="mt-20 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              heading={'Our Process of'}
              highlighted={"Video Animation"}
              subHeading="Strategic execution"
            />
            <Process items={strategicServices} />
          </div>
        </section>

        {/* ===== FAQ SECTION ===== */}
        <section className="py-16 px-4" id="faq">
          <FAQ data={faq} loading={faqLoading} />
        </section>

        {/* ===== PORTFOLIO SECTION ===== */}
        <section className="text-center mt-20 px-4" id="portfolio">
          <div className="max-w-6xl mx-auto">
            <SectionHeading heading={'Portfolio'} />
            <p className="text-base font-normal mb-10 max-w-2xl mx-auto text-gray-500">
              Elevating brands and stories through visually stunning and immersive video animations – where creativity meets impact.
            </p>

            {/* Portfolio Grid */}
            {portfolio && <Portfolio categoryId={3} limit={6} showPagination={false} />}

            {/* View Portfolio CTA */}
            <Link href="http://animation.loyaleservices.com/animation/portfolio">
              <Button variant="outline" size="lg" className="mt-14">
                View Portfolio
              </Button>
            </Link>
          </div>
        </section>

        {/* ===== CONTACT & FOOTER SECTION ===== */}
        <section className="mt-20" id="contact">
          <ContactForm category_id={1} />
          <Footer />
        </section>
      </main>
    </>
  );
}
