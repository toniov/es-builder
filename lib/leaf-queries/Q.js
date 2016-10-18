'use strict';

/**
 * Shortcut for leaf queries
 * @param {Array} params
 */

module.exports = function () {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  var queryType = params[0] + 'Query';
  params.splice(0, 1);
  return require('./' + queryType).apply(undefined, params);
};