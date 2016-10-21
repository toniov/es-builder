'use strict';
const Mixins = require('./Mixins');

/**
 * Create term query
 * @param {string} field
 * @param {string|number|Date} value
 */
module.exports = (field, value) => {
  const baseQuery = {
    term: {
      [field]: {
        value: value
      }
    }
  };
  return Mixins(baseQuery, 'term', field);
};
