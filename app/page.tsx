// import FeaturesSection from "@/components/FeaturesSection";
// import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs/AboutUs";
import Herosection from "@/components/HeroSection/hero-section";
import PricingSection from "@/components/PricingSection/PricingSection";
// import Navbar from "@/components/navigation/Navbar";
// import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <Herosection />
       <AboutUs />
    {/* <FeaturesSection /> */}
    <PricingSection />
    {/* <TestimonialsSection /> */}
    {/* <Footer />  */}
    </div>
  );
}
