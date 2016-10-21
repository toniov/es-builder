'use strict';
const Mixins = require('./Mixins');

/**
 * Create terms query
 * @param {string} field
 * @param {number, string, Date} [from]
 * @param {number, string, Date} [to]
 * @param {boolean} [includeLowser]
 * @param {boolean} [includeUpper]
 */
module.exports = (field) => {
  const baseQuery = {
    range: {
      [field]: {}
    }
  };

  return Object.assign({
    /**
     * Add Greater-than or equal to
     * @param {number} value
     */
    gte (value) {
      baseQuery.range[field].gte = value;
      return this;
    },
    /**
     * Add Greater-than
     * @param {number} value
     */
    gt (value) {
      baseQuery.range[field].gt = value;
      return this;
    },
    /**
     * Add Less-than or equal to
     * @param {number} value
     */
    lte (value) {
      baseQuery.range[field].lte = value;
      return this;
    },
    /**
     * Add Less-than
     * @param {number} value
     */
    lt (value) {
      baseQuery.range[field].lt = value;
      return this;
    }
  }, Mixins(baseQuery, 'range', field));
};
