const asyncHandler = require("../middleware/async");

exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.cacheStateResponse = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
