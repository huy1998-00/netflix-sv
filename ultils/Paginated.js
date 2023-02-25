module.exports = function (model, p = 1, l = 20) {
  const page = parseInt(p);
  const limit = parseInt(l);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // const content = JSON.parse(model);

  let result = {};

  if (endIndex < model.length) {
    result.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    result.preV = {
      page: page - 1,
      limit: limit,
    };
  }
  result.page = page;
  result.total_pages = Math.floor(model.length / limit);
  result.results = model.slice(startIndex, endIndex);

  return result;
};
