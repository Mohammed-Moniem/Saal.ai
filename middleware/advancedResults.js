const { sort, paginate } = require("../utils/paginationAndSorting");
const { getCachedQueryString } = require("../utils/cachingParams");
const { cacheResponse } = require("./cache");

const advancedResults = (model, populate) => async (req, res, next) => {
  let query;
  const { select, page, limit } = req.query;
  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  query = model.find(JSON.parse(queryStr));

  if (select) {
    const fields = select.split(",").join(" ");
    query = query.select(fields);
  }

  const paginatedResult = await paginate(page, limit, query, model);

  let results = await paginatedResult.query;

  results = sort(results, reqQuery, "id");

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination: paginatedResult.pagination,
    data: results,
  };

  let cachedQuery = getCachedQueryString(req.query);
  await cacheResponse(cachedQuery, res.advancedResults, req.method);

  next();
};

module.exports = advancedResults;
