"use client";

import { useState } from "react";
import { toast } from "sonner";
import Balancer from "react-wrap-balancer";
import PricingCards from "./pricing-cards";
import { RootState } from "@/lib/redux/store";
import { useAppSelector } from "@/lib/redux";
import { motion } from "framer-motion";

const PricingSection = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showBusinessPlans, setShowBusinessPlans] = useState(false);

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
      highlighted: true,
      buttonText: "Get Started",
      badge: "Most Popular",
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
      highlighted: false,
      buttonText: "Get Started",
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
      highlighted: true,
      buttonText: "Get Started",
      badge: "Most Popular",
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

  // Split plans into categories
  const individualPlans = pricingPlans.filter(plan => 
    ["basic-starter-plan", "premium-plan", "professional-plan"].includes(plan.id)
  );

  const businessPlans = pricingPlans.filter(plan => 
    ["business-plan", "enterprise-plan"].includes(plan.id)
  );

  const isLoaded = user !== null;

  const handlePurchase = async (plan: typeof pricingPlans[0]) => {
    if (!isLoaded) {
      return;
    }

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
    <section className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl font-bold text-slate-900">
              Choose Your Perfect Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              <Balancer>
                Select the plan that best fits your needs, from individual users to enterprise solutions.
              </Balancer>
            </p>
          </motion.div>

          {/* Plan Type Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4"
          >
            <span className={`text-sm ${!showBusinessPlans ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
              Individual & Professional
            </span>
            <button
              onClick={() => setShowBusinessPlans(!showBusinessPlans)}
              className={`
                relative w-16 h-8 rounded-full transition-colors duration-300
                ${showBusinessPlans ? 'bg-indigo-600' : 'bg-slate-200'}
              `}
            >
              <div
                className={`
                  absolute w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300
                  ${showBusinessPlans ? 'translate-x-9' : 'translate-x-1'}
                `}
              />
            </button>
            <span className={`text-sm ${showBusinessPlans ? 'text-slate-900 font-semibold' : 'text-slate-600'}`}>
              Business & Enterprise
            </span>
          </motion.div>
        </div>

        {/* Display Plans based on toggle */}
        <motion.div
          key={showBusinessPlans ? 'business' : 'individual'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <PricingCards
            pricingPlans={showBusinessPlans ? businessPlans : individualPlans}
            handlePurchase={handlePurchase}
            loadingPlan={loadingPlan}
            isLoaded={isLoaded}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 