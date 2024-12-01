import React from "react";
import { CardHoverEffectDemo } from "./FeaturesCard";

const FeaturesSection = () => {
  return (
    <section className="relative w-full min-h-screen py-10 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300">
            Features
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Discover the cutting-edge capabilities that make our AI face
            matching technology stand out
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl"></div>

        {/* Features Cards */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-900/50 to-transparent pointer-events-none"></div>
          <CardHoverEffectDemo />
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default FeaturesSection;
