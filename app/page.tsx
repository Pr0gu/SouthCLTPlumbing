import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import MobileCTA from '@/components/common/MobileCTA';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import EmergencyCTA from '@/components/sections/EmergencyCTA';
import ServiceAreas from '@/components/sections/ServiceAreas';
import Testimonials from '@/components/sections/Testimonials';
import ContactForm from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
        <EmergencyCTA />
        <Testimonials />
        <ServiceAreas />
        <ContactForm />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
