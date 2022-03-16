module.exports.sort = (unSortedArray, query, defaultSortBy) => {
  const { sortBy, direction } = query;
  let sortDirection = parseInt(direction);
  let sortKey = `${sortBy ? sortBy : defaultSortBy}`;
  const sortedArray = unSortedArray.sort((currentElement, nextElement) =>
    currentElement[sortKey] > nextElement[sortKey]
      ? sortDirection
      : -sortDirection
  );
  return sortedArray;
};

module.exports.paginate = async (page, limit, query, model) => {
  const requestedPage =
    parseInt(page, 10) || parseInt(process.env.DEFAULT_PAGE);
  const requestedLimit =
    parseInt(limit, 10) || parseInt(process.env.DEFAULT_LIMIT);
  const startIndex = (requestedPage - 1) * requestedLimit;
  const endIndex = requestedPage * requestedLimit;
  const total = await model.countDocuments();

  query = query.skip(startIndex).limit(requestedLimit);

  // Pagination
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: requestedPage + 1,
      requestedLimit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: requestedPage - 1,
      requestedLimit,
    };
  }

  return { pagination, query };
};
