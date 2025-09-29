'use client'

import { Easing, motion } from "framer-motion";
import ContactForm from '@/components/shared/ContactForm'
import FAQ from '@/components/shared/FAQ'
import { Testimonials } from '@/components/shared/Testimonials'
import Button from '@/components/ui/button'
import Card from '@/components/ui/Card'
import SectionHeading from '@/components/ui/sectionHeading'
import Image from 'next/image'
import { domainFaq } from "@/data";
import Footer from "@/components/shared/Footer";
import { useEffect, useState } from "react";
import { hitApi } from "@/lib/apiHandler";
import DomainSearch from "@/components/domains/domainSearch";
import { FeaturedDomains } from "@/components/domains/FeaturedDomains";
import Portfolio from "@/components/main/Portfolio";
import Link from "next/link";
// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}


const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' as Easing },
  },
}

type PortfolioItem = {
  id: number;
  title: string;
  vimeo_video_link: string;
};


export default function DomainPage() {
  const [testimonials, setTestimonials] = useState([])
  const [faq, setFaq] = useState([]);
  const [domains, setDomains] = useState([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(true);
  const [faqLoading, setFaqLoading] = useState(true);
  const [domainLoading, setDomainLoading] = useState(true);
  const [testimonialLoading, setTestimonialLoading] = useState(true);

  const fetchPortfolio = () => {
    hitApi({
      api: 'portfolios',
      method: 'GET',
      params: { category_id: 2 },
      showLoader: setPortfolioLoading,
      successCallBack: (res) => {
        setPortfolio(res.data.data.slice(0, 6));
      },
      failureCallBack: (err) => {
        console.error("Error fetching portfolio:", err);
      },
    });
  };


  const fetchTestimonials = () => {
    hitApi({
      api: 'testimonials',
      method: 'GET',
      params: { category_id: 2 },
      showLoader: setTestimonialLoading,
      successCallBack: (res) => {
        setTestimonials(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  const fetchFaq = () => {
    hitApi({
      api: 'faqs',
      method: 'GET',
      params: { category_id: 2 },
      showLoader: setFaqLoading,
      successCallBack: (res) => {
        setFaq(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  const fetchDomains = async () => {
    hitApi({
      api: 'domains',
      method: 'GET',
      params: { per_page: 6, status: 1, page: 1 },
      showLoader: setDomainLoading,
      successCallBack: (res) => {
        setDomains(res.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  useEffect(() => {
    fetchDomains()
    fetchTestimonials();
    fetchFaq();
    fetchPortfolio();
  }, [])
  return (
    <main className="flex-1 overflow-y-auto scroll-smooth bg-white snap-mandatory overflow-x-hidden">
      {/* ------------------------------------------------------------------ */}
      {/* HERO – top of page */}
      {/* ------------------------------------------------------------------ */}
      <section id="home" className="py-16 px-4 text-center " style={{ background: 'url(/animation/hero-bg.png) no-repeat', backgroundSize: 'cover' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto">
          <h1 className="mx-auto max-w-2xl text-2xl font-bold md:text-4xl">
            Unlock Your{' '}
            <span className="text-blue-600">Digital Identity</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg">
            Unlock your digital identity with Loyal e‑Services. Search, register, and manage domain names easily with reliable tools, expert support, and secure solutions, whether you're starting a blog, building a business, or launching your next big idea.
          </p>
          <Button variant="secondary" className="mt-6 px-5" href="#domain-search">
            Search Domains
          </Button>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Domain Search */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="domain-search"
        className="py-16 px-4 text-center bg-white overflow-x-hidden w-full"
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto w-full"
        >
          <h2 className="text-2xl md:text-3xl font-bold">
            Domain <span className="text-blue-700">Search</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm md:text-base">
            Find the perfect domain name to match your brand, business, or idea. Instantly check availability, explore domain extensions, and register with ease. Take the first step toward building a strong digital presence with a domain that truly represents you.

          </p>


          <h3 className="mt-6 font-semibold text-blue-700 text-sm md:text-base">
            Do You Want Your Premium Domain?
          </h3>

          <div className="mt-6 px-2 w-full overflow-hidden">
            <DomainSearch />
          </div>
        </motion.div>
      </section>


      <div className="mx-auto max-w-7xl ">
        <section className="py-12 px-4 text-center w-full overflow-x-hidden">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Featured Domain for <span className="text-blue-700">Sale</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6 ">
            {domains.map((domain: any, idx: any) => (
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
                    src={domain.icon}
                    alt={domain.domain_name}
                    width={200}
                    height={200}
                    className="rounded mb-3 object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {domain.domain_name}
                </h3>
                <a
                  href={domain.link}
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
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Portfolio */}
      {/* ------------------------------------------------------------------ */}
      <section className="text-center mt-20 px-4" id="portfolio">
        <div className="max-w-6xl mx-auto">
          <SectionHeading heading={'Portfolio'} />
          <p className="text-base font-normal mb-10 max-w-2xl mx-auto text-gray-500">
            Elevating brands and stories through visually stunning and immersive video animations – where creativity meets impact.
          </p>

          <Portfolio categoryId={2} limit={6} showPagination={false} />

          <Link href="/domains/portfolio">
            <Button variant="outline" size="lg" className="mt-10 mb-5">
              View Portfolio
            </Button>
          </Link>
        </div>
      </section>





      {/* ------------------------------------------------------------------ */}
      {/* Domain Services */}
      {/* ------------------------------------------------------------------ */}
      <section id="domain-services" className="bg-blue-900 pt-12 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-3">Domain Services</h2>

          <p className="max-w-md mx-auto mb-14 text-sm text-blue-100">
            Our Awesome Services that Help you to make Right Choice
          </p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid gap-6 md:grid-cols-3"
          >
            <motion.div variants={cardVariants}>
              <Card className="bg-white text-center p-6 rounded-lg text-black">
                <Image
                  src="/domains/domain-management.svg"
                  alt="Domain Management"
                  width={80}
                  height={80}
                  className="mx-auto mb-2"
                />
                <h3 className="font-bold text-blue-900 mb-2">Domain Management</h3>
                <p className="text-sm text-gray-600">
                  Simplify domain control with intuitive tools. Manage DNS settings, renewals, forwarding, and privacy in one place—ensuring security, flexibility, and total ownership of your domains.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-white text-center p-6 rounded-lg text-black transform lg:-translate-y-10 shadow-lg">
                <Image
                  src="/domains/domain-registration.svg"
                  alt="Domain Registration"
                  width={80}
                  height={80}
                  className="mx-auto mb-2"
                />
                <h3 className="font-bold text-blue-900 mb-2">Domain Registration</h3>
                <p className="text-sm text-gray-600">
                  Find and register the perfect domain in seconds. Choose from popular extensions, get real-time availability, and secure your digital identity with easy, affordable registration services.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-white text-center p-6 rounded-lg text-black transform lg:-translate-y-20 shadow-lg">
                <Image
                  src="/domains/domain-transfer.svg"
                  alt="Domain Transfer"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="font-bold text-blue-900 mb-2">Domain Transfer</h3>
                <p className="text-sm text-gray-600">
                  Switch to better control and pricing. Transfer your domains seamlessly with no downtime, full support, and enhanced management features—keeping your online identity in safe hands.

                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>





      {/* ------------------------------------------------------------------ */}
      {/* TESTIMONIALS – social proof */}
      {/* ------------------------------------------------------------------ */}
      <section id="testimonials" className="py-16 px-4"
        style={{
          background: 'url(/animation/hero-bg.png) no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <SectionHeading
          heading={'Clients'}
          highlighted={'Testimonials'} />

        <Testimonials data={testimonials} loading={testimonialLoading} />

      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FAQ – common questions */}
      {/* ------------------------------------------------------------------ */}
      <section id="faq" className='mt-20 py-16 px-4'>
        <FAQ data={faq} loading={faqLoading} />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CONTACT – get in touch */}
      {/* ------------------------------------------------------------------ */}
      <section id="contact">
        <ContactForm category_id={2} />
        <Footer />
      </section>
    </main >
  )
}
