'use strict';

const BoolQuery = require('./BoolQuery');
const _boolQuery = Symbol('boolQuery');
const _boolQueryForFilter = Symbol('boolQueryForFilter');
const _build = Symbol('build');

/** Class representing a query builder.*/
class QueryBuilder {
  /**
   * Create a QueryBuilder instance
   */
  constructor () {
    this[_boolQuery] = BoolQuery();
    this[_boolQueryForFilter] = BoolQuery();
  }

  /**
   * Compose full query
   * @private
   * @return completed query
   */
  [_build] () {
    let completeQuery = this[_boolQuery].built;
    let filterBool = this[_boolQueryForFilter].built;
    if (Object.keys(filterBool.bool).length > 0) {
      // add filter clause only in case filters were added
      completeQuery.bool.filter = Object.keys(filterBool.bool).length === 1 && filterBool.bool.must ? filterBool.bool.must : filterBool;
    } else if (Object.keys(completeQuery.bool).length === 1 && Object.keys(completeQuery.bool.must || []).length === 1) {
      // if the bool query only contains must and must only have one clause it is abbreviated
      completeQuery = completeQuery.bool.must;
    }
    return completeQuery;
  }

  /**
   * Getter for the completed query
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
   * Get the query strinfied (to be used in the REPL)
   */
  get stringified () {
    return JSON.stringify(this[_build]());
  }

  /**
   * Add must query to the bool query
   * @param {Object} query
   */
  query (query) {
    this[_boolQuery].must(query);
    return this;
  }

  /**
   * Add must not query to the bool query
   * @param {Object} query
   */
  queryMustNot (query) {
    this[_boolQuery].mustNot(query);
    return this;
  }

  /**
   * Add should query to the bool query
   * @param {Object} query
   */
  queryShould (query) {
    this[_boolQuery].should(query);
    return this;
  }

  /**
   * Add must filter to the bool query
   * @param {Object} query
   */
  filter (query) {
    this[_boolQueryForFilter].must(query);
    return this;
  }

  /**
   * Add must not filter to the bool query
   * @param {Object} query
   */
  filterMustNot (query) {
    this[_boolQueryForFilter].mustNot(query);
    return this;
  }

  /**
   * Add should filter to the bool query
   * @param {Object} query
   */
  filterShould (query) {
    this[_boolQueryForFilter].should(query);
    return this;
  }

  /**
   * Add must query to the bool query
   * @param {Object} query
   */
  queryAnd (query) {
    return this.query(query);
  }

  /**
   * Add must not query to the bool query alias
   * @param {Object} query
   */
  queryNot (query) {
    return this.mustNot(query);
  }

  /**
   * Add should query to the bool query alias
   * @param {Object} query
   */
  queryOr (query) {
    return this.queryShould(query);
  }

  /**
   * Add must filter to the bool query alias
   * @param {Object} query
   */
  filterAnd (query) {
    return this.filter(query);
  }

  /**
   * Add must not filter to the bool query alias
   * @param {Object} query
   */
  filterNot (query) {
    return this.filterMustNot(query);
  }

  /**
   * Add should filter to the bool query alias
   * @param {Object} query
   */
  filterOr (query) {
    return this.filterShould(query);
  }
};

const factoryQueryBuilder = () => {
  return new QueryBuilder;
};
// also expose statically the original class
factoryQueryBuilder._originalClass = QueryBuilder;

module.exports = factoryQueryBuilder;