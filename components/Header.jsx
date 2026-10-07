'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import servicesData from '@/data/services.json';
import Logo from '@/components/Logo';
import { 
  MessageCircle, 
  Phone,
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';

const defaultMsg = "Hello Colours Life Manpower Agency, I would like to enquire about booking a domestic service.";
const whatsappUrl = getWhatsAppUrl(defaultMsg);

const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const isServicesActive = pathname?.startsWith('/services/');

  return (
    <>
      <header className="header" role="banner">
        <div className="container header-inner">
          <Logo />

          <nav className="nav" aria-label="Primary Navigation">
            <Link 
              href="/" 
              className={`nav-item ${pathname === '/' ? 'is-active' : ''}`}
            >
              Home
            </Link>

            <div 
              className="nav-dropdown"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                className={`nav-item nav-dropdown-toggle ${isServicesActive ? 'is-active' : ''}`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
                onClick={() => setServicesDropdownOpen(v => !v)}
              >
                Services
                <ChevronDown size={14} className="nav-dropdown-caret" aria-hidden="true" />
              </button>

              <div 
                className={`nav-dropdown-panel ${servicesDropdownOpen ? 'is-open' : ''}`}
                role="menu"
              >
                {servicesData.map((svc) => (
                  <Link
                    key={svc.id}
                    href={svc.path}
                    className={`nav-dropdown-link ${pathname === svc.path ? 'is-active' : ''}`}
                    role="menuitem"
                  >
                    {svc.navTitle}
                  </Link>
                ))}
              </div>
            </div>

            {primaryNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${pathname === item.href ? 'is-active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="header-whatsapp"
              aria-label="Chat with us on WhatsApp"
              title="Chat on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>

            <button
              type="button"
              className="header-menu-toggle"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div 
        className={`mobile-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-top">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-drawer-close"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <Link 
            href="/" 
            className={`mobile-link ${pathname === '/' ? 'is-active' : ''}`}
          >
            Home
          </Link>

          <button
            type="button"
            className={`mobile-link mobile-link-toggle ${isServicesActive ? 'is-active' : ''}`}
            onClick={() => setMobileServicesOpen(v => !v)}
            aria-expanded={mobileServicesOpen}
          >
            <span>Services</span>
            <ChevronDown 
              size={14} 
              className={`mobile-link-caret ${mobileServicesOpen ? 'is-open' : ''}`}
              aria-hidden="true"
            />
          </button>

          <div className={`mobile-subnav ${mobileServicesOpen ? 'is-open' : ''}`}>
            {servicesData.map((svc) => (
              <Link
                key={svc.id}
                href={svc.path}
                className={`mobile-sublink ${pathname === svc.path ? 'is-active' : ''}`}
              >
                {svc.navTitle}
              </Link>
            ))}
          </div>

          {primaryNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-link ${pathname === item.href ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <Link 
            href="/faq/" 
            className={`mobile-link ${pathname === '/faq/' ? 'is-active' : ''}`}
          >
            FAQ
          </Link>
        </nav>

        <div className="mobile-drawer-bottom">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-btn mobile-btn-whatsapp"
          >
            <MessageCircle size={16} />
            <span>WhatsApp us</span>
          </a>
          <a
            href={`tel:${agencyInfo.phone1}`}
            className="mobile-btn mobile-btn-call"
          >
            <Phone size={16} />
            <span>Call {agencyInfo.phoneDisplay1}</span>
          </a>
        </div>
      </div>
    </>
  );
}