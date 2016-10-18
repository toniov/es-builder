'use strict';

const BoolQuery = require('./BoolQuery');
const boolQueryInstance = Symbol('boolQueryInstance');
const boolQueryInstanceForFilter = Symbol('boolQueryInstanceForFilter');

/** Class representing a query builder.*/
class QueryBuilder {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  constructor () {
    this[boolQueryInstance] = new BoolQuery();
    this[boolQueryInstanceForFilter] = new BoolQuery();
  }

  /**
   * Add must query to the bool query
   *
   * @param {Object} query
   */
  query (query) {
    this[boolQueryInstance].must(query);
    return this;
  }

  /**
   * Add must not query to the bool query
   *
   * @param {Object} query
   */
  queryMustNot (query) {
    this[boolQueryInstance].mustNot(query);
    return this;
  }

  /**
   * Add should query to the bool query
   *
   * @param {Object} query
   */
  queryShould (query) {
    this[boolQueryInstance].should(query);
    return this;
  }

  /**
   * Add must filter to the bool query
   *
   * @param {Object} query
   */
  filter (query) {
    this[boolQueryInstanceForFilter].must(query);
    return this;
  }

  /**
   * Add must not filter to the bool query
   *
   * @param {Object} query
   */
  filterMustNot (query) {
    this[boolQueryInstanceForFilter].mustNot(query);
    return this;
  }

  /**
   * Add should filter to the bool query
   *
   * @param {Object} query
   */
  filterShould (query) {
    this[boolQueryInstanceForFilter].should(query);
    return this;
  }

  /**
   * Getter for the full query that will be passed to the search API
   * @return complete query cloned
   */
  get built () {
    const completeQuery = this[boolQueryInstance].built;
    // add filter clause only in case filters were added
    const filterBool = this[boolQueryInstanceForFilter].built;
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
