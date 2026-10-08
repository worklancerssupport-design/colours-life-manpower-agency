'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import servicesData from '@/data/services.json';
import Logo from '@/components/Logo';
import { MessageCircle, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-brand-line">
              A neighbourhood manpower agency on the OMR tech corridor. Cooks, nannies, elderly attendants, maids, and drivers — matched to your home and the way you run it.
            </p>
            <a
              href={getWhatsAppUrl("Hello, I'd like to talk about hiring domestic help.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ marginTop: 22 }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>

          <div>
            <h4 className="footer-col-title">Explore</h4>
            <ul className="footer-link-list">
              <li><Link href="/" className="footer-link">Home</Link></li>
              <li><Link href="/about/" className="footer-link">About Us</Link></li>
              <li><Link href="/reviews/" className="footer-link">Family Reviews</Link></li>
              <li><Link href="/faq/" className="footer-link">FAQ</Link></li>
              <li><Link href="/contact/" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-link-list">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link href={svc.path} className="footer-link">
                    {svc.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Office</h4>
            <div className="footer-contact-row">
              <MapPin size={16} aria-hidden="true" />
              <div>
                <strong>{agencyInfo.address.street}</strong><br />
                {agencyInfo.address.locality}, {agencyInfo.address.city} – {agencyInfo.address.postalCode}<br />
                Landmark: {agencyInfo.address.landmark}
              </div>
            </div>
            <div className="footer-contact-row">
              <Phone size={16} aria-hidden="true" />
              <div>
                <a href={`tel:${agencyInfo.phone1}`}>{agencyInfo.phoneDisplay1}</a><br />
                <a href={`tel:${agencyInfo.phone2}`}>{agencyInfo.phoneDisplay2}</a>
              </div>
            </div>
            <div className="footer-contact-row">
              <MessageCircle size={16} aria-hidden="true" />
              <div>
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                  +91 {agencyInfo.whatsappNumber}
                </a>
              </div>
            </div>
            <div className="footer-contact-row">
              <Mail size={16} aria-hidden="true" />
              <div>
                <a href={`mailto:${agencyInfo.email}`}>{agencyInfo.email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>{currentYear ? `© ${currentYear} ` : '© ' }Colours Life Manpower Agency · Okkiyam Thoraipakkam</div>
          <div>Serving {agencyInfo.serviceAreas.length} Chennai localities along the OMR corridor.</div>
        </div>
      </div>
    </footer>
  );
}