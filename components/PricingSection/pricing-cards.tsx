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
  const standardFeatures = [
    "Monthly Credits",
    "Search Capabilities",
    "Support Level",
    "Additional Features"
  ];

  const getTop3Features = (features: string[]) => {
    const monthlyCredits = features.find(f => f.includes("Credits"));
    const remainingFeatures = features.filter(f => f !== monthlyCredits);
    const topFeatures = [];
    
    // Always include credits feature if it exists
    if (monthlyCredits) {
      topFeatures.push(monthlyCredits);
    }
    
    // Add remaining features up to a total of 3
    const additionalFeatures = remainingFeatures.slice(0, 3 - topFeatures.length);
    return [...topFeatures, ...additionalFeatures];
  };

  function renderCard(plan: PricingPlan) {
    const isLoading = loadingPlan === plan.id;
    const topFeatures = getTop3Features(plan.features);

    return (
      <div
        key={plan.id}
        className={`relative flex flex-col h-[500px] rounded-2xl overflow-hidden transition-all duration-300 
          hover:shadow-xl hover:scale-[1.02] bg-secondary border border-gray-200
          ${plan.highlighted ? "ring-2 ring-blue-500 shadow-lg" : ""}
        `}
      >
        {plan.badge && (
          <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
            {plan.badge}
          </div>
        )}
        
        <div className="flex-grow p-6 md:p-8">
          <div className="space-y-6">
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
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">Key Features:</p>
                <ul className="space-y-3">
                  {topFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="line-clamp-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
  }

  function generateFeatureRows(plans: PricingPlan[]) {
    return (
      <>
        {standardFeatures.map((category) => {
          const isCredits = category === "Monthly Credits";
          return (
            <React.Fragment key={category}>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan={plans.length + 1}>
                  {category}
                </td>
              </tr>
              {isCredits ? (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Credit Allowance</td>
                  {plans.map((plan) => (
                    <td key={plan.id} className="border border-gray-300 px-4 py-2 text-center">
                      {plan.features.find(f => f.includes("Credits"))?.split(" ")[0] || "—"}
                    </td>
                  ))}
                </tr>
              ) : (
                plans[0].features
                  .filter(feature => {
                    if (category === "Search Capabilities") 
                      return feature.includes("Search") || feature.includes("URLs") || feature.includes("Deep");
                    if (category === "Support Level")
                      return feature.includes("Support");
                    if (category === "Additional Features")
                      return !feature.includes("Credits") && 
                             !feature.includes("Search") && 
                             !feature.includes("Support") &&
                             !feature.includes("URLs");
                    return false;
                  })
                  .map((feature) => (
                    <tr key={feature}>
                      <td className="border border-gray-300 px-4 py-2">{feature}</td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="border border-gray-300 px-4 py-2 text-center">
                          {plan.features.includes(feature) ? 
                            <span className="text-green-600">✓</span> : 
                            <span className="text-gray-400">—</span>
                          }
                        </td>
                      ))}
                    </tr>
                  ))
              )}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-4 px-2">
        <div className="space-y-8">
          {renderCard(pricingPlans[0])}
          {renderCard(pricingPlans[1])}
        </div>
        <div className="space-y-8">
          {renderCard(pricingPlans[2])}
          {renderCard(pricingPlans[3])}
        </div>
        <div className="space-y-8">
          {renderCard(pricingPlans[4])}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
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
                    className="border border-gray-300 px-4 py-2 text-center min-w-[160px]"
                  >
                    <div className="font-bold">{plan.name}</div>
                    <div className="text-sm font-normal text-gray-600">
                      {plan.price}/{plan.period}
                    </div>
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
};

export default PricingCards;