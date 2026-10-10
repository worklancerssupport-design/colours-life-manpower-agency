import SmartImage from '@/components/SmartImage';
import { Check, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import agencyInfo from '@/data/agency.json';

const vetting = agencyInfo.claims.vetting;

const whatsappUrl = getWhatsAppUrl(agencyInfo.defaultWhatsAppMessage);

const noIvrClaim =
  agencyInfo.claims.noIvr.charAt(0).toUpperCase() + agencyInfo.claims.noIvr.slice(1);

export default function AboutSection() {
  return (
    <section className="section-light" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="section-eyebrow">
              <span className="section-eyebrow-mark" />
              What you can expect
            </span>
            <h2 className="section-heading">
              Where Helpers <em>Become Family.</em>
            </h2>
            <div className="about-lead">
              <p>
                The right helper changes the whole shape of your day — meals on time, a parent who is not alone, a kitchen that runs the way yours does. Every placement is matched to your timings, your tasks, your food habits and your language.
              </p>
              <p>
                And if the fit is not right at any point, one message starts the replacement. {noIvrClaim} — a real person on WhatsApp who already knows your placement.
              </p>
            </div>

            <div className="vetting-card" aria-label="What we check before any placement">
              <div className="vetting-card-head">
                <span className="vetting-card-eyebrow">Before anyone enters your home</span>
                <h3 className="vetting-card-title">Verified. Matched. Yours.</h3>
              </div>
              <ul className="vetting-card-list">
                {vetting.map((item) => (
                  <li className="vetting-card-item" key={item}>
                    <span className="vetting-card-check" aria-hidden="true">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vetting-card-cta"
              >
                Chat on WhatsApp
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <p className="vetting-card-foot">
                {agencyInfo.address.locality} · {agencyInfo.address.city}
              </p>
            </div>
          </div>

          <div className="about-image">
            <SmartImage
              src="https://res.cloudinary.com/akjmqvws/image/upload/v1791614084/house-maid.jpg"
              alt={`A house maid working in a home in ${agencyInfo.address.city}`}
              fill
              sizes="(max-width: 992px) 100vw, 50vw"
              style={{ objectFit: 'cover', objectPosition: '36% 50%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
