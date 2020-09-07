import api from "./api";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("API working");
});

app.use("/api", api);

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
});

export default app;
