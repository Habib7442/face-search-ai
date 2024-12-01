import { PricingPlan } from "@/types/pricing";

export const PRICING_PLANS: PricingPlan[] = [
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
        "Standard API access"
      ],
      highlighted: false,
      buttonText: "Get Started",
      stripeProductId: "prod_RGPJbyTTTaMxkk",
      stripePriceId: "price_1QNsUeSABw0Heq1mTI8fY0jE",
      credits: 100
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
        "Bulk search capability"
      ],
      highlighted: true,
      buttonText: "Try Pro Plan",
      badge: "Most Popular",
      stripeProductId: "prod_RGPKsnf6sVY5VX",
      stripePriceId: "price_1QNsWGSABw0Heq1mCNToLIF2",
      credits: 300
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$99.99",
      period: "month",
      description: "For organizations requiring advanced solutions",
      features: [
        "Unlimited face searches",
        "Dedicated support team",
        "Custom integration",
        "Advanced analytics",
        "White-label option",
        "Enterprise API access",
        "Custom feature development"
      ],
      highlighted: false,
      buttonText: "Contact Sales",
      stripeProductId: "prod_RGPNa8jN3Cfbso",
      stripePriceId: "price_1QNsYkSABw0Heq1mPMQtOsBB",
      credits: 1000
    }
  ];