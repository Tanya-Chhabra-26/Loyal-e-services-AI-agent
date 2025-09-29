'use client';

import React, { useState } from 'react';
import { Easing, motion } from 'framer-motion';
import StepIndicator from './StepIndicator';
import Button from '../ui/button';
import SectionHeading from '../ui/sectionHeading';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' as Easing },
  },
};

export default function StepForm() {
  const [step, setStep] = useState(2); // Default to step 2
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <motion.div
      key={typeof window !== 'undefined' ? window.location.href : 'static'}
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.8 }}
      variants={containerVariants}
      className="bg-white shadow-[-1px_1px_13px_-1px_rgba(0,0,0,0.56)] rounded-lg px-4 sm:px-8 py-10 sm:py-20"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading heading="Quotation" highlighted="Inquiry" />

        <StepIndicator currentStep={step} className="pt-5 pb-10" />

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            {['field1', 'field2', 'field3', 'field4'].map((name, i) => (
              <motion.input
                key={name}
                name={name}
                placeholder={`Field ${i + 1}`}
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full bg-gray-200 text-sm px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * i, duration: 0.5 }}
              />
            ))}
          </div>

          <motion.textarea
            name="message"
            placeholder="Message"
            className="bg-gray-200 text-sm px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full min-h-[120px]"
            value={formData.message}
            onChange={handleChange}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
        </div>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            onClick={prevStep}
            className="bg-blue-800 text-white py-2 px-6 hover:bg-blue-900 w-full sm:w-auto"
            disabled={step === 1}
          >
            Back
          </Button>
          <Button
            onClick={nextStep}
            className="bg-yellow-400 text-black py-2 px-6 hover:bg-yellow-500 w-full sm:w-auto"
            disabled={step === 4}
          >
            Next
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
