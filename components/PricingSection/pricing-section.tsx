"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Basic",
    price: { monthly: 29, annual: 290 },
    description: "Perfect for individuals and small projects",
    features: [
      "100 Face Searches per month",
      "Basic API access",
      "Standard support",
      "72-hour data retention",
      "Basic analytics",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: { monthly: 79, annual: 790 },
    description: "Ideal for growing businesses",
    features: [
      "1,000 Face Searches per month",
      "Advanced API access",
      "Priority support",
      "30-day data retention",
      "Advanced analytics",
      "Custom integration",
      "Bulk processing",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 199, annual: 1990 },
    description: "For large-scale operations",
    features: [
      "Unlimited Face Searches",
      "Full API access",
      "24/7 Premium support",
      "90-day data retention",
      "Enterprise analytics",
      "Custom integration",
      "Bulk processing",
      "Dedicated account manager",
      "Custom SLA",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Choose the perfect plan for your needs. Save up to 20% with annual billing.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-16 h-8 rounded-full bg-indigo-600 transition-colors duration-300"
            >
              <motion.div
                initial={false}
                animate={{ x: isAnnual ? 32 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-0 w-6 h-6 rounded-full bg-white shadow-lg"
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
              Annual
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-indigo-600 text-white shadow-xl scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-slate-900 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2">
                  <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                    <Star className="w-4 h-4 fill-indigo-600" /> Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}`}>
                  /{isAnnual ? 'year' : 'month'}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${
                      plan.highlighted ? 'text-indigo-200' : 'text-indigo-600'
                    }`} />
                    <span className={`text-sm ${
                      plan.highlighted ? 'text-indigo-100' : 'text-slate-600'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600">
            Have questions? Check out our{" "}
            <a href="/faq" className="text-indigo-600 hover:text-indigo-700 font-medium">
              FAQ section
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
} 