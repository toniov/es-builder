'use strict';
const Mixins = require('./Mixins');

/**
 * Create terms query
 * @param {string} field
 * @param {string|number|Date|string[]|number[]|Date[]} values
 */
module.exports = (field, values) => {
  const baseQuery = {
    terms: {
      [field]: {
        value: Array.isArray(values) ? values : [values]
      }
    }
  };
  return Mixins(baseQuery, 'terms', field);
};
