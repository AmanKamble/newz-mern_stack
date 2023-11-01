import express from "express";
import { config } from 'dotenv';
import ErrorMiddleware from "./middlewares/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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
app.use(cors({
    origin: 'https://newz-frontend.vercel.app',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Importing and using route
import user from "./routes/userRoutes.js";
import news from "./routes/newsRoutes.js"
import writerRequest from "./routes/writerRequestRoutes.js"

app.use("/api/v1", user);
app.use("/api/v1", news);
app.use("/api/v1", writerRequest);

export default app;

app.get("/", (req, res) => {
    res.send(`<h1>Site is Working. Click <a href="https://newz-fronted.vercel.app/">here</a> to visit fronted</h1>`);
});

app.use(ErrorMiddleware);