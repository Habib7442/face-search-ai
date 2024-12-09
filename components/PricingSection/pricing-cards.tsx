import React from "react";
import {  Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a type for the pricing plan to resolve TypeScript issue
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
  // Explicitly typed gradient colors
  const gradientColors: Record<string, string> = {
    basic: "from-orange-200 to-orange-100",
    pro: "from-indigo-200 to-indigo-100",
    enterprise: "from-sky-200 to-sky-100",
  };

  return (
    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {pricingPlans.map((plan) => {
        const isLoading = loadingPlan === plan.id;
        const gradient = gradientColors[plan.id] || "from-gray-200 to-gray-100";

        return (
          <div
            key={plan.id}
            className={`relative rounded-2xl overflow-hidden transition-all duration-300 ease-in-out 
              hover:shadow-2xl hover:scale-[1.02] 
              bg-gradient-to-br ${gradient} 
              ${plan.highlighted ? "ring-2 ring-cyan-400 scale-[1.02]" : ""}
            `}
          >
            {/* Card Content */}
            <div className="p-6 md:p-8 space-y-6 relative z-0">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div>
                <span className="text-4xl font-extrabold text-gray-900">
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className="text-lg text-gray-600">/{plan.period}</span>
                )}
              </div>
              <p className="text-gray-700">{plan.description}</p>

              <Button
                onClick={() => handlePurchase(plan)}
                disabled={isLoading || !isLoaded}
                className={`w-full text-white ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  plan.buttonText
                )}
              </Button>

              <ul className="space-y-4 text-sm">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-gray-800"
                  >
                    <Check className="text-cyan-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PricingCards;
