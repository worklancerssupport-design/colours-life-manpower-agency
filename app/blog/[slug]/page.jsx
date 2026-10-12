import Link from 'next/link';
import { notFound } from 'next/navigation';
import articlesData from '@/data/articles.json';
import agencyInfo from '@/data/agency.json';
import { getServiceMeta, getAllServices } from '@/lib/services';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import OtherServices from '@/components/OtherServices';
import { Clock, ArrowRight, ChevronRight } from 'lucide-react';

export function generateStaticParams() {
  return articlesData.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `${agencyInfo.siteUrl}/blog/${article.slug}/`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${agencyInfo.siteUrl}/blog/${article.slug}/`,
      siteName: agencyInfo.name,
      images: [{ url: `${agencyInfo.siteUrl}/og-default.jpg`, width: 1200, height: 896, alt: agencyInfo.name }],
      locale: 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [`${agencyInfo.siteUrl}/og-default.jpg`],
    },
  };
}

export default function ArticlePage({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/blog/' },
    { name: article.title, url: `/blog/${article.slug}/` }
  ];

  const related = (article.relatedServices || []).map((s) => getServiceMeta(s)).filter(Boolean);

  return (
    <div className="svc-page" style={{ '--svc-accent': 'var(--blue-500)' }}>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": article.title,
            "description": article.metaDescription,
            "datePublished": article.date,
            "author": { "@type": "Organization", "name": agencyInfo.name, "url": agencyInfo.siteUrl },
            "publisher": { "@type": "Organization", "name": agencyInfo.name, "url": agencyInfo.siteUrl },
            "mainEntityOfPage": { "@type": "WebPage", "@id": `${agencyInfo.siteUrl}/blog/${article.slug}/` },
            "image": `${agencyInfo.siteUrl}/og-default.jpg`,
          }),
        }}
      />

      <article>
        {/* Article Header */}
        <section className="article-header-band">
          <div className="container">
            <div style={{ maxWidth: 720 }}>
              <div className="article-header-meta">
                <span>{new Date(article.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="article-header-meta-dot" aria-hidden="true" />
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={14} /> {article.readTime}</span>
              </div>
              <h1 className="hero-headline-serif" style={{ fontSize: 'clamp(2.2rem, 4.4vw, 3.2rem)' }}>{article.h1}</h1>
              <p className="lead">{article.excerpt}</p>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <section className="article-body-band">
          <div className="container" style={{ maxWidth: 760 }}>
            <div className="article-body">
              {article.sections.map((section, i) => (
                <div key={i} className="article-section">
                  <h2>{section.heading}</h2>
                  {section.body.split('\n\n').map((para, j) => (
                    <p key={j}>
                      {para.split('\n').map((line, k) => (
                        <span key={k}>{line}{k < para.split('\n').length - 1 ? <br /> : null}</span>
                      ))}
                    </p>
                  ))}
                </div>
              ))}

              {/* Related services */}
              {related.length > 0 && (
                <div className="article-related">
                  <h3>Related services</h3>
                  <div className="article-related-row">
                    {related.map((svc) => (
                      <Link key={svc.slug} href={svc.path} className="btn-ghost-dark" style={{ color: 'var(--ink-on-light)', padding: '10px 18px', fontSize: '0.9rem' }}>
                        {svc.shortName} <ChevronRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="article-cta-card">
                <h3>Ready to hire?</h3>
                <p>
                  Tell us what you need. The owner replies {agencyInfo.responseTime} on WhatsApp — direct, {agencyInfo.claims.noIvr}.
                </p>
                <Link href="/contact/" className="btn-lime" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Get in touch <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <OtherServices />
      </article>

      <WhatsAppCTA
        title="Need domestic help this week?"
        subtitle={`Tell us what you need. The owner replies ${agencyInfo.responseTime} on WhatsApp — direct, ${agencyInfo.claims.noIvr}.`}
      />
    </div>
  );
}
