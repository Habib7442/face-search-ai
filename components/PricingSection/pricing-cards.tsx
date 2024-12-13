import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const renderCard = (plan: PricingPlan) => {
    const isLoading = loadingPlan === plan.id;

    return (
      <div
        key={plan.id}
        className={`relative flex flex-col h-full min-h-[300px] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-secondary border border-gray-200 ${
          plan.highlighted ? "ring-2 ring-blue-500 shadow-lg" : ""
        }`}
      >
        {plan.badge && (
          <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {plan.badge}
          </div>
        )}

        <div className="flex-grow p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-600 h-12">{plan.description}</p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl font-extrabold text-gray-900">
              {plan.price}
            </span>
            {plan.price !== "Custom" && (
              <span className="text-lg text-gray-600">/{plan.period}</span>
            )}
          </div>

          <div className="space-y-4">
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 md:p-8 mt-auto">
          <Button
            onClick={() => handlePurchase(plan)}
            disabled={isLoading || !isLoaded}
            className={`w-full py-4 text-white ${
              plan.highlighted
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                : "bg-gray-800 hover:bg-gray-900"
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
        </div>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-4 px-2">
      {pricingPlans.map((plan) => renderCard(plan))}
    </div>
  );
};

export default PricingCards;