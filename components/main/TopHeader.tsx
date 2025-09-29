// components/main/TopBar.tsx
import { Phone, Mail, MapPin, } from "lucide-react";
import { Icon } from '@iconify/react';
export default function TopHeader() {
  return (
    <div className="bg-yellow-400 text-black text-sm py-2 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4">
          {/* Left: Contact Info */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span>96-892-993-313</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span> <a href="mailto:shabib@loyaleservices.com">shabib@loyaleservices.com</a></span>
            </div>
            {/* <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span><a
                href="https://www.google.com/maps?q=205+Foe+Road,+London"
                target="_blank"
                rel="noopener noreferrer"
              >205 Foe Road, London</a></span>
            </div> */}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/people/Loyaleservices/61568527408409/" className="hover:text-blue-600">
              <Icon icon="fa6-brands:facebook" className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/loyaleservices1/" className="hover:text-pink-600">
              <Icon icon="fa6-brands:instagram" className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-400">
              <Icon icon="fa6-brands:twitter" className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
