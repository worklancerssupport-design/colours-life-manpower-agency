import pagesData from '@/data/pages.json';
import { MapPin, HeartHandshake, ShieldCheck, MessageCircle } from 'lucide-react';

const { whyChooseUs } = pagesData.homePage;

const uspIcons = {
  MapPin,
  HeartHandshake,
  ShieldCheck,
  MessageCircle,
};

export default function WhyChooseUs() {
  return (
    <section className="section-light" id="why-choose-us" aria-label="Why families choose us">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            {whyChooseUs.eyebrow}
          </span>
          <h2 className="section-heading">
            Because the right help makes <em>everyday life easier.</em>
          </h2>
          <p className="section-subline">{whyChooseUs.subtext}</p>
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
                  <h3 className="usp-title">{item.title}</h3>
                  <p className="usp-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
