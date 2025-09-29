import Navbar from "@/components/shared/Header";
const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Domain Search', href: '#domain-search' },
    {
        label: 'Services',
        href: '#domain-services',
        subMenu: [
            { label: 'Main', href: 'https://loyaleservices.com' },
            { label: 'Animation', href: 'https://animation.loyaleservices.com' },
            { label: 'Techno AI', href: 'https://technoai.loyaleservices.com' },
        ]
    },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
];

export const metadata = {
    title: 'Find Your Perfect Domain Today | Loyal e‑Services',
    description:
        'Secure your perfect domain name with Loyal e‑Services. Search, register, or transfer domains easily—all with expert support and simple tools for every need.',
};

export default function DomainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen">
            <Navbar navLinks={navLinks} />
            {children}
        </div>
    );
}
