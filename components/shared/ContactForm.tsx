'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, Easing } from 'framer-motion';
import Button from '../ui/button';
import SectionHeading from '../ui/sectionHeading';
import InputComponent from '../ui/InputComponent';
import TextareaComponent from '../ui/TextareaComponent';
import { ContactSchema } from '@/lib/validation/contactSchema';
import toast from 'react-hot-toast';
import { hitApi } from '@/lib/apiHandler';
import ThankYou from './ThankYouPage';
import { useRouter } from 'next/navigation';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' as Easing } },
};

export default function ContactForm({ category_id }: { category_id: string | number }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({});
  const [showThankYou, setShowThankYou] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 });
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});

    const validated = ContactSchema.safeParse(form);
    if (!validated.success) {
      const errors: { [key: string]: string[] } = {};
      validated.error.errors.forEach((err) => {
        const field = err.path[0];
        if (!errors[field]) errors[field] = [];
        errors[field].push(err.message);
      });
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    hitApi({
      api: 'inquiry',
      method: 'POST',
      params: { ...form, category_id },
      showLoader: setLoading,
      successCallBack: (res) => {
        toast.success(res.message || 'Message sent successfully!');
        setForm({ name: '', email: '', phone: '', message: '' });
        setShowThankYou(true); // ✅ Show ThankYou modal
      },
      failureCallBack: (err) => {
        toast.error(err.message || 'Submission failed.');
        if (err.errors) setFieldErrors(err.errors);
      }
    });
  };

  return (
    <>
      <motion.section
        ref={ref}
        id="contact-us"
        className="py-16 px-4"
        initial="hidden"
        animate={controls}
      >
        <motion.div className="max-w-5xl mx-auto" variants={fadeUp}>
          <SectionHeading
            heading={'Get In Touch with Us'}
            subHeading="We love to hear from you"
          />
          <motion.p className="text-center mb-8" variants={fadeUp}>
            Experience the awe-inspiring world of animated videos like never before. Join our exclusive subscriber list and be the first to discover captivating stories, stunning visuals, and unforgettable adventures. Don’t miss out! Enter your details below to embark on an enchanting journey. Let the magic begin!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputComponent
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                error={fieldErrors.name?.[0]}
              />
              <InputComponent
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter Your E-mail"
                error={fieldErrors.email?.[0]}
              />
              <InputComponent
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                error={fieldErrors.phone?.[0]}
              />
            </div>

            <motion.div className="mt-4" variants={fadeUp}>
              <TextareaComponent
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Write your message here..."
                error={fieldErrors.message?.[0]}
              />
            </motion.div>

            <motion.div className="mt-6 text-center" variants={fadeUp}>
              <Button
                type="submit"
                variant={loading ? 'ghost' : 'primary'}
                size="md"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.section>

      {/* ✅ Thank You Modal */}
      <ThankYou
        show={showThankYou}
        title="Thank you!"
        description="Your message has been successfully sent. We’ll get back to you soon."
        onClose={() => {
          setShowThankYou(false);
          router.push('/');
        }}
      />
    </>
  );
}
