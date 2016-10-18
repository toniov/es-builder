'use strict';

/**
 * Shortcut for leaf queries
 * @param {string} queryType
 * @param {Array} params
 */
module.exports = (queryType, ...params) => {
  queryType = queryType.charAt(0).toUpperCase() + queryType.slice(1) + 'Query';
  return require(`./${queryType}`)(...params);
};
