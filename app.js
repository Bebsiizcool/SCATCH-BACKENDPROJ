
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const cookieparser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

const connectDB = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouters");
const indexRouter = require("./routes/indexRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax",
        },
    })
);

app.use(flash());

// Connect before handling requests that need the database
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection failed:", err.message);
        res.status(503).send("Database temporarily unavailable");
    }
});

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Vercel uses this exported Express app
module.exports = app;

// Run a normal server only when running locally
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
