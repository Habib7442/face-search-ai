import React from "react";
import { Loader2, Check } from "lucide-react";
import { motion } from "framer-motion";

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  buttonText: string;
  stripePriceId: string;
  badge?: string;
}

const PricingCards: React.FC<{
  pricingPlans: PricingPlan[];
  handlePurchase: (plan: PricingPlan) => Promise<void>;
  loadingPlan?: string | null;
  isLoaded?: boolean;
}> = ({ pricingPlans, handlePurchase, loadingPlan = "", isLoaded = true }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {pricingPlans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`
            relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300
            ${plan.highlighted 
              ? 'bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-xl scale-105 z-10' 
              : 'bg-white hover:shadow-xl border border-slate-200'
            }
          `}
        >
          {/* Popular Badge */}
          {plan.badge && (
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
                {plan.badge}
              </span>
            </div>
          )}

          {/* Card Content */}
          <div className="p-8 flex-grow space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <h3 className={`text-2xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}`}>
                {plan.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-baseline">
                <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ml-2 ${plan.highlighted ? 'text-indigo-100' : 'text-slate-600'}`}>
                  /{plan.period}
                </span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className={`w-5 h-5 flex-shrink-0 ${
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
          </div>

          {/* Button */}
          <div className="p-8 pt-0">
            <button
              onClick={() => handlePurchase(plan)}
              disabled={loadingPlan === plan.id || !isLoaded}
              className={`
                w-full py-3 px-4 rounded-xl font-medium transition-all duration-200
                ${plan.highlighted
                  ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {loadingPlan === plan.id ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </div>
              ) : (
                plan.buttonText
              )}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;