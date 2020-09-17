const express = require('express')
require('dotenv').config('.env')
const app = express()
const port = 5000
const FileSystem = require('fs')

const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
console.log(process.env.STRIPE_SECRET_KEY)

app.use('/api', express.json())
app.use(express.static('public'))
app.use(cors())

let orders = []



app.post('/api/checkout-session', async (req, res) => {
    /* console.log(req.body) */
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.line_items,
            mode: req.body.mode,
            success_url: "http://localhost:3000/confirmation/?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: 'http://localhost:5000'
        })

        if (session.id) {
            const order = {
                items: req.body.line_items,
                sessionId: session.id
            }
            orders.push(order)
        } else {
            console.log("No Session")
        }

        res.json({ id: session.id })

    } catch (error) {
        res.status(500).json({ error })
    }


})

app.post('/api/verify-checkout-session', async (req, res) => {

    try {
        const session = await stripe.checkout.sessions.retrieve(req.body.sessionId)

        if (session) {
            res.json({ isVerified: session.payment_status == "paid" })
            /* orders.push(session) */

            console.log(orders)
            FileSystem.appendFileSync('file.json', JSON.stringify(orders), (error) => {
                if (error) {
                    throw error
                }
            })
        } else {
            throw new Error('No Session')
        }


    } catch (error) {
        console.log(error)
        res.json({ isVerified: false })
    }
})

app.get('/api/order/:id', (req, res) => {
    const order = orders.find((order) => order.sessionId == req.params.id)
    res.json(order)
})

app.listen(port, () => console.log(`listening on port ${port}`))