'use strict';

const BoolQuery = require('./BoolQuery');
const _build = Symbol('_build');

/**
 * @see https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
 */
module.exports = () => {
  const boolQuery = BoolQuery();
  const boolQueryForFilter = BoolQuery();

  return {
    /**
     * Compose full query
     * @private
     * @return completed query
     */
    [_build] () {
      const completeQuery = boolQuery.built;
      // add filter clause only in case filters were added
      const filterBool = boolQueryForFilter.built;
      if (Object.keys(filterBool.bool).length > 0) {
        completeQuery.bool.filter = filterBool;
      }
      return completeQuery;
    },

    /**
     * Getter for the completed query
     * @return complete query cloned
     */
    get built () {
      return JSON.parse(JSON.stringify(this[_build]()));
    },

    /**
     * Customize JSON stringification behavior
     * @see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    toJSON () {
      return this[_build]();
    },

    /**
     * Add must query to the bool query
     * @param {Object} query
     */
    query (query) {
      boolQuery.must(query);
      return this;
    },

    /**
     * Add must not query to the bool query
     * @param {Object} query
     */
    queryMustNot (query) {
      boolQuery.mustNot(query);
      return this;
    },

    /**
     * Add should query to the bool query
     * @param {Object} query
     */
    queryShould (query) {
      boolQuery.should(query);
      return this;
    },

    /**
     * Add must filter to the bool query
     * @param {Object} query
     */
    filter (query) {
      boolQueryForFilter.must(query);
      return this;
    },

    /**
     * Add must not filter to the bool query
     * @param {Object} query
     */
    filterMustNot (query) {
      boolQueryForFilter.mustNot(query);
      return this;
    },

    /**
     * Add should filter to the bool query
     * @param {Object} query
     */
    filterShould (query) {
      boolQueryForFilter.should(query);
      return this;
    },

    /**
     * Add must query to the bool query
     * @param {Object} query
     */
    queryAnd (query) {
      return this.query(query);
    },

    /**
     * Add must not query to the bool query alias
     * @param {Object} query
     */
    queryNot (query) {
      return this.mustNot(query);
    },

    /**
     * Add should query to the bool query alias
     * @param {Object} query
     */
    queryOr (query) {
      return this.queryShould(query);
    },

    /**
     * Add must filter to the bool query alias
     * @param {Object} query
     */
    filterAnd (query) {
      return this.filter(query);
    },

    /**
     * Add must not filter to the bool query alias
     * @param {Object} query
     */
    filterNot (query) {
      return this.filterMustNot(query);
    },

    /**
     * Add should filter to the bool query alias
     * @param {Object} query
     */
    filterOr (query) {
      return this.filterShould(query);
    }
  };
};
