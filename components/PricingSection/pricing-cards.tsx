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
  const gradientColors: Record<string, string> = {
    "decentralized-intelligence-agency": "from-purple-200 to-purple-100",
    "notification-plan": "from-red-200 to-red-100",
    "most-popular": "from-blue-200 to-blue-100",
    "referral-plan": "from-green-200 to-green-100",
    "super-basic": "from-gray-200 to-gray-100",
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-4 px-2">
        {/* First row for medium devices, First column for large devices */}
        <div className="space-y-8">
          {renderCard(pricingPlans[0])}
          {renderCard(pricingPlans[1])}
        </div>

        {/* Second row for medium devices, Center column for large devices */}
        <div className="space-y-8">
          {renderCard(pricingPlans[2])}
          {renderCard(pricingPlans[3])}
        </div>

        {/* Third row for medium devices, Last column for large devices */}
        <div className="space-y-8">{renderCard(pricingPlans[4])}</div>
      </div>

      {/* Comparison Table */}
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Plan Features Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Feature</th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{generateFeatureRows(pricingPlans)}</tbody>
          </table>
        </div>
      </div>
    </>
  );

  function renderCard(plan: PricingPlan) {
    const isLoading = loadingPlan === plan.id;
    const gradient = gradientColors[plan.id] || "from-gray-200 to-gray-100";

    return (
      <div
        key={plan.id}
        className={`flex flex-col justify-between min-h-[350px] rounded-2xl overflow-hidden transition-all duration-300 
          hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br ${gradient} 
          ${plan.highlighted ? "ring-2 ring-cyan-400" : ""}
        `}
      >
        <div className="p-6 md:p-8 space-y-6">
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
        </div>
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
      </div>
    );
  }

  function generateFeatureRows(plans: PricingPlan[]) {
    const allFeatures = Array.from(
      new Set(plans.flatMap((plan) => plan.features))
    );

    return allFeatures.map((feature) => (
      <tr key={feature}>
        <td className="border border-gray-300 px-4 py-2">{feature}</td>
        {plans.map((plan) => (
          <td
            key={plan.id}
            className="border border-gray-300 px-4 py-2 text-center"
          >
            {plan.features.includes(feature) ? "✔️" : "—"}
          </td>
        ))}
      </tr>
    ));
  }
};

export default PricingCards;
