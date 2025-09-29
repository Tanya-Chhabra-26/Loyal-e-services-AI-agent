'use client';
import React, { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import Modal from '@/components/Modal';

const StepFormModal = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setFormData({});
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
      >
        Get Started
      </button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        {step === 1 && (
          <StepOne
            data={formData}
            onChange={handleChange}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            data={formData}
            onChange={handleChange}
            onBack={prevStep}
          />
        )}
      </Modal>
    </>
  );
};

export default StepFormModal;
