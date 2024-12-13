// components/TestimonialsSection.tsx
import Balancer from 'react-wrap-balancer';
import { InfiniteMovingCardsDemo } from '../Testimonials';

const TestimonialsSection = () => {
  return (
    <section className="relative w-full min-h-full py-10 overflow-hidden">
      {/* <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div> */}
      {/* <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div> */}
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
          <Balancer>Hear from our community about their experiences with our AI face matching technology</Balancer>
          </p>
        </div>

        <div className="relative">
          {/* <div className="absolute inset-0 pointer-events-none"></div> */}
          
          <div className="relative z-20">
            <InfiniteMovingCardsDemo />
          </div>
        </div>

        {/* <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div> */}
      </div>

      {/* <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div> */}
      {/* <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping"></div> */}
      
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div> */}
    </section>
  );
};

export default TestimonialsSection;