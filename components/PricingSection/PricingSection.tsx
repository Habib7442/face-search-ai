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
      id: "decentralized-intelligence-agency",
      name: "Join The Decentralized Intelligence Agency",
      price: "$10,000",
      period: "month",
      description: "Designed for enterprise-level intelligence operations",
      features: [
        "Video to Google Sheets",
        "API Access",
        "Unlimited DCMA takedown requests on requested photos",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1QNsUeSABw0Heq1mDecentralized",
    },
    {
      id: "notification-plan",
      name: "1,000 Credits / Month",
      price: "$50",
      period: "month",
      description: "Stay informed with real-time notifications",
      features: [
        "Get notified when a new photo is published on someone",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1QNsWGSABw0Heq1mNotification",
    },
    {
      id: "most-popular",
      name: "MOST POPULAR",
      price: "$19.95",
      period: "month",
      description: "Advanced features for deep search capabilities",
      features: [
        "1 week free trial then 500 credits / month",
        "Unlocks Background Check Search",
        "Unlocks deep search capability",
      ],
      highlighted: true,
      buttonText: "Try Free for a Week",
      badge: "Most Popular",
      stripePriceId: "price_1QNsYkSABw0Heq1mPopular",
    },
    {
      id: "referral-plan",
      name: "Referral Plan",
      price: "$14.20",
      period: "month",
      description: "Unlock rewards and monetization features",
      features: [
        "1 week free trial then $14.20 / month",
        "Unlocks PDF form download",
        "Increases cash referral bonus from 25% to 50%",
        "Earn in perpetuity when users sign up via your link",
        "150 credits / month",
      ],
      highlighted: false,
      buttonText: "Start Free Trial",
      stripePriceId: "price_1QNsRefSABw0Heq1mReferral",
    },
    {
      id: "super-basic",
      name: "Super Basic",
      price: "$7.77",
      period: "month",
      description: "Simple and affordable starter plan",
      features: [
        "10 credits / month",
        "Unlock discovering URL’s of content",
      ],
      highlighted: false,
      buttonText: "Sign Up",
      stripePriceId: "price_1QNsBasicSABw0Heq1mSuperBasic",
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
    <section className="w-full relative min-h-full lg:px-4 md:px-2 mb-8 z-0">
      

      <div className="container relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Choose Your Plan</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          <Balancer>
              Select the perfect plan that suits your needs and unlock the full
              potential of FaceSearch AI.
          </Balancer>
            </p>
        </div>

        {/* Pricing Cards */}
        <PricingCards
          pricingPlans={pricingPlans}
          handlePurchase={handlePurchase}
          loadingPlan={loadingPlan}
          isLoaded={isLoaded}
        />
      </div>
    </section>
  );
};

export default PricingSection;
