'use strict';

/**
 * Create exists query
 * @param {string|number|Date} field
 */
const ExistsQuery = (field) => {
  return {
    exists: {
      field: field
    }
  };
};
module.exports = ExistsQuery;
