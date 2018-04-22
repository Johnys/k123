const search = function search(params = {}, limit = 10, offset = 0) {
  if (params.id) {
    return this.findOne({ uuid: params.id });
  }
  return this.find(params)
    .limit(limit)
    .skip(offset);
};

/* eslint-disable */
export { search };
