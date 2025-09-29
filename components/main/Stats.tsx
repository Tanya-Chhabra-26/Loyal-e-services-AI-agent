'use client'

import { motion } from 'framer-motion'

const stats = [
  {
    percentage: '66%',
    text: '“66% would prefer to view something beautifully designed vs. simple and plain.”',
    source: 'Adobe, 2015',
    bg: 'rgba(217, 217, 217, 0.5)',
  },
  {
    percentage: '46%',
    text: '“46% of visitors consider a web site’s design as a major factor in credibility.”',
    source: 'Stanford University',
    bg: 'rgba(255, 195, 0, 0.6)',
  },
  {
    percentage: '23%',
    text: '“Consistent brand presentation across all platforms increases revenue by up to 23 percent.”',
    source: 'LucidPress',
    bg: 'rgba(0, 80, 160, 0.6)',
  },
]

export default function Stats() {
  return (
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-6 flex items-center space-x-6"
            style={{ backgroundColor: stat.bg }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <motion.div
              className="w-20 h-20 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-black text-lg md:text-2xl font-bold shadow-md"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {stat.percentage}
            </motion.div>
            <p className="text-black text-base">
              {stat.text}
              <br />
              <span className="text-xs text-black">{stat.source}</span>
            </p>
          </motion.div>
        ))}
      </div>
  )
}
