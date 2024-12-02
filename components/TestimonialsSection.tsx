// components/TestimonialsSection.tsx
import { InfiniteMovingCardsDemo } from './Testimonials';

const TestimonialsSection = () => {
  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
            What Our Users Say
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Hear from our community about their experiences with our AI face matching technology
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/50 to-transparent pointer-events-none"></div>
          
          <div className="relative z-20">
            <InfiniteMovingCardsDemo />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      </div>

      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-blue-500 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping"></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>
    </section>
  );
};

export default TestimonialsSection;