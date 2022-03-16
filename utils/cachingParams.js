module.exports.getCachedQueryString = (query) => {
  const { page, limit, sortBy, direction } = query;
  let sortedBy = sortBy !== undefined ? sortBy : "id";
  let cacheDirection = direction !== undefined ? direction : "-1";
  let cachePage = page !== undefined ? page : process.env.DEFAULT_PAGE;
  let cacheLimit = limit !== undefined ? limit : process.env.DEFAULT_LIMIT;
  return sortedBy + cacheDirection + cachePage + cacheLimit;
};
