import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const promises = [
  {
    num: '01',
    title: 'Elderly Attendant',
    desc: 'Patient companions for mobility, medicines, and unhurried conversation.',
    img: '/images/elderly-care-service-chennai.jpg',
    alt: 'A caregiver gently supporting a senior at home',
    tag: 'Daily · Live-in',
    href: '/services/elderly-care/',
  },
  {
    num: '02',
    title: 'Newborn Caretaker',
    desc: 'Calm, gentle hands for bathing, swaddling and night feeds.',
    img: '/images/newborn-baby-care-chennai.jpg',
    alt: 'A caretaker holding a sleeping newborn baby',
    tag: '24/7 · Day shift',
    href: '/services/newborn-baby-care/',
  },
  {
    num: '03',
    title: 'Patient Care Attendant',
    desc: 'Bedside assistance, transfers and dignified hygiene post-surgery.',
    img: '/images/patient-care-service-chennai.jpg',
    alt: 'A patient care assistant supporting recovery at home',
    tag: 'Recovery · Live-in',
    href: '/services/patient-care/',
  },
];

export default function PromiseSection() {
  return (
    <section className="section-dark" id="promise" aria-label="Helpers at your doorstep">
      <div className="container">
        <div className="promise-block">
          <div>
            <span className="section-eyebrow section-eyebrow-dark">
              <span className="section-eyebrow-mark" />
              Helpers at your doorstep
            </span>
            <h2 className="promise-headline">
              Daughters, Mothers, Aides. <em>Trust Included.</em>
            </h2>
            <p className="section-subline section-subline-light">
              Every placement is Aadhaar-verified, locally referenced, and introduced in person. Same smiling helper every morning, police-verified.
            </p>
          </div>

          <div className="helpers-rows">
            {promises.map((p) => (
              <Link
                key={p.num}
                href={p.href}
                className="helper-row"
                aria-label={`Explore ${p.title}`}
              >
                <div className="helper-row-image">
                  <Image
                    src={p.img}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="helper-row-body">
                  <span className="helper-row-tag">{p.num} · {p.tag}</span>
                  <span className="helper-row-title">{p.title}</span>
                  <p className="helper-row-desc">{p.desc}</p>
                  <div className="helper-row-foot">
                    <span className="helper-row-arrow" aria-hidden="true">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}