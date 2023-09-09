import express from "express";
import { config } from 'dotenv';

config({
    path: "./config/config.env"
});

// Importing and using route


const app = express();

export default app;
app.get("/", (req, res) => {
    res.send(`<h1>Site is Working. Click <a href="${process.env.FRONTEND_URL}">here</a> to visit fronted</h1>`);
})