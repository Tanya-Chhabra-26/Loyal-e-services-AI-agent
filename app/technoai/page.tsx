'use client'

import { motion } from "framer-motion";
import ContactForm from '@/components/shared/ContactForm'
import Process from '@/components/main/Process'
import Button from '@/components/ui/button'
import FAQ from '@/components/shared/FAQ'
import PricingCard from '@/components/shared/PricingCard'
import SectionHeading from '@/components/ui/sectionHeading'
import { Testimonials } from '@/components/shared/Testimonials'
import Footer from "@/components/shared/Footer";
import { technoServices } from "@/data";
import { hitApi } from "@/lib/apiHandler";
import { useEffect, useState } from "react";


export default function TechnoPage() {
  const [faq, setFaq] = useState([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
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
        console.log('Error fetching services:', err);
      },
    });
  };
  const fetchFaq = () => {
    hitApi({
      api: 'faqs',
      method: 'GET',
      params: { category_id: 4 },
      showLoader: setFaqLoading,
      successCallBack: (res) => {
        setFaq(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  const fetchTestimonials = () => {
    hitApi({
      api: 'testimonials',
      method: 'GET',
      params: { category_id: 4 },
      showLoader: setTestimonialLoading,
      successCallBack: (res) => {
        setTestimonials(res.data.data)
      },
      failureCallBack: (err) => {
        console.log('Error fetching services:', err);
      },
    });
  };

  useEffect(() => {
    fetchPackages();
    fetchTestimonials();
    fetchFaq();
  }, []);

  return (
    <main className="flex-1 overflow-y-auto scroll-smooth bg-white snap-mandatory">
      {/* ------------------------------------------------------------------ */}
      {/* HERO – top of page */}
      {/* ------------------------------------------------------------------ */}
      <section id="home" className="mb-16 py-16 px-4 text-center overflow-x-hidden" style={{ background: 'url(/animation/hero-bg.png) no-repeat', backgroundSize: 'cover' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto">
          <h1 className="mx-auto max-w-2xl text-2xl font-bold md:text-4xl">
            From Vision to Code:{' '}
            <span className="text-blue-900"> Tailored AI & Web Solutions</span>
          </h1>
          <p className=" mt-4 text-lg">
            Transform bold ideas into intelligent digital solutions with Techno Billion AI. From custom web platforms to AI-powered tools, we craft scalable, smart, and user-centric experiences that drive innovation and real-world impact.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center justify-center text-center mt-6">
            <Button variant="secondary" className="px-5 w-full sm:w-auto" href="#contact">
              Request Service
            </Button>

            <Button variant="primary" className="px-5 w-full sm:w-auto" href="#our-services">
              Explore Solutions
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Services Search */}
      {/* ------------------------------------------------------------------ */}
      <section id={"our-services"} className='py-16 px-4'>
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            heading={'Our'}
            highlighted={"Services"}
            subHeading=""
          />
          <Process items={technoServices} />
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Pricing Section */}
      {/* ------------------------------------------------------------------ */}
      {/* <section id="packages" className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <SectionHeading
            heading={'Pricing'}
            highlighted={"Packages"}
          /> */}
      {/* PricingCard components */}
      {/* <PricingCard data={packages} loading={packagesLoading} />
        </div>
      </section> */}


      {/* ------------------------------------------------------------------ */}
      {/* TESTIMONIALS – social proof */}
      {/* ------------------------------------------------------------------ */}
      <section
        id="testimonials"
        className="mb-16 py-16 px-4"
        style={{
          background: 'url(/animation/hero-bg.png) no-repeat',
          backgroundSize: 'cover',
        }}>
        <SectionHeading
          heading={'Clients'}
          highlighted={'Testimonials'} />

        <Testimonials data={testimonials} loading={testimonialLoading} />

      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Dashboard */}
      {/* ------------------------------------------------------------------ */}
      {/* <section id={'dashboard'} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="block md:hidden">
            <SectionHeading
              align='left'
              heading={'Dashboard for Tracking'}
              highlighted={"Affiliate Leads"}
              subHeading="*Revenue-Share Tracker"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

           
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
              variants={{
                hidden: {},
                visible: {},
              }}
              className="order-2 md:order-1"
            >
              <div className="hidden md:block">
                <SectionHeading
                  align='left'
                  heading={'Dashboard for Tracking'}
                  highlighted={"Affiliate Leads"}
                  subHeading="*Revenue-Share Tracker"
                />
              </div>
              <motion.p
                className="text-gray-600 text-base font-light mb-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                Monitor and optimize your affiliate marketing efforts like never before with our powerful, user-friendly dashboard. Designed to deliver complete visibility into your affiliate performance, this tool enables you to track real-time data on clicks, conversions, sales, and commission earnings—all in one centralized platform.
              </motion.p>

             
            </motion.div>

           
            <motion.div
              className="flex justify-end order-1 md:order-2"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <motion.img
                src="/techai/dashboard.png"
                alt="Affiliate Dashboard"
                className="max-w-full h-auto"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section> */}

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
        <ContactForm category_id={4} />
        <Footer />
      </section>
    </main>
  )
}
