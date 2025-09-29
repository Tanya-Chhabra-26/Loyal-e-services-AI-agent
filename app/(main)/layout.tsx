import MainNavbar from '@/components/main/MainNavbar';

export const metadata = {
  title: 'Professional 2D & Whiteboard Animation Experts |  Loyal e‑Services',
  description: 'Loyal e‑Services offers 2D animation, whiteboard & motion graphics. Fast delivery, trusted by 800+ clients—boost brand engagement with creative video content.',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainNavbar />
      {children}
    </div>
  );
}
