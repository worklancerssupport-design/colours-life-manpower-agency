import agencyInfo from '@/data/agency.json';
import FAQSchema from '@/components/FAQSchema';
import generalFaqs from '@/data/faqs.json';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServiceRows from '@/components/ServiceRows';
import CareTabs from '@/components/CareTabs';
import PromiseSection from '@/components/PromiseSection';
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
      <AboutSection />
      <ServiceRows />
      <CareTabs />
      <PromiseSection />
      <ToughestCases />
      <ReviewSection limit={6} />
      <FAQSection
        faqs={generalFaqs}
        title="Questions? We have answers."
        subtitle="Practical answers on hiring domestic help in Chennai, background checks, live-in options, and agency policies."
      />
      <WhatsAppCTA
        title="Need a hand at home this week?"
        subtitle="Tell us what you need. Thomas R is one WhatsApp away — usually replying inside an hour, founder-direct, no IVR."
      />
    </>
  );
}