const redis = require("redis");

exports.redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
});



