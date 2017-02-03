'use strict';
const Mixins = require('./Mixins');

/** Class representing a term query.*/
class TermQuery extends Mixins {
  /**
   * Create term query
   * @param {string} field
   * @param {string|number|Date} value
   */
  constructor (field, value) {
    super('term', field);

    this.term = {
      [field]: {
        value: value
      }
    };
  }
}

const factoryTermQuery = (...args) => {
  return new TermQuery(...args);
};
// also expose statically the original class
factoryTermQuery._originalClass = TermQuery;

module.exports = factoryTermQuery;
