// 'use strict';

// /**
//  * Create exists query
//  * @param {string|number|Date} field
//  */
// const ExistsQuery = (field) => {
//   return {
//     exists: {
//       field: field
//     }
//   };
// };
// module.exports = ExistsQuery;

'use strict';
const Mixins = require('./Mixins');

/**
 * Create exists query
 * @param {string} field
 */
module.exports = (field) => {
  const baseQuery = {
    exists: {
      field: field
    }
  };
  return Mixins(baseQuery, 'exists', field);
};
