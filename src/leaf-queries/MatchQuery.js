'use strict';
const Mixins = require('./Mixins');

/** Class representing a match query.*/
class MatchQuery extends Mixins {
  /**
   * Create match query
   * @param {string} field
   * @param {string} text
   * @param {Object} [extraOps]
   */
  constructor (field, text, extraOps) {
    super('match', field);

    this.match = {
      [field]: {
        query: text
      }
    };
    Object.assign(this.match[field], extraOps);
  }
}

const factoryMatchQuery = (...args) => {
  return new MatchQuery(...args);
};
// also expose statically the original class
factoryMatchQuery._originalClass = MatchQuery;

module.exports = factoryMatchQuery;
