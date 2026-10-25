const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "scatch",
            serverSelectionTimeoutMS: 15000,
        });

        console.log("MongoDB Atlas connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        throw err;
    }
};

module.exports = connectDB;
