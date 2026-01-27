import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import About from '@/components/sections/About/About';
import Contact from '@/components/sections/Contact/Contact';
import Hero from '@/components/sections/Hero/Hero';
import Identity from '@/components/sections/Identity/Identity';
import Pillars from '@/components/sections/Pillars/Pillars';
import Services from '@/components/sections/Services/Services';
import WhatsAppButton from '@/components/shared/WhatsAppButton/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Identity />
        <Pillars />
        <Services />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
