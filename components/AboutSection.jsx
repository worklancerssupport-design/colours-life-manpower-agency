import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import agencyInfo from '@/data/agency.json';

const vetting = [
  'Aadhaar government ID verified',
  'Residential background checked',
  'Prior-work references reviewed',
  'Introduced in person by the owner',
  'Replacement support if the fit is not right',
  'Fees explained upfront, by category and shift type',
];

const defaultMsg =
  "Hello Colours Life Manpower Agency, I would like to enquire about your manpower services.";
const whatsappUrl = getWhatsAppUrl(defaultMsg);

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
                And if the fit is not right at any point, one message starts the replacement. No bots, no call centres — a real person on WhatsApp who already knows your placement.
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

          <div className="about-image-stack">
            <div className="about-image-primary">
              <Image
                src="/images/cooking-service-chennai.jpg"
                alt="A Colours Life home cook preparing a South Indian meal in a Chennai kitchen"
                fill
                sizes="(max-width: 992px) 100vw, 35vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="about-image-secondary">
              <div className="about-image-secondary-img">
                <Image
                  src="/images/newborn-baby-care-chennai.jpg"
                  alt="A newborn baby caretaker cradling a sleeping infant"
                  fill
                  sizes="(max-width: 992px) 100vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="about-experience-card">
                <div className="about-experience-num">8+</div>
                <div className="about-experience-label">
                  Years of placing cooks, nannies and attendants into Chennai homes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
