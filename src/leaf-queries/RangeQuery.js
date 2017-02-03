'use strict';
const Mixins = require('./Mixins');
const _field = Symbol('_field');

/** Class representing a range query.*/
class RangeQuery extends Mixins {
  /**
   * Create range query
   * @param {string} field
   */
  constructor (field) {
    super('range', field);

    this.range = {
      [field]: {}
    };
    this[_field] = field;
  }

  /**
   * Add Greater-than or equal to
   * @param {number} value
   */
  gte (value) {
    const field = this[_field];
    this.range[field].gte = value;
    return this;
  }

  /**
   * Add Greater-than
   * @param {number} value
   */
  gt (value) {
    const field = this[_field];
    this.range[field].gt = value;
    return this;
  }

  /**
   * Add Less-than or equal to
   * @param {number} value
   */
  lte (value) {
    const field = this[_field];
    this.range[field].lte = value;
    return this;
  }

  /**
   * Add Less-than
   * @param {number} value
   */
  lt (value) {
    const field = this[_field];
    this.range[field].lt = value;
    return this;
  }
}

const factoryRangeQuery = (...args) => {
  return new RangeQuery(...args);
};
// also expose statically the original class
factoryRangeQuery._originalClass = RangeQuery;

module.exports = factoryRangeQuery;
