const redis = require("redis");

exports.redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});

redisClient.on("connect", () => {
  elasticLogger.info("connected to redis client");
});

redisClient.on("error", () => {
  elasticLogger.info("error to redis client");
});
