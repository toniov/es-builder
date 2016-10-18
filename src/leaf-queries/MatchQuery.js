'use strict';

/**
 * Create match query
 * @param {string} field
 * @param {string} text
 * @param {Object} [extraOps]
 */
const MatchQuery = (field, text, extraOps) => {
  const baseQuery = {
    match: {
      [field]: {
        query: text
      }
    }
  };
  Object.assign(baseQuery.match[field], extraOps);
  return baseQuery;
};
module.exports = MatchQuery;
