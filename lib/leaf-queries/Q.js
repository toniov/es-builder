'use strict';

/**
 * Shortcut for leaf queries
 * @param {string} queryType
 * @param {Array} params
 */

module.exports = function (queryType) {
  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  queryType = queryType.charAt(0).toUpperCase() + queryType.slice(1) + 'Query';
  return require('./' + queryType).apply(undefined, params);
};