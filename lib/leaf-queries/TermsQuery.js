'use strict';

/**
 * Create terms query
 * @param {string} field
 * @param {string|number|Date|string[]|number[]|Date[]} values
 */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TermsQuery = function TermsQuery(field, values) {
  return {
    terms: _defineProperty({}, field, Array.isArray(values) ? values : [values])
  };
};
module.exports = TermsQuery;