'use strict';

/**
 * Create terms query
 * @param {string} field
 * @param {number, string, Date} [from]
 * @param {number, string, Date} [to]
 * @param {boolean} [includeLowser]
 * @param {boolean} [includeUpper]
 */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RangeQuery = function RangeQuery(field, from, to, includeLower, includeUpper) {
  var baseQuery = {
    range: _defineProperty({}, field, {})
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