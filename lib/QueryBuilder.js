'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoolQuery = require('./BoolQuery');
var boolQueryInstance = Symbol('boolQueryInstance');
var boolQueryInstanceForFilter = Symbol('boolQueryInstanceForFilter');

/** Class representing a query builder.*/

var QueryBuilder = function () {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  function QueryBuilder() {
    _classCallCheck(this, QueryBuilder);

    this[boolQueryInstance] = new BoolQuery();
    this[boolQueryInstanceForFilter] = new BoolQuery();
  }

  /**
   * Add must query to the bool query
   *
   * @param {Object} query
   */


  _createClass(QueryBuilder, [{
    key: 'query',
    value: function query(_query) {
      this[boolQueryInstance].must(_query);
      return this;
    }

    /**
     * Add must not query to the bool query
     *
     * @param {Object} query
     */

  }, {
    key: 'queryMustNot',
    value: function queryMustNot(query) {
      this[boolQueryInstance].mustNot(query);
      return this;
    }

    /**
     * Add should query to the bool query
     *
     * @param {Object} query
     */

  }, {
    key: 'queryShould',
    value: function queryShould(query) {
      this[boolQueryInstance].should(query);
      return this;
    }

    /**
     * Add must filter to the bool query
     *
     * @param {Object} query
     */

  }, {
    key: 'filter',
    value: function filter(query) {
      this[boolQueryInstanceForFilter].must(query);
      return this;
    }

    /**
     * Add must not filter to the bool query
     *
     * @param {Object} query
     */

  }, {
    key: 'filterMustNot',
    value: function filterMustNot(query) {
      this[boolQueryInstanceForFilter].mustNot(query);
      return this;
    }

    /**
     * Add should filter to the bool query
     *
     * @param {Object} query
     */

  }, {
    key: 'filterShould',
    value: function filterShould(query) {
      this[boolQueryInstanceForFilter].should(query);
      return this;
    }

    /**
     * Getter for the full query that will be passed to the search API
     * @return complete query cloned
     */

  }, {
    key: 'built',
    get: function get() {
      var completeQuery = this[boolQueryInstance].built;
      // add filter clause only in case filters were added
      var filterBool = this[boolQueryInstanceForFilter].built;
      if (Object.keys(filterBool.bool).length > 0) {
        completeQuery.bool.filter = filterBool;
      }
      return JSON.parse(JSON.stringify(completeQuery));
    }
  }]);

  return QueryBuilder;
}();

// Add aliases


QueryBuilder.prototype.queryAnd = QueryBuilder.prototype.query;
QueryBuilder.prototype.queryNot = QueryBuilder.prototype.queryMustNot;
QueryBuilder.prototype.queryOr = QueryBuilder.prototype.queryShould;
QueryBuilder.prototype.filterAnd = QueryBuilder.prototype.filter;
QueryBuilder.prototype.filterNot = QueryBuilder.prototype.filterMustNot;
QueryBuilder.prototype.filterOr = QueryBuilder.prototype.filterShould;

module.exports = QueryBuilder;