import express from "express";
import router from "./router";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));
app.use("/api", router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
