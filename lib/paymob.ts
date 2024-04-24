


export const clientSecret = async () => {
    let myHeaders = new Headers();
    const paymobApiKey = process.env.PAYMOB_API_KEY || ""; // Ensure PAYMOB_API_KEY is defined
    myHeaders.append("Authorization", paymobApiKey);
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "amount": 10,
        "currency": "EGP",
        "payment_methods": [
            12,
            "card",
            "4545733"
        ],
        "items": [
            {
                "name": "Item name 1",
                "amount": 10,
                "description": "Watch",
                "quantity": 1
            }
        ],
        "billing_data": {
            "first_name": "Ammar",
            "last_name": "Sadek",
            "phone_number": "+96824480228",
            "email": "AmmarSadek@gmail.com",
        },

        "extras": {
            "ee": 22
        }
    });

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let data = await fetch("https://accept.paymob.com/v1/intention/", requestOptions)
    let response = await data.json()
    return response
}
