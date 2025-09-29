'use client'

import { useEffect } from "react"
import { motion, useInView, useAnimation, Easing } from "framer-motion"
import { useRef } from "react"
import SectionHeading from "../ui/sectionHeading"
import ResponsiveCarousel from "@/components/ResponsiveCarousel";

const items = [
  {
    id: 1,
    title: "Whiteboard Videos",
    image: "/service.png"
  },
  {
    id: 2,
    title: "Explainer Videos",
    image: "/service.png"
  },
  {
    id: 3,
    title: "Premium Animated Videos",
    image: "/service.png"
  },
  {
    id: 4,
    title: "Motion Graphics",
    image: "/service.png"
  },
  {
    id: 5,
    title: "Short Vertical Videos (TikTok, Reels, Shorts)",
    image: "/service.png"
  },
  {
    id: 6,
    title: "E-learning / Educational Animations",
    image: "/service.png"
  },
  {
    id: 7,
    title: "Medical & Health Animations",
    image: "/service.png"
  },
  {
    id: 8,
    title: "Character/Mascot Animations",
    image: "/service.png"
  },
  {
    id: 9,
    title: "Interactive Explainers",
    image: "/service.png"
  },
  {
    id: 10,
    title: "Multilingual Videos",
    image: "/service.png"
  },
  {
    id: 11,
    title: "Animated Ads",
    image: "/service.png"
  },
  {
    id: 12,
    title: "Voice-to-Video (AI Powered)",
    image: "/service.png"
  }
];



const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  },
  hidden: {}
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' as Easing} },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden") // reset when out of view
    }
  }, [inView, controls])

  return (
    <motion.section
      className="py-20"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          heading={'Our'}
          highlighted={"Services"}
        />

        {/* <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10"
          variants={containerVariants}
        > */}
        <ResponsiveCarousel items={items} />
        {/* </motion.div> */}
      </div>
    </motion.section>
  )
}
