"use client";

import { useState } from "react";
import { toast } from "sonner";
import Balancer from "react-wrap-balancer";
import PricingCards from "./pricing-cards";
import { RootState } from "@/lib/redux/store"; // Adjust import path as needed
import { useAppSelector } from "@/lib/redux";

const PricingSection = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: "enterprise-plan",
      name: "Enterprise Plan",
      price: "$450",
      period: "month",
      description: "Ultimate solution for enterprise-level needs",
      features: [
        "Video to GSheet Integration",
        "Full API Access",
        "Unlimited DCMA Takedown Requests for Requested Photos",
        "24/7 Dedicated Support",
        "Customizable Report Generation",
        "Priority Support and Service",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1EnterprisePlan",
    },
    {
      id: "business-plan",
      name: "Business Plan",
      price: "$50",
      period: "month",
      description: "Perfect for small businesses and teams",
      features: [
        "Receive Notifications When New Photos Are Published on Someone",
        "1,000 Credits for Monthly Use",
        "Unlimited Basic Image Research",
        "Email and Chat Support",
        "Access to Basic Data Insights",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1BusinessPlan",
    },
    {
      id: "professional-plan",
      name: "Professional Plan",
      price: "$19.95",
      period: "month",
      description: "Advanced features for professionals",
      features: [
        "Unlocks Background Check Search",
        "Unlocks Deep Search Capabilities",
        "500 Credits for Monthly Use",
        "Access to Advanced Search Filters",
        "24/7 Basic Support",
      ],
      highlighted: true,
      buttonText: "Get Started",
      badge: "Most Popular",
      stripePriceId: "price_1ProfessionalPlan",
    },
    {
      id: "premium-plan",
      name: "Premium Plan",
      price: "$14.20",
      period: "month",
      description: "Unlock premium features and referrals",
      features: [
        "Unlocks PDF Form Download",
        "Perpetual Referral Earnings for Background Checks",
        "150 Credits for Monthly Use",
        "Priority Referral Earnings Support",
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripePriceId: "price_1PremiumPlan",
    },
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
    },
  ];

  // Check if user data is loaded
  const isLoaded = user !== null;

  const handlePurchase = async (plan: (typeof pricingPlans)[0]) => {
    // If user state is not fully loaded
    if (!isLoaded) {
      return;
    }

    // Check if user is signed in (has an ID)
    if (!user.id) {
      toast("You need to be signed in to purchase a plan");
      return;
    }

    try {
      setLoadingPlan(plan.id);

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          planId: plan.id,
          userId: user.id 
        }),
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