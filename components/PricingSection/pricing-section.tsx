"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PricingCards from "./pricing-cards";
import Balancer from "react-wrap-balancer";
import { useAppSelector } from "@/lib/redux";
import { RootState } from "@/lib/redux/store";

const PricingSection = () => {
  const [showBusinessPlans, setShowBusinessPlans] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const user = useAppSelector((state: RootState) => state.user);

  const pricingPlans = [
    {
      id: "basic-starter-plan",
      name: "Basic Starter Plan",
      price: "$7.77",
      period: "month",
      description: "Affordable plan for beginners",
      features: [
        "Unlocks Discovering URLs of Content",
        "10 Credits for Monthly Use",
        "Access to Basic Search Functions",
      ],
      highlighted: false,
      buttonText: "Sign Up",
      stripePriceId: "price_1BasicStarterPlan",
      isFixed: true,
    },
    {
      id: "premium-plan",
      name: "Premium Plan",
      price: "$19.99",
      period: "month",
      description: "Perfect for individual professionals",
      features: [
        "Everything in Basic Plan",
        "50 Credits for Monthly Use",
        "Advanced Search Features",
        "Priority Support",
      ],
      highlighted: true,
      buttonText: "Get Premium",
      stripePriceId: "price_1PremiumPlan",
      badge: "Most Popular",
    },
    {
      id: "professional-plan",
      name: "Professional Plan",
      price: "$39.99",
      period: "month",
      description: "For power users and small teams",
      features: [
        "Everything in Premium Plan",
        "150 Credits for Monthly Use",
        "API Access",
        "24/7 Priority Support",
      ],
      highlighted: false,
      buttonText: "Get Professional",
      stripePriceId: "price_1ProfessionalPlan",
    },
    {
      id: "business-plan",
      name: "Business Plan",
      price: "$99.99",
      period: "month",
      description: "For growing businesses",
      features: [
        "Everything in Professional Plan",
        "500 Credits for Monthly Use",
        "Advanced Analytics",
        "Custom Integration Support",
      ],
      highlighted: true,
      buttonText: "Get Business",
      stripePriceId: "price_1BusinessPlan",
      badge: "Best Value",
    },
    {
      id: "enterprise-plan",
      name: "Enterprise Plan",
      price: "Custom",
      period: "month",
      description: "For large organizations",
      features: [
        "Everything in Business Plan",
        "Unlimited Credits",
        "Custom Features",
        "Dedicated Account Manager",
      ],
      highlighted: false,
      buttonText: "Contact Us",
      stripePriceId: "price_1EnterprisePlan",
    },
  ];

  // Split plans into categories, keeping Basic Starter Plan separate
  const basicPlan = pricingPlans.find(
    (plan) => plan.id === "basic-starter-plan"
  );

  const individualPlans = pricingPlans.filter(
    (plan) =>
      !plan.isFixed && ["premium-plan", "professional-plan"].includes(plan.id)
  );

  const businessPlans = pricingPlans.filter(
    (plan) =>
      !plan.isFixed && ["business-plan", "enterprise-plan"].includes(plan.id)
  );

  const handlePurchase = async (plan: any) => {
    if (!user.id) {
      window.location.href = "/sign-in";
      return;
    }

    setLoadingPlan(plan.id);
    setIsLoaded(false);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingPlan(null);
      setIsLoaded(true);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-light-background dark:bg-dark-background">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-bold text-light-foreground dark:text-dark-foreground">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-light-muted-foreground dark:text-dark-muted-foreground max-w-2xl mx-auto">
              <Balancer>
                Select the plan that best fits your needs, from individual users
                to enterprise solutions.
              </Balancer>
            </p>
          </motion.div>

          {/* Plan Type Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center space-x-3"
          >
            <span
              className={`text-sm font-medium ${
                !showBusinessPlans
                  ? "text-light-foreground dark:text-dark-foreground"
                  : "text-light-muted-foreground dark:text-dark-muted-foreground"
              }`}
            >
              Individual
            </span>
            <button
              onClick={() => setShowBusinessPlans(!showBusinessPlans)}
              type="button"
              role="switch"
              aria-checked={showBusinessPlans}
              className={`
                relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                transition-colors duration-200 ease-in-out focus:outline-none
                ${
                  showBusinessPlans
                    ? "bg-light-primary dark:bg-dark-primary"
                    : "bg-light-accent/20 dark:bg-dark-accent/20"
                }
              `}
            >
              <span
                aria-hidden="true"
                className={`
                  pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 
                  transition duration-200 ease-in-out
                  ${showBusinessPlans ? "translate-x-5" : "translate-x-0"}
                `}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                showBusinessPlans
                  ? "text-light-foreground dark:text-dark-foreground"
                  : "text-light-muted-foreground dark:text-dark-muted-foreground"
              }`}
            >
              Business
            </span>
          </motion.div>
        </div>

        {/* Display All Plans in One Row */}
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap justify-center items-stretch gap-6">
            {showBusinessPlans ? (
              // Business & Enterprise Plans
              <>
                <div className="w-[340px]">
                  <PricingCards
                    pricingPlans={[businessPlans.find((p) => !p.highlighted)!]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
                <div className="w-[340px] mt-4">
                  <PricingCards
                    pricingPlans={[businessPlans.find((p) => p.highlighted)!]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
                <div className="w-[340px]">
                  <PricingCards
                    pricingPlans={[basicPlan!]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
              </>
            ) : (
              // Individual & Professional Plans
              <>
                <div className="w-[340px]">
                  <PricingCards
                    pricingPlans={[
                      individualPlans.find((p) => !p.highlighted)!,
                    ]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
                <div className="w-[340px] mt-4">
                  <PricingCards
                    pricingPlans={[individualPlans.find((p) => p.highlighted)!]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
                <div className="w-[340px]">
                  <PricingCards
                    pricingPlans={[basicPlan!]}
                    handlePurchase={handlePurchase}
                    loadingPlan={loadingPlan}
                    isLoaded={isLoaded}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
