'use client'

import { Easing, motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import SectionHeading from '../ui/sectionHeading'
import Image from 'next/image'

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' as Easing } },
}

type FAQItem = {
  question: string;
  answer?: string; // in case you want to expand later
};

export default function FAQ({ data, loading }: { data: FAQItem[], loading: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2 })
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start('visible')
    else controls.start('hidden')
  }, [inView, controls])

  return (
    <section ref={ref}>
      <SectionHeading
        heading={'Frequent Asked'}
        highlighted={"Questions"}
        subHeading="Here are some of the most frequently asked questions about our services"
      />
      {loading ? <div className="max-w-4xl mx-auto space-y-4 animate-pulse">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded shadow bg-gray-200 flex justify-between items-center"
          >
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
        :
        <motion.div
          className="max-w-4xl mx-auto space-y-4"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {data.map((item, i) => (
            <motion.details
              key={i}
              className="group p-4 rounded shadow transition-colors duration-300 bg-gray-200 open:bg-blue-900"
              variants={fadeVariant}
            >
              <summary className="flex justify-between items-center font-semibold cursor-pointer list-none group-open:text-white">
                {item.question}
                <div className="ml-4">
                  <Image
                    width={6}
                    height={6}
                    src="/main/arrow-down.svg"
                    className="w-6 h-6 transition-transform duration-500 group-open:hidden"
                    alt="Expand"
                  />
                  <Image
                    width={6}
                    height={6}
                    src="/main/arrow-up.svg"
                    className="w-6 h-6 transition-transform duration-500 hidden group-open:block"
                    alt="Collapse"
                  />
                </div>
              </summary>
              <p className="mt-4 text-gray-600 group-open:text-white">{item.answer}</p>
            </motion.details>
          ))}
        </motion.div>
      }
    </section>
  )
}
