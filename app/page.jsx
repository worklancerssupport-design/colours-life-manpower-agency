import agencyInfo from '@/data/agency.json';
import FAQSchema from '@/components/FAQSchema';
import generalFaqs from '@/data/faqs.json';
import { fillPlaceholders, getServiceListText } from '@/lib/utils';
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
  title: `Manpower Agency in ${agencyInfo.address.locality} | ${agencyInfo.name}`,
  description:
    `${agencyInfo.name} provides ${getServiceListText()} in ${agencyInfo.address.locality}, OMR, and ${agencyInfo.address.city}.`,
  alternates: {
    canonical: `${agencyInfo.siteUrl}/`,
  },
};

export default function HomePage() {
  const faqs = fillPlaceholders(generalFaqs);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <Hero />
      <TrustStrip />
      <ServiceRows />
      <HowItWorks />
      <AboutSection />
      <ToughestCases />
      <ReviewSection limit={6} />
      <FAQSection
        faqs={faqs}
        title="Questions? We have answers."
        subtitle={`Practical answers on hiring domestic help in ${agencyInfo.address.city}, background checks, live-in options, and agency policies.`}
      />
      <WhatsAppCTA
        title="Need a hand at home this week?"
        subtitle={`Tell us what you need. The owner replies ${agencyInfo.responseTime} on WhatsApp — direct, ${agencyInfo.claims.noIvr}.`}
      />
    </>
  );
}
