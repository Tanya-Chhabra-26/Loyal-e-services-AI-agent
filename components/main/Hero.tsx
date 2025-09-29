'use client'

import { motion } from "framer-motion"; // fix: correct import path
import Button from "../ui/button";

export default function Hero() {
  return (
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-4xl font-bold mb-4">
              Get High-Converting <span className="text-blue-900">Whiteboard Animation</span> For Affordable Price
            </h1>
            <p className="mb-6 text-gray-600 font-light text-base">
              Transform your brand’s image from ordinary to extra ordinary with our breathtaking design services and high-converting animated videos that capture your audience’s attention and leave a lasting impression at pricing 80%+ lower than the comparable competition.
            </p>
            <motion.div
              className="space-x-4 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Button href="#portfolio" variant="primary" size="lg">Watch Here</Button>
              <Button href="http://animation.loyaleservices.com/animation/portfolio" variant="secondary" size="lg">View Portfolio</Button>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="/main/man-front.png"
              alt="Whiteboard Animation"
              className="max-w-full h-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
              animate={{
                y: [0, -10, 0],
              }}
            />
          </motion.div>
        </div>
      </div>
  );
}
