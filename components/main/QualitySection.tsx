'use client'

import { useRef, useEffect } from "react"
import { Easing, motion, useAnimation, useInView } from "framer-motion"
import SectionHeading from "../ui/sectionHeading"
import Image from "next/image"
import { cards } from "@/data"

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' as Easing }
  }
}

export default function QualitySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden") // reset animation when out of view
    }
  }, [inView, controls])

  return (
    <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-center">

      {/* Left Image */}
      <motion.div
        className="lg:block justify-center hidden"
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <img src="/main/woman-with-sign.png" alt="Lady" className="w-full max-h-md" />
      </motion.div>

      {/* Right Content */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={cardVariants}
      >
        <SectionHeading
          align="left"
          heading={'Quality Video At An'}
          highlighted={"Affordable Price"}
        />

        <motion.p className="text-gray-600 mb-6 text-center lg:text-left" variants={cardVariants}>
          Our animated explainer videos help our clients worldwide communicate their core message effectively, thanks to the high-quality animation and sound design.
        </motion.p>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8"
          initial="hidden"
          animate={controls}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="bg-white-950 rounded-2xl flex flex-col gap-1 items-center text-center"
              variants={cardVariants}
            >
              <div className="w-18 h-18 bg-blue-950 rounded-lg flex items-center justify-center mb-2">
                <Image
                  width={12}
                  height={12}
                  src={card.icon}
                  alt={card.title}
                  className="w-12 h-12"
                />
              </div>
              <h4 className="text-lg md:text-xl font-semibold">{card.title}</h4>
              <p className="text-xs md:text-sm text-gray-600 px-2">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
