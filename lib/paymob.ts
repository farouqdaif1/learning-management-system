import axios from "axios";

const url = process.env.BASE_PAY_MOP_URL;
const payMopApiKey = process.env.PAY_MOB_API_KEY;

var raw = JSON.stringify({
    "api_key": payMopApiKey
});
const headers = {
    'Content-Type': 'application/json',
};
const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    redirect: 'follow'
};

export const authRequest = async () => {
    try {
        const url = process.env.BASE_PAY_MOP_URL;
        const response = await fetch(url!, { ...requestOptions, redirect: 'follow' });
        const result = await response.json();
        return result;

    } catch {
        console.log("Error");
    }
}
