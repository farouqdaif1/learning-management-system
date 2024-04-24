


export const clientSecret = async () => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Token egy_sk_test_ff08efb05dbf7a4e6f9ac78fa60ef3ef6180133fc3b389956f8676a555e4a997");
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
