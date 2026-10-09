'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import { getAllServices } from '@/lib/services';
import Logo from '@/components/Logo';
import { MessageCircle, Phone, MapPin, Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
};

const socialLinks = Object.entries(agencyInfo.socials).filter(([, url]) => url);

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
              {agencyInfo.about}
            </p>
            <a
              href={getWhatsAppUrl(agencyInfo.defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ marginTop: 22 }}
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            {socialLinks.length > 0 && (
              <div className="footer-socials">
                {socialLinks.map(([name, url]) => {
                  const Icon = socialIcons[name];
                  return (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-link"
                      aria-label={name}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            )}
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
              {getAllServices().map((svc) => (
                <li key={svc.slug}>
                  <Link href={svc.path} className="footer-link">
                    {svc.navTitle}
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
          <div>{currentYear ? `© ${currentYear} ` : '© ' }{agencyInfo.name} · {agencyInfo.address.locality}</div>
          <div>Serving {agencyInfo.serviceAreas.length} {agencyInfo.address.city} localities along the OMR corridor.</div>
        </div>
      </div>
    </footer>
  );
}
