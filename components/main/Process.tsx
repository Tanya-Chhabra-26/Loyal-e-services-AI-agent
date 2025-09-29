'use client'

import Image from "next/image"
import { Easing, motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' as Easing } },
}

interface TechnoService {
  title: string;
  img: string;
  desc: string;
}

interface ProcessProps {
  items: TechnoService[];
}

export default function Process({ items }: ProcessProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [inView, controls])

  return (
    <div ref={ref} className="">
      <motion.div
        className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 text-center"
        initial="hidden"
        animate={controls}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="px-4 py-8 rounded shadow-sm border border-gray-200 flex flex-col justify-center items-center"
            variants={cardVariants}
          >
            <div className="flex items-center justify-center">
              <Image
                src={item.img}
                alt={item.title}
                width={70}
                height={70}
                className="object-cover"
              />
            </div>
            <h4 className="font-semibold text-xl my-4">{item.title}</h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
