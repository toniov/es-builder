'use strict';
const Mixins = require('./Mixins');

/** Class representing a terms query.*/
class TermsQuery extends Mixins {
  /**
   * Create terms query
   * @param {string} field
   * @param {string|number|Date} value
   */
  constructor (field, value) {
    super('terms', field);

    this.terms = {
      [field]: {
        value: value
      }
    };
  }
}

const factoryTermsQuery = (...args) => {
  return new TermsQuery(...args);
};
// also expose statically the original class
factoryTermsQuery._originalClass = TermsQuery;

module.exports = factoryTermsQuery;
