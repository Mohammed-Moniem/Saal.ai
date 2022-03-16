const express = require("express");
const Customer = require("../Models/Customer");
const { getCachedData } = require("../middleware/cache");
const advancedResults = require("../middleware/advancedResults");

const { getCustomers } = require("../controllers/customers");

const router = express.Router();

router.get("/", getCachedData, advancedResults(Customer), getCustomers);

module.exports = router;
