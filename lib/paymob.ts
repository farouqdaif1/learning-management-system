import { Course } from "@prisma/client";

export interface CourseWithUserData {
    course: Course;
    userData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
    }
}

export const clientSecret = async ({ userData, course }: CourseWithUserData) => {
    try {
        let myHeaders = new Headers();
        const paymobApiKey = process.env.PAY_MOP_SECRET_KEY || "";
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
                    "name": `${course.title}`,
                    "amount": 10,
                    "description": `${course.description}`,
                    "quantity": 1
                }
            ],
            "billing_data": {
                "first_name": `${userData.firstName}`,
                "last_name": `${userData.lastName}`,
                "phone_number": `${userData.phoneNumber}`,
                "email": `${userData.email}`,
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
        console.log("data", response);

        return response
    }
    catch (error) {
        console.log("[PAYMENT]", error);
        return Response.json(error, { status: 500 });
    }

}
