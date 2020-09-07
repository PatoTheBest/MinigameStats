import { Router as router } from "express";
import leaderboard from "./leaderboard";
import player from "./player";

const api = router();

api.get("/", (req, res) => {
  res.status(200).send("API working");
});

api.use("/leaderboard", leaderboard);
api.use("/player", player);

export default api;
