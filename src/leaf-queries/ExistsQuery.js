'use strict';
const Mixins = require('./Mixins');

/** Class representing a exists query.*/
class ExistsQuery extends Mixins {
  /**
   * Create exists query
   * @param {string} field
   */
  constructor (field) {
    super('exists', field);

    this.exists = {
      field: field
    };
  }
}

const factoryExistsQuery = (...args) => {
  return new ExistsQuery(...args);
};
// also expose statically the original class
factoryExistsQuery._originalClass = ExistsQuery;

module.exports = factoryExistsQuery;
