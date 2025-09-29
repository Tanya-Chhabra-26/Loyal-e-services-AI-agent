
// local development
// MainNavbar.tsx
// 'use client';

// import { usePathname } from 'next/navigation';
// import Navbar from '@/components/shared/Header';

// const navLinks = [
//   { label: 'Home', href: '#home' },
//   { label: 'About Us', href: '#about-us' },
//   {
//     label: 'Services',
//     href: '#services',
//     subMenu: [
//       { label: 'Animation', href: 'http://animation.localhost:3000' },
//       { label: 'Domain', href: 'http://domains.localhost:3000' },
//       { label: 'Techno AI', href: 'http://technoai.localhost:3000' },
//     ]
//   },
//   { label: 'Our Process', href: '#our-process' },
//   { label: 'Faq', href: '#faq' },
//   { label: 'Portfolio', href: '#portfolio' },
// ];

// export default function MainNavbar() {
//   const pathname = usePathname();

//   // Always show Navbar on all pages
//   return <Navbar navLinks={navLinks} />;
// }



'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/shared/Header';

export default function MainNavbar() {
  const pathname = usePathname();
  const [baseDomain, setBaseDomain] = useState('loyaleservices.com');

  useEffect(() => {
    // Strip subdomain if needed, and get base domain dynamically
    const hostname = window.location.hostname;

    // Optionally strip subdomain, like animation.loyaleservices.com → loyaleservices.com
    const parts = hostname.split('.');
    const domain =
      parts.length > 2
        ? parts.slice(-2).join('.')
        : hostname;

    setBaseDomain(domain);
  }, []);

  // if (pathname !== '/') return null;

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-us' },
    {
      label: 'Services',
      href: '#services',
      subMenu: [
        { label: 'Animation', href: `https://animation.${baseDomain}` },
        { label: 'Domain', href: `https://domains.${baseDomain}` },
        { label: 'Techno AI', href: `https://technoai.${baseDomain}` },
      ]
    },
    { label: 'Our Process', href: '#our-process' },
    { label: 'Faq', href: '#faq' },
    { label: 'Portfolio', href: '#portfolio' },
  ];

  return <Navbar navLinks={navLinks} />;
}
