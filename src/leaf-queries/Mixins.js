'use strict';

const _queryType = Symbol('_queryType');
const _field = Symbol('_field');

/** Class representing mixins.*/
module.exports = class Mixins {
  /**
   * Create mixin
   * @param {string} queryType - query type (e.g. 'term')
   * @param {string} field - field affected (e.g. 'name')
   */
  constructor (...args) {
    [this[_queryType], this[_field]] = args;
  }

  /**
   * Add boost to query
   * @param {number} score
   */
  boost (score) {
    const queryType = this[_queryType];
    const field = this[_field];
    if (queryType === 'exists' || queryType === 'terms') {
      this[queryType].boost = score;
      return this;
    }
    this[queryType][field].boost = score;
    return this;
  }

  /**
   * Getter for the completed query
   *  the result will be serialized after using JSON.stringify
   * @return complete query cloned
   */
  get built () {
    return JSON.parse(JSON.stringify(this));
  }
};
