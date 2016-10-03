'use strict';

const BoolQuery = require('./compoundQueries').BoolQuery;

/** Class representing a query builder.*/
class QueryBuilder {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  constructor () {
    this._boolQueryInstance = new BoolQuery();
    this._boolQueryInstanceForFilter = new BoolQuery();
  }

  /**
   * Add must query to the bool query
   *
   * @param {Object} query
   */
  query (query) {
    this._boolQueryInstance.must(query);
    return this;
  }

  /**
   * Add must not query to the bool query
   *
   * @param {Object} query
   */
  queryMustNot (query) {
    this._boolQueryInstance.mustNot(query);
    return this;
  }

  /**
   * Add should query to the bool query
   *
   * @param {Object} query
   */
  queryShould (query) {
    this._boolQueryInstance.should(query);
    return this;
  }

  /**
   * Add must filter to the bool query
   *
   * @param {Object} query
   */
  filter (query) {
    this._boolQueryInstanceForFilter.must(query);
    return this;
  }

  /**
   * Add must not filter to the bool query
   *
   * @param {Object} query
   */
  filterMustNot (query) {
    this._boolQueryInstanceForFilter.mustNot(query);
    return this;
  }

  /**
   * Add should filter to the bool query
   *
   * @param {Object} query
   */
  filterShould (query) {
    this._boolQueryInstanceForFilter.should(query);
    return this;
  }

  /**
   * Get the full query that will be passed to the search API
   * @return complete query cloned
   */
  build () {
    const completeQuery = this._boolQueryInstance.build();
    // add filter clause only in case filters were added
    const filterBool = this._boolQueryInstanceForFilter.build();
    if (Object.keys(filterBool.bool).length > 0) {
      completeQuery.bool.filter = filterBool;
    }
    return JSON.parse(JSON.stringify(completeQuery));
  }
}

// Add aliases
QueryBuilder.prototype.queryAnd = QueryBuilder.prototype.query;
QueryBuilder.prototype.queryNot = QueryBuilder.prototype.queryMustNot;
QueryBuilder.prototype.queryOr = QueryBuilder.prototype.queryShould;
QueryBuilder.prototype.filterAnd = QueryBuilder.prototype.filter;
QueryBuilder.prototype.filterNot = QueryBuilder.prototype.filterMustNot;
QueryBuilder.prototype.filterOr = QueryBuilder.prototype.filterShould;

module.exports = QueryBuilder;
