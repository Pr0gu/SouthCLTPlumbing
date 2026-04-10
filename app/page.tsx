import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileCTA from '@/components/common/MobileCTA';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import WarningSigns from '@/components/sections/WarningSigns';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import LocalExpertise from '@/components/sections/LocalExpertise';
import DIYTest from '@/components/sections/DIYTest';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import Guarantee from '@/components/sections/Guarantee';
import EmergencyCTA from '@/components/sections/EmergencyCTA';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import ServiceAreas from '@/components/sections/ServiceAreas';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      {/* Fixed background video — plays behind entire page */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/hero-poster.jpg"
        className="fixed inset-0 z-0 h-full w-full object-cover motion-reduce:hidden"
        aria-hidden="true"
      >
        <source src="/video/hero.mp4" type="video/mp4" media="(min-width: 1024px)" />
        <source src="/video/hero-mobile.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <Header />
        <main id="main">
          <Hero />
          {/* Single translucent overlay for all content — no seams */}
          <div className="-mt-1 bg-brand-dark/95 backdrop-blur-md">
            <TrustBar />
            <WarningSigns />
            <Services />
            <HowItWorks />
            <LocalExpertise />
            <DIYTest />
            <WhyChooseUs />
            <Guarantee />
            <EmergencyCTA />
            <Testimonials />
            <FAQ />
            <ServiceAreas />
            <ContactForm />
          </div>
        </main>
        <Footer />
        {/* Spacer for mobile sticky CTA bar */}
        <div className="h-16 md:hidden" />
        <MobileCTA />
      </div>
    </>
  );
}
