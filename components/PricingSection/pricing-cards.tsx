import React from "react";

interface PricingCardsProps {
  pricingPlans: Array<{
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
    buttonText: string;
    badge?: string;
    isFixed?: boolean;
  }>;
  handlePurchase: (plan: any) => void;
  loadingPlan: string | null;
  isLoaded: boolean;
}

const PricingCards = ({
  pricingPlans,
  handlePurchase,
  loadingPlan,
  isLoaded,
}: PricingCardsProps) => {
  return (
    <div className="flex gap-6 h-full">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className={`
            relative rounded-2xl p-6 transition-all duration-300 w-[340px] h-full flex flex-col
            ${
              plan.highlighted
                ? "bg-light-primary/5 dark:bg-dark-primary/5 border-light-primary dark:border-dark-primary scale-105 z-10"
                : "bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border hover:border-light-primary/50 dark:hover:border-dark-primary/50"
            }
            border-2 backdrop-blur-sm
          `}
        >
          {/* Badge */}
          {plan.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1 rounded-full text-xs font-medium bg-light-primary dark:bg-dark-primary text-white">
                {plan.badge}
              </span>
            </div>
          )}

          {/* Plan Header */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
              {plan.name}
            </h3>
            <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-4 line-clamp-2">
              {plan.description}
            </p>
            <div className="flex items-end justify-center gap-1">
              <span className="text-4xl font-bold text-light-foreground dark:text-dark-foreground">
                {plan.price}
              </span>
              <span className="text-light-muted-foreground dark:text-dark-muted-foreground mb-1">
                /{plan.period}
              </span>
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-3 mb-6 flex-grow">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-light-foreground dark:text-dark-foreground"
              >
                <svg
                  className="w-5 h-5 text-light-primary dark:text-dark-primary flex-shrink-0 mt-0.5"
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
                <span className="text-sm leading-tight">{feature}</span>
              </li>
            ))}
          </ul>

          {/* Action Button */}
          <button
            onClick={() => handlePurchase(plan)}
            disabled={!isLoaded || loadingPlan === plan.id}
            className={`
              w-full py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 mt-auto
              ${
                plan.highlighted
                  ? "bg-light-primary dark:bg-dark-primary text-white hover:bg-light-primary/90 dark:hover:bg-dark-primary/90"
                  : "bg-light-accent/10 dark:bg-dark-accent/10 text-light-foreground dark:text-dark-foreground hover:bg-light-accent/20 dark:hover:bg-dark-accent/20"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {loadingPlan === plan.id ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              plan.buttonText
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
