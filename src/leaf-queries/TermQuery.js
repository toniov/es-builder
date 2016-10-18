'use strict';

/**
 * Create term query
 * @param {string} field
 * @param {string|number|Date} value
 */
const TermQuery = (field, value) => {
  return {
    term: {
      [field]: value
    }
  };
};
module.exports = TermQuery;
