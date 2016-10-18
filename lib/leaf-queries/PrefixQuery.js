'use strict';

/**
 * Create prefix query
 * @param {string} field
 * @param {string} value
 */

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PrefixQuery = function PrefixQuery(field, value) {
  return {
    prefix: _defineProperty({}, field, value)
  };
};
module.exports = PrefixQuery;