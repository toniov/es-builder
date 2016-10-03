'use strict';

/** Class representing an Elasticsearch bool query.*/
class BoolQuery {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  constructor () {
    this._boolQuery = {};
  }

  /**
   * Add to the appropiate bool
   *
   * @private
   * @param {string} type
   * @param {Object} query
   */
  _add (type, query) {
    if (!this._boolQuery[type]) {
      // a) in case not exist it is created
      this._boolQuery[type] = query;
    } else if (Array.isArray(this._boolQuery[type])) {
      // b) in case of array it is pushed
      this._boolQuery[type].push(query);
    } else {
      // c) in case it is an object it is converted into an array and pushed
      this._boolQuery[type] = [this._boolQuery[type], query];
    }
  }

  /**
   * Add must
   *
   * @param {Object} query
   */
  must (query) {
    this._add('must', query);
    return this;
  }

  /**
   * Add must_not
   *
   * @param {Object} query
   */
  mustNot (query) {
    this._add('must_not', query);
    return this;
  }

  /**
   * Add should
   *
   * @param {Object} query
   */
  should (query) {
    this._add('should', query);
    return this;
  }

  /**
   * Add query
   *
   * @param {Object} query
   */
  filter (query) {
    this._add('filter', query);
    return this;
  }

  /**
   * Get bool query
   * @return complete bool query cloned
   */
  build () {
    const completeBoolQuery = {
      bool: this._boolQuery
    };
    return JSON.parse(JSON.stringify(completeBoolQuery));
  }
}

// Add aliases
BoolQuery.prototype.and = BoolQuery.prototype.must;
BoolQuery.prototype.not = BoolQuery.prototype.mustNot;
BoolQuery.prototype.or = BoolQuery.prototype.should;

exports.BoolQuery = BoolQuery;
