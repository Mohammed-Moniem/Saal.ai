const express = require("express");
const Customer = require("../Models/Customer");
const {
  getCachedData,
  cacheState,
  getCachedState,
} = require("../middleware/cache");
const advancedResults = require("../middleware/advancedResults");

const {
  getCustomers,
  cacheStateResponse,
} = require("../controllers/customers");

const router = express.Router();

router.get("/get-cached-state", getCachedState);
router.post("/cache-state", cacheState, cacheStateResponse);
router.get("/", getCachedData, advancedResults(Customer), getCustomers);

module.exports = router;
