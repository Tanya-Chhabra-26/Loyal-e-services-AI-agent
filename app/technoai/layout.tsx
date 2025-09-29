import Navbar from "@/components/shared/Header";

const navLinks = [
  { label: 'Home', href: '#home' },
  {
    label: 'Services',
    href: '#our-services',
    subMenu: [
      { label: 'Main', href: 'https://loyaleservices.com' },
      { label: 'Domain', href: 'https://domains.loyaleservices.com' },
      { label: 'Animation', href: 'https://animation.loyaleservices.com' },
    ]
  },
  { label: 'Packages', href: '#packages' },
  { label: 'Testimonials', href: '#testimonials' },

];

export const metadata = {
  title: 'TechnoAI by Loyal e‑Services | AI Tools & Learning | Future-Ready Skills',
  description: 'Explore future-ready AI solutions with Loyal e‑Services. From automation to creative tools,TechnoAI helps you work smarter and innovate faster.Get a Free Quote.',
};

export default function TechnoAILayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar navLinks={navLinks} />
      {children}
    </div>
  );
}
