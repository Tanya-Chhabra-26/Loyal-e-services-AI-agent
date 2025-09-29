'use client';

import { motion } from "framer-motion";

interface SectionHeadingProps {
  heading: string;
  highlighted?: string;
  subHeading?: string;
  align?: 'center' | 'left';
}

const SectionHeading = ({
  heading,
  highlighted,
  subHeading,
  align = "center",
}: SectionHeadingProps) => {
  const alignment = align === "center" ? "text-center after:mx-auto" : "text-center after:mx-auto md:text-left md:after:ml-0";

  return (
    <div className="mb-10">
      {subHeading && (
        <h3
          className={`text-base sm:text-normal md:text-xl font-normal md:font-medium text-blue-900 mb-2 ${alignment}`}
        >
          {subHeading}
        </h3>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`
          relative font-bold mb-6 
          text-2xl sm:text-xl md:text-2xl lg:text-4xl 
           ${alignment}
          after:content-[''] after:block after:h-0.5 after:bg-yellow-500 after:rounded 
          after:mt-4 after:w-24 sm:after:w-28 md:after:w-36
        `}
      >
        {heading}{' '}
        {highlighted && <span className="text-primary text-blue-900">{highlighted}</span>}
      </motion.h2>
    </div>
  );
};

export default SectionHeading;
