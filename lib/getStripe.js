import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    console.log("process env", process.env);
    stripePromise = loadStripe(process.env.NEXT_PUBLISHABLE_STRIPE_KEY);
  }
  return stripePromise;
};
export default getStripe;
