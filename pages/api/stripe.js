import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
  console.log("Stripe!!!");
  if (req.method === "POST") {
    try {
      console.log(req.body);
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LACdiSBQKM7wNZOUVTbQ9By" },
          { shipping_rate: "shr_1LATnBSBQKM7wNZOfKAIw9Fc" },
        ],
        line_items: req.body.cartItems.map((item) => {
          const img = item.image[0].asset._ref;

          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/eahhed5d/production/"
            )
            .replace("-webp", ".webp");
          console.log("Image ", newImage);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100, // cents
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
