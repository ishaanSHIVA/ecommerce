import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLISHABLE_STRIPE_KEY);
  }
  return stripePromise;
};
