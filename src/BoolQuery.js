'use strict';

const add = Symbol('add');
const boolQuery = Symbol('boolQuery');

/** Class representing an Elasticsearch bool query.*/
class BoolQuery {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  constructor () {
    this[boolQuery] = {};
  }

  /**
   * Add to the appropiate bool
   *
   * @private
   * @param {string} type
   * @param {Object} query
   */
  [add] (type, query) {
    if (!this[boolQuery][type]) {
      // a) in case not exist it is created
      this[boolQuery][type] = query;
    } else if (Array.isArray(this[boolQuery][type])) {
      // b) in case of array it is pushed
      this[boolQuery][type].push(query);
    } else {
      // c) in case it is an object it is converted into an array and pushed
      this[boolQuery][type] = [this[boolQuery][type], query];
    }
    return this;
  }

  /**
   * Add must
   *
   * @param {Object} query
   */
  must (query) {
    return this[add]('must', query);
  }

  /**
   * Add must_not
   *
   * @param {Object} query
   */
  mustNot (query) {
    return this[add]('must_not', query);
  }

  /**
   * Add should
   *
   * @param {Object} query
   */
  should (query) {
    return this[add]('should', query);
  }

  /**
   * Add query
   *
   * @param {Object} query
   */
  filter (query) {
    return this[add]('filter', query);
  }

  /**
   * Getter for built bool query
   * @return complete bool query cloned
   */
  get built () {
    const completeBoolQuery = {
      bool: this[boolQuery]
    };
    return JSON.parse(JSON.stringify(completeBoolQuery));
  }
}

// Add aliases
BoolQuery.prototype.and = BoolQuery.prototype.must;
BoolQuery.prototype.not = BoolQuery.prototype.mustNot;
BoolQuery.prototype.or = BoolQuery.prototype.should;

module.exports = BoolQuery;
