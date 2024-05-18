import { Course } from '@prisma/client';
import axios from 'axios';

export const getToken = async () => {
    const tokenData = await axios.post(`${process.env.BASE_PAY_MOP_URL}/auth/tokens`, {
        "api_key": `${process.env.PAY_MOB_API_KEY}`
    })
    return tokenData.data;
}
export const OrderID = async (token: string, course: Course) => {
    const order = await axios.post(`${process.env.BASE_PAY_MOP_URL}/ecommerce/orders`, {
        "auth_token": token,
        "delivery_needed": "false",
        "amount_cents": `${course.price ? course.price * 100 : 0}`,
        "currency": "EGP",
        "items": [
            {
                "name": `${course.title}`,
                "amount_cents": `${course.price}`,
                "description": `${course.description}`,
                "quantity": "1"
            },
        ],
    }

    )
    return order.data;
}
export const PaymentKey = async (token: string, orderId: string, course: Course, values: { firstName: string, lastName: string, email: string, phoneNumber: number }, userId: string) => {
    const paymentKey = await axios.post(`${process.env.BASE_PAY_MOP_URL}/acceptance/payment_keys`, {
        "auth_token": token,
        "amount_cents": `${course.price ? course.price * 100 : 0}`,
        "expiration": 3600,
        "order_id": `${orderId}`,
        "billing_data": {
            "apartment": "NA",
            "email": `${values.email}`,
            "floor": "NA",
            "first_name": `${values.firstName}`,
            "street": "NA",
            "building": "NA",
            "phone_number": `${values.phoneNumber}`,
            "extra_description": `{"userId": "${userId}","courseId": "${course.id}"}`,
            "postal_code": "NA",
            "city": "NA",
            "country": "NA",
            "last_name": `${values.lastName}`,
            "state": "NA"
        },
        "currency": "EGP",
        "integration_id": 4545733,
    })
    return paymentKey.data;
}
