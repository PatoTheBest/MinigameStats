var mcache = require("memory-cache");

var cache = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cachedBody = mcache.get(key);
    if (cachedBody) {
      res.send(JSON.parse(cachedBody));
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        if (res.statusCode === 200) {
          mcache.put(key, body, duration * 1000 * 60);
        }
        res.sendResponse(body);
      };
      next();
    }
  };
};

export { cache };
