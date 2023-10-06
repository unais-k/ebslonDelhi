import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();

import clientRoute from "../server/Router/router.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"],
    })
);
app.use(express.static("public"));
app.use(cookieParser());

app.use("/", clientRoute);

const PORT = 4001;
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
