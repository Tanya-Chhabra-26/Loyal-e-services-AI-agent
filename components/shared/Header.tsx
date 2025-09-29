'use client'

import { useEffect, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Button from '../ui/button'
import Image from 'next/image'
import TopHeader from '../main/TopHeader'
import { useRouter } from 'next/navigation'
type NavLink = {
  label: string;
  href: string;
  subMenu?: NavLink[];
};

interface NavbarProps {
  navLinks: NavLink[];
}

export default function Navbar({ navLinks }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('');
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const toggleSubMenu = (label: string) => {
    setOpenSubMenu(prev => (prev === label ? null : label))
  }

  const router = useRouter(); // Use Next.js router
  // const handleNavClick = (e: any, href: string) => {
  //   e.preventDefault();

  //   const currentPath = window.location.pathname;

  //   if (href === '/#contact-us') {
  //     const routeMap: Record<string, string> = {
  //       '/': '#contact-us',
  //       '/animation': '#contact-us',
  //       '/domains': '#contact-us',
  //       '/technoai': '#contact-us',
  //       '/listingpage': '/domains#contact-us',
  //       '/portfolio': '/animation#contact-us',
  //       '/privacy-policy': '/#contact-us',
  //       '/terms-and-conditions': '/#contact-us',
  //     };

  //     const target = routeMap[currentPath];

  //     // Scroll locally
  //     if (target?.startsWith('#')) {
  //       const el = document.querySelector(target);
  //       if (el) {
  //         el.scrollIntoView({ behavior: 'smooth' });
  //         setActiveSection('#contact-us');
  //       }
  //     }
  //     // Redirect to another page with anchor
  //     else if (target?.includes('#')) {
  //       router.push(target);
  //     }
  //     // Fallback
  //     else {
  //       router.push('/#contact-us');
  //     }

  //     setIsOpen(false); // close mobile menu or dropdown
  //     return;
  //   }

  //   // Default behavior for other links
  //   router.push(href);
  //   setIsOpen(false);
  // };

  // Scroll spy logic

  // Navbar.tsx (key parts changed)
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();

    if (href.startsWith('#')) {
      if (window.location.pathname === '/') {
        // Smooth scroll
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Go to home with hash
        router.push(`/${href}`);
      }
    } else {
      // External or absolute links
      router.push(href);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0.5,
      }
    );

    // Only observe sections if href starts with #
    navLinks.forEach((link) => {
      if (link.href.startsWith('#')) {
        const section = document.querySelector(link.href);
        if (section) observer.observe(section);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        if (link.href.startsWith('#')) {
          const section = document.querySelector(link.href);
          if (section) observer.unobserve(section);
        }
      });
    };
  }, []);

  // ✅ Dynamic main domain redirect (localhost or production)
  const [mainDomain, setMainDomain] = useState('/');

  useEffect(() => {
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port;

    // Local development
    if (hostname.includes('localhost') || hostname === '127.0.0.1') {
      setMainDomain(`${protocol}//localhost:${port}`);
    }
    // Production: strip subdomain
    else {
      const parts = hostname.split('.');
      const baseDomain = parts.slice(-2).join('.');
      setMainDomain(`${protocol}//${baseDomain}`);
    }
  }, []);


  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <TopHeader />
      <div className="max-w-7xl mx-auto flex justify-between items-center py-6 px-4">
        {/* ✅ Dynamic Logo Link to Root */}
        <button onClick={() => window.location.href = mainDomain} className="focus:outline-none">
          <Image src={'/logo.svg'} width={150} height={150} alt='logo' />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex space-x-8 items-center text-white font-normal text-md">
          {navLinks.map((link) =>
            link.subMenu ? (
              <div key={link.label} className="relative group">
                <a

                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center gap-2 text-white hover:text-yellow-400 transition font-normal text-md ${activeSection === link.href ? 'text-yellow-400 font-semibold' : ''}`}
                >
                  {link.label}
                  <ChevronDown className="w-4 h-4" />
                </a>

                <div className="absolute left-0 top-full mt-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition duration-300 z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    {link.subMenu.map((subLink) => (
                      <li key={subLink.href}>
                        <a

                          href={subLink.href}
                          className="block px-4 py-2 hover:bg-yellow-100 hover:text-black transition"
                        >
                          {subLink.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-white hover:text-yellow-400 transition font-normal text-md ${activeSection === link.href ? 'text-yellow-400 font-semibold' : ''}`}
              >
                {link.label}
              </a>
            )
          )}
          <Button
            variant="outline"
            onClick={(e) => handleNavClick(e, '/#contact-us')}
            className="border-yellow-400 text-yellow-400"
          >
            Get a Free Quote
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" color='white' /> : <Menu className="w-6 h-6" color='white' />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-black border-t px-4 pt-4 pb-6 space-y-3 absolute w-full shadow z-40">
          {navLinks.map((link) => (
            <div key={link.label}>
              <div className="flex justify-between items-center w-full">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex-1 text-left text-white ${activeSection === link.href ? 'text-yellow-400 font-semibold' : ''}`}
                >
                  {link.label}
                </a>

                {link.subMenu && (
                  <button
                    onClick={() => toggleSubMenu(link.label)}
                    className="text-white"
                    aria-label="Toggle submenu"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${openSubMenu === link.label ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>

              {link.subMenu && openSubMenu === link.label && (
                <div className="pl-4 space-y-2 mt-2">
                  {link.subMenu.map((sub) => (
                    <a
                      key={sub.href}
                      href={sub.href}
                      onClick={(e) => handleNavClick(e, sub.href)}
                      className="block text-sm text-gray-400 hover:text-yellow-400"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
