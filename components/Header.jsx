'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { getAllServices } from '@/lib/services';
import Logo from '@/components/Logo';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const defaultMsg = agencyInfo.defaultWhatsAppMessage;
const whatsappUrl = getWhatsAppUrl(defaultMsg);
const callUrl = `tel:${agencyInfo.phone1}`;

const primaryNav = [
  { href: '/', label: 'Home' },
  { href: '/faq/', label: 'FAQs' },
  { href: '/reviews/', label: 'Reviews' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isServicesActive = pathname?.startsWith('/services/');
  const isHomePage = pathname === '/';
  const isBlogPage = pathname?.startsWith('/blog/');
  const onDark = isHomePage || isBlogPage;

  return (
    <>
      <header className={`site-header ${onDark ? 'site-header--on-dark' : ''}`} role="banner">
        <div className="container site-header-row">
          <Logo />

          <nav className="primary-nav" aria-label="Primary">
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'is-active' : ''}`}
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              Home
            </Link>

            <div
              className={`nav-dropdown ${servicesOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services/"
                className={`nav-link nav-dropdown-toggle ${isServicesActive ? 'is-active' : ''}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(v => !v)}
              >
                Services
                <ChevronDown size={14} className="nav-caret" aria-hidden="true" />
              </Link>

              <div
                className={`nav-dropdown-panel ${servicesOpen ? 'is-open' : ''}`}
                role="menu"
              >
                {getAllServices().map((svc) => (
                  <Link
                    key={svc.id}
                    href={svc.path}
                    className={`nav-dropdown-link ${pathname === svc.path ? 'is-active' : ''}`}
                    role="menuitem"
                  >
                    {svc.shortName}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/faq/"
              className={`nav-link ${pathname === '/faq/' ? 'is-active' : ''}`}
            >
              FAQs
            </Link>
            <Link
              href="/reviews/"
              className={`nav-link ${pathname === '/reviews/' ? 'is-active' : ''}`}
            >
              Reviews
            </Link>
            <Link
              href="/about/"
              className={`nav-link ${pathname === '/about/' ? 'is-active' : ''}`}
            >
              About
            </Link>
            <Link
              href="/contact/"
              className={`nav-link ${pathname === '/contact/' ? 'is-active' : ''}`}
            >
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <a href={callUrl} className="header-phone" aria-label={`Call ${agencyInfo.phoneDisplay1}`}>
              <Phone size={15} aria-hidden="true" />
              {agencyInfo.phoneDisplay1}
            </a>
            <button
              type="button"
              className="header-burger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-backdrop ${mobileOpen ? 'is-open' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-drawer-top">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="mobile-drawer-close"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-link ${pathname === item.href ? 'is-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/services/"
            className={`mobile-link ${isServicesActive ? 'is-active' : ''}`}
            onClick={() => setMobileServicesOpen(v => !v)}
          >
            <span>Services</span>
            <ChevronDown
              size={16}
              style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              aria-hidden="true"
            />
          </Link>
          {mobileServicesOpen && (
            <div className="mobile-subnav">
              {getAllServices().map((svc) => (
                <Link
                  key={svc.id}
                  href={svc.path}
                  className={`mobile-sublink ${pathname === svc.path ? 'is-active' : ''}`}
                >
                  {svc.shortName}
                </Link>
              ))}
            </div>
          )}


        </nav>

        <div className="mobile-drawer-foot">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-lime">
            Chat on WhatsApp
          </a>
          <a href={callUrl} className="btn-ghost-dark">
            <Phone size={15} /> {agencyInfo.phoneDisplay1}
          </a>
        </div>
      </div>
    </>
  );
}