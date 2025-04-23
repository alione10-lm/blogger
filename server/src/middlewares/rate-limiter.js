// const rateLimit = require("express-rate-limit");

import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 150,
  message: "you have reashed the max request number ",

  // handler: (req, res, next, options) => {
  //   logger.warn(
  //     `Rate limit atteint for l'IP : ${req.ip} - URL : ${req.originalUrl}`
  //   );
  //   res.status(options.statusCode).json({ message: options.message });
  // },
});

export { limiter };
