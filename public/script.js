/* let stripe = Stripe('pk_test_8asbHZHZoVp2kblhfCEUUGIr006fit3Srr') */

async function clickMe(body) {
    location = "http://localhost:3000"
    return location
    /* const response = await fetch('/api/checkout-session', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body)
    })

    const session = await response.json()
    const result = await stripe.redirectToCheckout({ sessionId: session.id })
    console.log(result) */
}

async function order() {
    const allFromSession = await makeOrderRequest('/api', 'GET')
    console.log(allFromSession)

    let list = document.createElement('div')

    for (let i = 0; i < allFromSession.length; i++) {
        let session = allFromSession[i]

        let orderNr = document.createElement('p')
        orderNr.innerText = session.payment_intent

        let am =  session.amount_subtotal / 100
        let amount = document.createElement('p')
        amount.innerText = am

        document.body.append(list)
        list.append(orderNr)
        list.append(amount)
    }
    

}

async function makeOrderRequest(url, reqMethod, body) {
    const response = await fetch(url, {
        headers: {"Content-Type": "application/json"},
        method: reqMethod,
        body: JSON.stringify(body)
    })
    console.log(response)
    const data = await response.json()
    console.log(data)
    return data
}