import Link from 'next/link';
import articlesData from '@/data/articles.json';
import agencyInfo from '@/data/agency.json';
import { getServiceMeta } from '@/lib/services';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: `Domestic Help Guides & Tips | ${agencyInfo.address.city}`,
  description: `Practical guides on hiring domestic help in ${agencyInfo.address.city} — maids, cooks, caregivers. How to hire, what to pay, and how to verify helpers.`,
  alternates: {
    canonical: `${agencyInfo.siteUrl}/blog/`,
  },
  openGraph: {
    title: `Domestic Help Guides & Tips | ${agencyInfo.address.city}`,
    description: `Practical guides on hiring domestic help in ${agencyInfo.address.city}.`,
    url: `${agencyInfo.siteUrl}/blog/`,
    siteName: agencyInfo.name,
    images: [{ url: `${agencyInfo.siteUrl}/og-default.jpg`, width: 1200, height: 896, alt: agencyInfo.name }],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/blog/' }
  ];

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="service-hero-editorial" style={{ background: 'var(--ink-900)', paddingTop: 96, paddingBottom: 80 }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="hero-eyebrow" style={{ color: 'var(--ink-on-dark)' }}>
              <span className="hero-eyebrow-mark" aria-hidden="true" />
              <BookOpen size={14} /> Guides &amp; Resources
            </span>
            <h1 className="hero-headline-serif" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.2rem)', color: 'var(--ink-on-dark)' }}>
              Domestic help guides for <em>{agencyInfo.address.city}</em> families
            </h1>
            <p className="hero-body-text" style={{ color: 'var(--ink-on-dark-muted)' }}>
              Practical, no-nonsense guides on hiring maids, cooks, and caregivers — how to find the right person, what to expect on salary, and how to verify helpers before they join.
            </p>
          </div>
        </div>
      </section>

      <section className="section-light" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="container">
          <div className="blog-index-grid">
            {articlesData.map((article) => {
              const related = (article.relatedServices || []).map((s) => getServiceMeta(s)).filter(Boolean);
              return (
                <Link key={article.slug} href={`/blog/${article.slug}/`} className="blog-index-card">
                  <div className="blog-index-card-meta">
                    <span>{new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="blog-index-card-meta-dot" aria-hidden="true" />
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={13} /> {article.readTime}</span>
                  </div>
                  <h2 className="blog-index-card-title">{article.title}</h2>
                  <p className="blog-index-card-excerpt">{article.excerpt}</p>
                  {related.length > 0 && (
                    <div className="blog-index-card-tags">
                      {related.map((svc) => (
                        <span key={svc.slug} className="blog-index-card-tag">{svc.shortName}</span>
                      ))}
                    </div>
                  )}
                  <span className="blog-index-card-cta">
                    Read guide <ArrowRight size={14} className="blog-index-card-cta-arrow" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <WhatsAppCTA
        title="Need help finding domestic help?"
        subtitle={`Tell us what you need. The owner replies ${agencyInfo.responseTime} on WhatsApp — direct, ${agencyInfo.claims.noIvr}.`}
      />
    </div>
  );
}
