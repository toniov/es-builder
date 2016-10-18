'use strict';

/**
 * Create term query
 * @param {string} field
 * @param {string|number|Date} value
 */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TermQuery = function TermQuery(field, value) {
  return {
    term: _defineProperty({}, field, value)
  };
};
module.exports = TermQuery;