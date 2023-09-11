import express from "express";
import { config } from 'dotenv';
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";


config({
    path: "./config/config.env"
});

const app = express();

// Using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))
app.use(cookieParser());

// Importing and using route
import user from "./routes/userRoutes.js";
import news from "./routes/newsRoutes.js"

app.use("/api/v1", user);
app.use("/api/v1", news);


export default app;

app.get("/", (req, res) => {
    res.send(`<h1>Site is Working. Click <a href="${process.env.FRONTEND_URL}">here</a> to visit fronted</h1>`);
});

app.use(ErrorMiddleware);