"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import Balancer from "react-wrap-balancer";
import PricingCards from "./pricing-cards";

const PricingSection = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      period: "month",
      description: "Perfect for individuals starting with face search",
      features: [
        "10 Face searches per day",
        "Basic web search results",
        "Email support",
        "Export search history",
        "Standard API access",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1QNsUeSABw0Heq1mTI8fY0jE",
    },
    {
      id: "pro",
      name: "Pro",
      price: "$24.99",
      period: "month",
      description: "Ideal for professionals and small teams",
      features: [
        "50 Face searches per day",
        "Advanced search filters",
        "Priority support",
        "Contact information finder",
        "Custom poem generation",
        "Advanced API access",
        "Bulk search capability",
      ],
      highlighted: true,
      buttonText: "Try Pro Plan",
      badge: "Most Popular",
      stripePriceId: "price_1QNsWGSABw0Heq1mCNToLIF2",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "month",
      description: "For organizations requiring advanced solutions",
      features: [
        "Unlimited face searches",
        "Dedicated support team",
        "Custom integration",
        "Advanced analytics",
        "White-label option",
        "Enterprise API access",
        "Custom feature development",
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      stripePriceId: "price_1QNsYkSABw0Heq1mPMQtOsBB",
    },
  ];

  const handlePurchase = async (plan: (typeof pricingPlans)[0]) => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      toast("You need to be signed in to purchase a plan");
      return;
    }

    try {
      setLoadingPlan(plan.id);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Purchase error:", error);
      toast("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="container relative min-h-full px-4 mb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h2>
          <Balancer>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Select the perfect plan that suits your needs and unlock the full
              potential of FaceSearch AI.
            </p>
          </Balancer>
        </div>

        {/* Pricing Cards */}
        <PricingCards
          pricingPlans={pricingPlans}
          handlePurchase={handlePurchase}
          loadingPlan={loadingPlan}
          isLoaded={isLoaded}
        />

        {/* FAQ */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-400">
            Have questions about our pricing?
            <a
              href="#"
              className="text-cyan-400 underline hover:text-cyan-300 ml-1"
            >
              Contact our team
            </a>
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default PricingSection;
