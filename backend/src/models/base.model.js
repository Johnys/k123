const search = function search(params = {}, sort) {
  if (params.id) {
    return this.findOne({ uuid: params.id });
  }
  let limit = params.limit || 10;
  let offset = params.offset || 1;
  limit = parseInt(limit, 10);
  offset = parseInt(offset, 10);
  delete params.limit;
  delete params.offset;
  return this.paginate(params, { limit, page: offset, sort });
};

/* eslint-disable */
export { search };
