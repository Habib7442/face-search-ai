import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/FooterSection/Footer";
import Herosection from "@/components/HeroSection/hero-section";
import Navbar from "@/components/navigation/Navbar";
import PricingSection from "@/components/PricingSection/PricingSection";
import TestimonialsSection from "@/components/TestimonialSection/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="mt-8">
        <Herosection />
      </div>
      <div>
        <AboutUs />
      </div>
      <div>
        <PricingSection />
      </div>
      <div>
        <TestimonialsSection />
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
