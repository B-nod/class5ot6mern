const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

//process a payment
// Process a payment (for Indian regulations: include description)
exports.processPayment = async (req, res) => {
    try {
        const { amount, orderId, userName } = req.body;

        // Create a PaymentIntent with required metadata and description
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in the smallest currency unit
            currency: "usd", // Adjust based on your requirements
            description: `Export transaction for Order ${orderId} by ${userName}`, // Include description for Indian regulations
            metadata: {
                order_id: orderId,
                user_name: userName,
                export_description: `Export transaction for Order ${orderId} by ${userName}`
            }
        });
        console.log(orderId)

        res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Payment Intent Error:", error.message);
        res.status(500).json({ message: "Payment processing failed", error: error.message });
    }
};
//send stripe api key to frontend
exports.sendStripeApi=async(req,res)=>{
    res.json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
}