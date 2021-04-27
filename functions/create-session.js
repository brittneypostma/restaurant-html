const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const formatLineItems = require("use-shopping-cart/utilities").formatLineItems;

exports.handler = async (event) => {
  const cartDetails = JSON.parse(event.body);

  const line_items = formatLineItems(cartDetails);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    mode: "payment",
    success_url: `${process.env.URL}/success.html`,
    cancel_url: process.env.URL,
    line_items,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      sessionId: session.id,
    }),
  };
};