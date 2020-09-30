import { Router as router } from "express";
import { getConnection } from "../../db";
import { cache } from "../../db/cache.js";
import queries from "./player-queries.json";

const player = router();

player.get("/:name", cache(10), async (req, res, next) => {
  let { name } = req.params;
  getConnection((err, connection) => {
    connection.query(queries.select_name, [name], (error, results, fields) => {
      if (error) {
        next(error);
      } else {
        if (Object.keys(results).length) {
          return res.send(results[0]);
        } else {
          return res.send({});
        }
      }
    });
  });
});

export default player;
