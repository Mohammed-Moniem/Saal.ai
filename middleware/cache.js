const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("./async");
const redis = require("redis");
const { getCachedQueryString } = require("../utils/cachingParams");
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = async () => {
  const client = redis.createClient(REDIS_PORT);
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  return client;
};

module.exports.redisClient;

module.exports.getCachedData = asyncHandler(async (req, res, next) => {
  try {
    const client = await redisClient();
    let cachedQuery = getCachedQueryString(req.query);
    const cachedCustomers = await client.sendCommand([
      "HMGET",
      `data${cachedQuery}`,
      "data",
    ]);
    if (cachedCustomers[0] !== null) {
      await client.disconnect();
      res.status(200).json({ ...JSON.parse(cachedCustomers[0]), cashed: true });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports.cacheResponse = async (query, results, method) => {
  if (method !== "GET") return;
  const client = await redisClient();
  await client.sendCommand([
    "HMSET",
    `data${query}`,
    "data",
    JSON.stringify(results),
  ]);
  await client.disconnect();
};

module.exports.cacheState = asyncHandler(async (req, res, next) => {
  const client = await redisClient();
  await client.sendCommand(["HMSET", `state`, "state", req.body.state]);
  await client.disconnect();
  next();
});

module.exports.getCachedState = asyncHandler(async (req, res, next) => {
  try {
    const client = await redisClient();
    const cachedState = await client.sendCommand(["HMGET", `state`, "state"]);
    if (cachedState[0] !== null) {
      await client.disconnect();
      res.status(200).json({ ...JSON.parse(cachedState[0]), cashed: true });
    } else {
      res.end();
    }
  } catch (err) {
    console.log(err);
  }
});
