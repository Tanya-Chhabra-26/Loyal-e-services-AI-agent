import Navbar from "@/components/shared/Header";
import { Suspense } from "react";

const navLinks = [
  { label: 'Home', href: '#home' },
  {
    label: 'Our Services', href: '#our-services',
    subMenu: [
      { label: 'Main', href: 'https://loyaleservices.com' },
      { label: 'Domain', href: 'https://domains.loyaleservices.com' },
      { label: 'TechnoAI', href: 'https://technoai.loyaleservices.com' },
    ]
  },
  { label: 'Packages', href: '#packages' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

export const metadata = {
  title: 'Explainer & Animated Video Experts | Loyal e‑Services',
  description: 'Create stunning 2D, whiteboard & motion videos with Loyal e‑Services! No tech skills needed—just your ideas and our creative magic to bring them alive.',
};

export default function AnimationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar navLinks={navLinks} />
      <Suspense fallback={<div>Loading animation...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
