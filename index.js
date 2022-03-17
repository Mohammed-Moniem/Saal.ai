const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const rateLimit = require("express-rate-limit");
const errorHandler = require("./middleware/error");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const customers = require("./routes/customers");

const app = express();

app.use(express.json({ limit: "50mb" }));

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config/config.env" });
}

app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10mins
  max: 10000,
});

app.use(cors());
app.use(limiter);

//Mount routers
app.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true });
});
app.use("/api/customers", customers);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development mode"
    } mode on port ${PORT}`.yellow.bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  server.close(() => process.exit(1));
});
