import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getWhatsAppUrl } from '@/lib/utils';
import servicesData from '@/data/services.json';
import Logo from '@/components/Logo';
import { Phone, MessageCircle, Mail, MapPin, ArrowRight, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer-premium">
      <div className="container">
        {/* Top Mini CTA in Footer */}
        <div style={{
          backgroundColor: '#23211f',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          smDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '18px',
          marginBottom: '56px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: '#ffffff', marginBottom: '4px' }}>
              Looking for reliable home support?
            </div>
            <div style={{ fontSize: '0.94rem', color: '#a8a29e' }}>
              Talk directly with Thomas R at Colours Life Manpower Agency for quick guidance.
            </div>
          </div>

          <a
            href={getWhatsAppUrl("Hello Thomas R, I would like to talk about hiring domestic help for my family.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-pill"
            style={{ padding: '12px 26px', fontSize: '0.95rem' }}
          >
            <MessageCircle size={17} /> Talk to Us on WhatsApp
          </a>
        </div>

        {/* 4 Column Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <Logo isFooter={true} />
            </div>
            <p style={{ fontSize: '0.94rem', lineHeight: '1.7', color: '#a8a29e', marginBottom: '16px' }}>
              Helping Chennai families find the domestic support they need. Dedicated to providing trustworthy cooks, nannies, elderly attendants, maids, and drivers with personal care and integrity.
            </p>
            <div style={{ color: '#fed7aa', fontSize: '0.88rem', fontWeight: '700' }}>
              Directed by Thomas R • Okkiyam Thoraipakkam
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-nav-list">
              <li>
                <Link href="/" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> Home</Link>
              </li>
              <li>
                <Link href="/about/" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> About Us</Link>
              </li>
              <li>
                <Link href="/reviews/" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> Customer Reviews</Link>
              </li>
              <li>
                <Link href="/faq/" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> FAQ</Link>
              </li>
              <li>
                <Link href="/contact/" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> Contact Agency</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="footer-nav-link"><ArrowRight size={13} color="#ea580c" /> Sitemap.xml</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services List */}
          <div>
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-nav-list">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link href={svc.path} className="footer-nav-link">
                    <ArrowRight size={13} color="#0d9488" /> {svc.navTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Address */}
          <div>
            <h4 className="footer-col-title">Office & Contact</h4>
            <div className="footer-contact-block">
              <div className="footer-contact-row">
                <MapPin size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Office Location:</strong><br />
                  {agencyInfo.address.street},<br />
                  {agencyInfo.address.locality},<br />
                  {agencyInfo.address.city} - {agencyInfo.address.postalCode}.<br />
                  <span style={{ color: '#fed7aa', fontWeight: '600' }}>Landmark: {agencyInfo.address.landmark}</span>
                </div>
              </div>

              <div className="footer-contact-row">
                <Phone size={16} color="#ea580c" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Call:</strong>{' '}
                  <a href={`tel:${agencyInfo.phone1}`}>{agencyInfo.phoneDisplay1}</a> /{' '}
                  <a href={`tel:${agencyInfo.phone2}`}>{agencyInfo.phoneDisplay2}</a>
                </div>
              </div>

              <div className="footer-contact-row">
                <MessageCircle size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                <div>
                  <strong>WhatsApp:</strong>{' '}
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" style={{ color: '#4ade80' }}>
                    +91 {agencyInfo.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="footer-contact-row">
                <Mail size={16} color="#0d9488" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${agencyInfo.email}`}>{agencyInfo.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Areas Mention */}
        <div style={{
          padding: '24px 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.84rem',
          color: '#78716c',
          lineHeight: '1.6'
        }}>
          <strong style={{ color: '#e7e5e4' }}>Serving Chennai Localities:</strong> {agencyInfo.serviceAreas.join(', ')}.
        </div>

        {/* Copyright */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          flexDirection: 'column',
          smDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.82rem',
          color: '#78716c',
          textAlign: 'center'
        }}>
          <div>
            © {currentYear} Colours Life Manpower Agency. Directed by Thomas R.
          </div>
          <div>
            Premium Local Domestic Staffing & Caregiving Agency in Chennai.
          </div>
        </div>
      </div>
    </footer>
  );
}
