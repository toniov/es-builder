'use strict';

const add = Symbol('add');
const _build = Symbol('_build');
const _boolQuery = Symbol('_boolQuery');

/** Class representing a query builder.*/
class BoolQuery {
  /**
   * Create a bool query
   */
  constructor () {
    this[_boolQuery] = {};
  }

  /**
   * Compose bool query
   * @private
   * @return completed query
   */
  [_build] () {
    return {
      bool: this[_boolQuery]
    };
  }

  /**
   * Getter for the completed bool query
   * @return complete query cloned
   */
  get built () {
    return JSON.parse(JSON.stringify(this[_build]()));
  }

  /**
   * Customize JSON stringification behavior
   * @see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
   */
  toJSON () {
    return this[_build]();
  }

  /**
   * Add to the appropiate bool
   * @private
   * @param {string} type
   * @param {Object} query
   */
  [add] (type, query) {
    if (!this[_boolQuery][type]) {
      // a) in case not exist it is created
      this[_boolQuery][type] = query;
    } else if (Array.isArray(this[_boolQuery][type])) {
      // b) in case of array it is pushed
      this[_boolQuery][type].push(query);
    } else {
      // c) in case it is an object it is converted into an array and pushed
      this[_boolQuery][type] = [this[_boolQuery][type], query];
    }
    return this;
  }

  /**
   * Add must
   * @param {Object} query
   */
  must (query) {
    return this[add]('must', query);
  }

  /**
   * Add must_not
   * @param {Object} query
   */
  mustNot (query) {
    return this[add]('must_not', query);
  }

  /**
   * Add should
   * @param {Object} query
   */
  should (query) {
    return this[add]('should', query);
  }

  /**
   * Add query
   * @param {Object} query
   */
  filter (query) {
    return this[add]('filter', query);
  }

  /**
   * must alias
   * @param {Object} query
   */
  and (query) {
    return this.must(query);
  }

  /**
   * must_not alias
   * @param {Object} query
   */
  not (query) {
    return this.mustNot(query);
  }

  /**
   * should alias
   * @param {Object} query
   */
  or (query) {
    return this.should(query);
  }
}

const factoryBoolQuery = () => {
  return new BoolQuery();
};
// also expose statically the original class
factoryBoolQuery._originalClass = BoolQuery;

module.exports = factoryBoolQuery;
