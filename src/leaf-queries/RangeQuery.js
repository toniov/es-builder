'use strict';

/**
 * Create terms query
 * @param {string} field
 * @param {number, string, Date} [from]
 * @param {number, string, Date} [to]
 * @param {boolean} [includeLowser]
 * @param {boolean} [includeUpper]
 */
const RangeQuery = (field, from, to, includeLower, includeUpper) => {
  const baseQuery = {
    range: {
      [field]: {}
    }
  };

  if (includeLower) {
    baseQuery.range[field].gte = from;
  } else {
    baseQuery.range[field].gt = from;
  }

  if (includeUpper) {
    baseQuery.range[field].lte = to;
  } else {
    baseQuery.range[field].lt = to;
  }

  return baseQuery;
};
module.exports = RangeQuery;
