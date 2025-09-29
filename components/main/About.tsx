'use client'

import { motion } from "framer-motion";
import SectionHeading from "../ui/sectionHeading";

export default function About() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

      {/* Left Animated Text Block */}
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
        <motion.p
          className="text-gray-600 text-base font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          Our international team works completely virtually so instead of paying for fancy offices, you get quality videos at an affordable price.
        </motion.p>

        <motion.p
          className="my-6 text-gray-600 text-base font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          The patented production process our innovative team deploys leads to 99.7% customer satisfaction rates and the fastest delivery times in the industry.
        </motion.p>

        <motion.p
          className="text-gray-600 text-base font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
        >
          Your video costs have never been lowered with our disruptive ‘low cost, high quality’ structure giving you pricing 90% lower than that of our competitors, no more exorbitant pricing and ridiculous quoting formulas based on how much money you have to spend.
        </motion.p>

        <motion.div
          className="relative bg-gray-100 px-6 py-4 text-center mt-6"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm md:text-lg font-semibold text-gray-800">
            Unlock limitless potential with our Animated Videos
            <br />
            <span className="text-blue-700 font-semibold">Your success is our priority.</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Right Image with Float Effect */}
      <motion.div
        className="flex justify-end sm:order-1 md:order-2"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        <motion.img
          src="/main/about-us.png"
          alt="Whiteboard Animation"
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
  );
}
