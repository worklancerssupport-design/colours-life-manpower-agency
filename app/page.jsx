import agencyInfo from '@/data/agency.json';
import FAQSchema from '@/components/FAQSchema';
import generalFaqs from '@/data/faqs.json';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import AboutSection from '@/components/AboutSection';
import ServiceRows from '@/components/ServiceRows';
import HowItWorks from '@/components/HowItWorks';
import ToughestCases from '@/components/ToughestCases';
import ReviewSection from '@/components/ReviewSection';
import FAQSection from '@/components/FAQSection';
import WhatsAppCTA from '@/components/WhatsAppCTA';

export const metadata = {
  title: 'Manpower Agency in Thoraipakkam | Colours Life Manpower Agency',
  description:
    'Colours Life Manpower Agency provides cooks, maids, baby care, newborn care, elderly care, patient care, Brahmin cooks and drivers in Thoraipakkam and Chennai.',
  alternates: {
    canonical: `${agencyInfo.siteUrl}/`,
  },
};

export default function HomePage() {
  return (
    <>
      <FAQSchema faqs={generalFaqs} />
      <Hero />
      <TrustStrip />
      <ServiceRows />
      <HowItWorks />
      <AboutSection />
      <ToughestCases />
      <ReviewSection limit={6} />
      <FAQSection
        faqs={generalFaqs}
        title="Questions? We have answers."
        subtitle="Practical answers on hiring domestic help in Chennai, background checks, live-in options, and agency policies."
      />
      <WhatsAppCTA
        title="Need a hand at home this week?"
        subtitle="Tell us what you need. The owner replies within the hour on WhatsApp — direct, no IVR, no bots."
      />
    </>
  );
}
