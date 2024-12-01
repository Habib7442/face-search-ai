export interface PricingPlan {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    highlighted: boolean;
    buttonText: string;
    badge?: string;
    stripeProductId: string;
    stripePriceId: string;
    credits: number;
  }