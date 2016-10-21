'use strict';
const Mixins = require('./Mixins');

/**
 * Create prefix query
 * @param {string} field
 * @param {string|number|Date} value
 */
module.exports = (field, value) => {
  const baseQuery = {
    prefix: {
      [field]: {
        value: value
      }
    }
  };
  return Mixins(baseQuery, 'prefix', field);
};
