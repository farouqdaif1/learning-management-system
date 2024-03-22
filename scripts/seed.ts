// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();
async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Web Development" },
                { name: "Mobile Development" },
                { name: "Data Science" },
                { name: "Machine Learning" },
                { name: "Artificial Intelligence" },
                { name: "Cyber Security" },
                { name: "Game Development" },
                { name: "DevOps" },
                { name: "Cloud Computing" },
                { name: "UI/UX Design" },
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