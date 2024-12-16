// components/TestimonialsSection.tsx
import Balancer from "react-wrap-balancer";
import { InfiniteMovingCardsDemo } from "../Testimonials";

const TestimonialsSection = () => {
  return (
    <section className="relative w-full min-h-full py-10 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">What Our Users Say</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            <Balancer>
              Hear from our community about their experiences with our AI face
              matching technology
            </Balancer>
          </p>
        </div>

        <div className="relative">
          <div className="relative z-20">
            <InfiniteMovingCardsDemo />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
