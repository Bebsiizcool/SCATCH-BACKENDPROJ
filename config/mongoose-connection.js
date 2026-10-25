const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGODB_URI}/scatch`)
    .then(() => {
        console.log("MongoDB Atlas connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

module.exports = mongoose.connection;