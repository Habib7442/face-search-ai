"use client";
import { Check, Star, Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";

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

      // For enterprise plan, redirect to contact page
      // if (plan.id === "enterprise") {
      //   window.location.href = "/contact";
      //   return;
      // }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Purchase error:", error);
      toast("Failed to initiate checkout. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-20 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-5 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200">
            Choose Your Plan
          </h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Select the perfect plan that suits your needs and unlock the full
            potential of FaceSearch AI
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105
                ${
                  plan.highlighted
                    ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/50 hover:border-blue-400"
                    : "bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 hover:border-slate-600"
                }
              `}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {plan.badge}
                  </div>
                </div>
              )}

              {/* Card Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-slate-400">/{plan.period}</span>
                  )}
                </div>
                <p className="text-slate-400 mb-6">{plan.description}</p>

                <Button
                  onClick={() => handlePurchase(plan)}
                  disabled={loadingPlan === plan.id || !isLoaded}
                  className={`w-full mb-8 ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {plan.buttonText}
                      {plan.highlighted && <Zap className="w-4 h-4 ml-2" />}
                    </>
                  )}
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Note */}
        <div className="text-center mt-16">
          <p className="text-slate-400">
            Have questions about our pricing?
            <a href="#" className="text-blue-400 hover:text-blue-300 underline">
              contact our team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
