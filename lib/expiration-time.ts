export const calcDate = (expirationTime: number) => {
    const expirationDate = new Date();

    switch (expirationTime) {
        case 1:
            expirationDate.setHours(expirationDate.getHours() + 1);
            break;
        case 2:
            expirationDate.setHours(expirationDate.getHours() + 2);
            break;
        case 3:
            expirationDate.setHours(expirationDate.getHours() + 3);
            break;
        case 4:
            expirationDate.setHours(expirationDate.getHours() + 4);
            break;
        case 5:
            expirationDate.setHours(expirationDate.getHours() + 5);
            break;
        case 6:
            expirationDate.setHours(expirationDate.getHours() + 6);
            break;
        case 12:
            expirationDate.setHours(expirationDate.getHours() + 12);
            break;
        case 24:
            expirationDate.setDate(expirationDate.getDate() + 1);
            break;
        case 48:
            expirationDate.setDate(expirationDate.getDate() + 1);
            break;
        case 168:
            expirationDate.setDate(expirationDate.getDate() + 7);
            break;
        case 720:
            expirationDate.setMonth(expirationDate.getMonth() + 1);
            break;
        default:
            throw new Error("Invalid expiration time");
    }
    return expirationDate;

}
