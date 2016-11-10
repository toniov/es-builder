'use strict';
const Mixins = require('./Mixins');

/** Class representing a prefix query.*/
class PrefixQuery extends Mixins {
  /**
   * Create prefix query
   * @param {string} field
   * @param {string|number|Date} value
   */
  constructor(field, value) {
    super('prefix', field);

    this.prefix = {
      [field]: {
        value: value
      }
    };
  }
};

const factoryPrefixQuery = (...args) => {
  return new PrefixQuery(...args);
};
// also expose statically the original class
factoryPrefixQuery._originalClass = PrefixQuery;

module.exports = factoryPrefixQuery;
