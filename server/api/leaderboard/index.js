import { Router as router } from "express";
import { connection } from "../../db";
import { cache } from "../../db/cache.js";
import tables from "../../db/tables.json";
import queries from "./leaderboard-queries.json";

const leaderboard = router();

leaderboard.get(
  "/week/:game/:stat/:week/:year/",
  cache(10),
  async (req, res, next) => {
    let { game, stat, week, year } = req.params;
    if (!game) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide game" });
    }

    if (!stat) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide stat" });
    }

    let statTable = tables[game];

    if (!statTable) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide a valid game" });
    }

    let query = queries.week.replace(/%TABLE%/gi, statTable);
    connection.query(query, [stat, week, year], (error, results, fields) => {
      if (error) {
        next(error);
      } else {
        return res.send({ error: false, message: results });
      }
    });
  }
);

leaderboard.get(
  "/month/:game/:stat/:month/:year/",
  cache(10),
  async (req, res, next) => {
    let { game, stat, month, year } = req.params;
    if (!game) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide game" });
    }

    if (!stat) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide stat" });
    }

    let statTable = tables[game];

    if (!statTable) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide a valid game" });
    }

    let query = queries.month.replace(/%TABLE%/gi, statTable);
    connection.query(query, [stat, month, year], (error, results, fields) => {
      if (error) {
        next(error);
      } else {
        return res.send({ error: false, message: results });
      }
    });
  }
);

leaderboard.get("/all/:game/:stat/", cache(10), async (req, res, next) => {
  let { game, stat } = req.params;
  if (!game) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide game" });
  }

  if (!stat) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide stat" });
  }

  let statTable = tables[game];

  if (!statTable) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide a valid game" });
  }

  let query = queries.all.replace(/%TABLE%/gi, statTable);
  connection.query(query, [stat], (error, results, fields) => {
    if (error) {
      next(error);
    } else {
      return res.send({ error: false, message: results });
    }
  });
});

export default leaderboard;
