'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';

// The edit console is an admin surface: it must not wear the public site chrome.
// Server rendering always knows the real path for /edit (that route is dynamic),
// and every public page renders the chrome on both sides, so this is
// hydration-safe without opting the public pages out of static rendering.
export default function SiteChrome({ children }) {
  const pathname = usePathname() || '';
  const isConsole = pathname === '/edit' || pathname.startsWith('/edit/');

  if (isConsole) return <main>{children}</main>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
