'use strict';

/**
 * Create prefix query
 * @param {string} field
 * @param {string} value
 */
const PrefixQuery = (field, value) => {
  return {
    prefix: {
      [field]: value
    }
  };
};
module.exports = PrefixQuery;
