const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async (event, context, callback) => {
  try {
    const prices = await stripe.prices.list({ expand: ['data.product'] })
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(prices),
    })
  } catch {
    console.log('Something went wrong.')
  }
}
