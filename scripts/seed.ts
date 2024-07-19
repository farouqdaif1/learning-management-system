// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "الفرقة الاولي" },
                { name: "الفرقة الثانية" },
                { name: "الفرقة الثالثة" },
                { name: "الفرقة الرابعه" },
                { name: "ندوات" },
                { name: "دورات" },
                { name: "دبلومات" },
                { name: "اخري" },
            ]
        });
        await database.season.createMany({
            data: [
                { name: "الترم الاول" },
                { name: "الترم الثاني" },
                { name: "عامة" },
            ]
        });
        console.log("seeded data base categories");
    } catch (error) {
        console.log("error seeding data base categories", error);
    } finally {
        await database.$disconnect();
    }
}
main()