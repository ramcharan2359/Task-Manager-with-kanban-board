require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("MongoDB connection successful!");
    } catch (error) {
        console.error("MongoDB test failed:", error.message);
    } finally {
        await mongoose.disconnect().catch(() => {});
    }
}

testConnection();
