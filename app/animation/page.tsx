'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PlayButton from '@/components/animation/PlayButton'
import ContactForm from '@/components/shared/ContactForm'
import FAQ from '@/components/shared/FAQ'
import Button from '@/components/ui/button'
import PricingCard from '@/components/shared/PricingCard'
import SectionHeading from '@/components/ui/sectionHeading'
import { Testimonials } from "@/components/shared/Testimonials";
import Footer from "@/components/shared/Footer";
import Portfolio from "@/components/main/Portfolio";
import { hitApi } from "@/lib/apiHandler";
import Link from "next/link";


type PortfolioItem = {
  id: number;
  title: string;
  vimeo_video_link: string;
};

export default function AnimationPage() {
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faq, setFaq] = useState([]);

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [faqLoading, setFaqLoading] = useState(true);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [testimonialLoading, setTestimonialLoading] = useState(true);

  const fetchPackages = () => {
    hitApi({
      api: 'packages',
      method: 'GET',
      params: { category_id: 0 },
      showLoader: setPackagesLoading,
      successCallBack: (res) => {
        setPackages(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching packages:', err);
      },
    });
  };

  const fetchTestimonials = () => {
    hitApi({
      api: 'testimonials',
      method: 'GET',
      params: { category_id: 3 },
      showLoader: setTestimonialLoading,
      successCallBack: (res) => {
        setTestimonials(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching testimonials:', err);
      },
    });
  };

  const fetchFaq = () => {
    hitApi({
      api: 'faqs',
      method: 'GET',
      params: { category_id: 3 },
      showLoader: setFaqLoading,
      successCallBack: (res) => {
        setFaq(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching FAQs:', err);
      },
    });
  };

  const fetchPortfolio = () => {
    hitApi({
      api: 'portfolios',
      method: 'GET',
      params: { category_id: 3 },
      showLoader: setPortfolioLoading,
      successCallBack: (res) => {
        setPortfolio(res.data.data.slice(0, 6));
      },
      failureCallBack: (err) => {
        console.error("Error fetching portfolio:", err);
      },
    });
  };

  useEffect(() => {
    fetchPackages();
    fetchTestimonials();
    fetchFaq();
    fetchPortfolio();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto scroll-smooth bg-white snap-mandatory">
      {/* HERO */}
      <section id="home" className="py-40 px-4 text-center overflow-x-hidden" style={{ background: 'url(/animation/hero-bg.png) no-repeat', backgroundSize: 'cover' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto">
          <PlayButton />
          <motion.h1
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-2xl font-bold md:text-4xl">
            Breathe Life into Your Ideas with <span className="text-blue-600">World-Class Animation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-4 max-w-3xl text-lg">
            Bring your ideas to life with Loyal e‑Services! We craft custom 2D animations, whiteboard explainer videos, and motion graphics that captivate, inform, and convert. Fast turnaround, expert storytelling, and tailored visuals for brands that want to stand out.

          </motion.p>
          <Button variant="secondary" className="mt-6 px-5" href="#contact-us">
            Get a Quote
          </Button>
        </motion.div>
      </section>

      {/* PRICING */}
      <section id="packages" className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <SectionHeading heading={'Pricing'} highlighted={"Packages"} />
          <PricingCard data={packages} loading={packagesLoading} />
        </div>
      </section>

      {/* PORTFOLIO – */}
      <section className="text-center mt-20 px-4" id="portfolio">
        <div className="max-w-6xl mx-auto">
          <SectionHeading heading={'Portfolio'} />
          <p className="text-base font-normal mb-10 max-w-2xl mx-auto text-gray-500">
            Elevating brands and stories through visually stunning and immersive video animations – where creativity meets impact.
          </p>

          <Portfolio categoryId={3} limit={6} showPagination={false} />

          <Link href="/animation/portfolio">
            <Button variant="outline" size="lg" className="mt-14">
              View Portfolio
            </Button>
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-4" style={{ background: 'url(/animation/hero-bg.png) no-repeat', backgroundSize: 'cover' }}>
        <SectionHeading heading={'Clients'} highlighted={'Testimonials'} />
        <Testimonials data={testimonials} loading={testimonialLoading} />
      </section>

      {/* FAQ */}
      <section id="faq" className='mt-20 py-20 px-4'>
        <FAQ data={faq} loading={faqLoading} />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <ContactForm category_id={3} />
        <Footer />
      </section>
    </main>
  );
}
