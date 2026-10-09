import pagesData from '@/data/pages.json';
import { fillPlaceholders } from '@/lib/utils';
import { MapPin, HeartHandshake, ShieldCheck, MessageCircle } from 'lucide-react';

const { whyChooseUs } = fillPlaceholders(pagesData.homePage);

const uspIcons = {
  MapPin,
  HeartHandshake,
  ShieldCheck,
  MessageCircle,
};

export default function WhyChooseUs() {
  const headingWords = fillPlaceholders(whyChooseUs.heading).split(' ');
  return (
    <section className="section-light" id="why-choose-us" aria-label="Why families choose us">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            {fillPlaceholders(whyChooseUs.eyebrow)}
          </span>
          <h2 className="section-heading">
            {headingWords.slice(0, -3).join(' ')} <em>{headingWords.slice(-3).join(' ')}</em>
          </h2>
          <p className="section-subline">{fillPlaceholders(whyChooseUs.subtext)}</p>
        </div>

        <div className="usp-grid">
          {whyChooseUs.items.map((item) => {
            const Icon = uspIcons[item.icon];
            return (
              <div className="usp-cell" key={item.title}>
                <span className="usp-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="usp-title">{fillPlaceholders(item.title)}</h3>
                  <p className="usp-desc">{fillPlaceholders(item.description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
