import AboutUs from "@/components/AboutUs/AboutUs";
import Footer from "@/components/FooterSection/Footer";
import Herosection from "@/components/HeroSection/hero-section";
import Navbar from "@/components/navigation/Navbar";
import PricingSection from "@/components/PricingSection/pricing-section";
// import PricingSection from "@/components/PricingSection/PricingSection";
import TestimonialsSection from "@/components/Testimonials/testimonials-section";
// import TestimonialsSection from "@/components/TestimonialSection/TestimonialsSection";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-hidden">
        <Navbar />
        <Herosection />
        <AboutUs />
        <PricingSection />
        <TestimonialsSection />
        <Footer />
    </main>
  );
}
