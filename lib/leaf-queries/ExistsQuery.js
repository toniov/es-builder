'use strict';

/**
 * Create exists query
 * @param {string|number|Date} field
 */

var ExistsQuery = function ExistsQuery(field) {
  return {
    exists: {
      field: field
    }
  };
};
module.exports = ExistsQuery;