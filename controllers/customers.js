const asyncHandler = require("../middleware/async");

// @route   GET api/ping
// @desc    Get posts with tags and sort query parameters
// @access  Public
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
