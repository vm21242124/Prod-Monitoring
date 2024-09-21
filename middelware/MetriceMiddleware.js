const { httpRequestDurationMicroseconds } = require("../config/PromClient");

const MetriceMiddleware = async (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    end({ method: req.method, route: req.url, code: res.statusCode });
  });
  next();
};

module.exports={MetriceMiddleware}