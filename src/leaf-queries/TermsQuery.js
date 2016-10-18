'use strict';

/**
 * Create terms query
 * @param {string} field
 * @param {string|number|Date|string[]|number[]|Date[]} values
 */
const TermsQuery = (field, values) => {
  return {
    terms: {
      [field]: Array.isArray(values) ? values : [values]
    }
  };
};
module.exports = TermsQuery;
