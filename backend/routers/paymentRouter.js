const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51NC92JF4LBHDFvi802fCk2bAwHEzH6UXWHbnEldVUdHMdtsBpZNahczI0BSRNg8LpwHE9mN8H5YKSDISZH2jWH2U00PG44WENK')

router.post('/intents',async(req,res)=>{
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount:req.body.amount,
    currency:'usd',
    automatic_payment_methods:{
        enabled:true
    }
})
res.json({paymentIntent:paymentIntent.client_secret})  
} catch (e) {
    res.json(e)
}
    
})





module.exports = router