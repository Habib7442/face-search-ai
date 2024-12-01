// lib/stripe.ts
import Stripe from 'stripe';

if (!process.env.STPIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STPIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const STRIPE_CONFIGS = {
  UNLIMITED_PRICE_ID: process.env.STRIPE_PRICE_ID,
  SUCCESS_URL: `${process.env.NEXT_PUBLIC_APP_URL}/upload`,
  CANCEL_URL: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
} as const;