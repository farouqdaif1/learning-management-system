// lib/cronJob.js

import cron from 'node-cron';
import { db } from './db';

// Schedule the job to run every hour
console.log("Deleting expired purchases...");

cron.schedule('0 * * * *', async () => {
    console.log("Deleting expired purchases...");
    const now = new Date();
    try {
        await db.purchaseChapters.deleteMany({
            where: {
                seeTime: {
                    lte: now
                }
            }
        });
        console.log("Expired purchases deleted successfully.");
    } catch (error) {
        console.error("Error deleting expired purchases: ", error);
    }
});
