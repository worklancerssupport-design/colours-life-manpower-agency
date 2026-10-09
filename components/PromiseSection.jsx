import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import agencyInfo from '@/data/agency.json';
import { getServiceMeta } from '@/lib/services';

const promiseCopy = {
  'elderly-care': {
    desc: 'Patient companions for mobility, medicines, and unhurried conversation.',
    tag: 'Daily · Live-in',
  },
  'newborn-baby-care': {
    desc: 'Calm, gentle hands for bathing, swaddling and night feeds.',
    tag: '24/7 · Day shift',
  },
  'patient-care': {
    desc: 'Bedside assistance, transfers and dignified hygiene post-surgery.',
    tag: 'Recovery · Live-in',
  },
};

const promises = ['elderly-care', 'newborn-baby-care', 'patient-care']
  .map((slug, idx) => {
    const svc = getServiceMeta(slug);
    if (!svc) return null;
    return {
      num: String(idx + 1).padStart(2, '0'),
      title: svc.navTitle,
      desc: promiseCopy[slug].desc,
      img: svc.image,
      alt: svc.alt,
      tag: promiseCopy[slug].tag,
      href: svc.path,
    };
  })
  .filter(Boolean);

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
              Every placement is {agencyInfo.claims.idCheckVerified}, locally referenced, and introduced in person. Same smiling helper every morning.
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
