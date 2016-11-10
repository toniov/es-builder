'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoolQuery = require('./BoolQuery');
var _boolQuery = Symbol('boolQuery');
var _boolQueryForFilter = Symbol('boolQueryForFilter');
var _build = Symbol('build');

/** Class representing a query builder.*/

var QueryBuilder = function () {
  /**
   * Create a QueryBuilder instance
   */
  function QueryBuilder() {
    _classCallCheck(this, QueryBuilder);

    this[_boolQuery] = BoolQuery();
    this[_boolQueryForFilter] = BoolQuery();
  }

  /**
   * Compose full query
   * @private
   * @return completed query
   */


  _createClass(QueryBuilder, [{
    key: _build,
    value: function value() {
      var completeQuery = this[_boolQuery].built;
      // add filter clause only in case filters were added
      var filterBool = this[_boolQueryForFilter].built;
      if (Object.keys(filterBool.bool).length > 0) {
        completeQuery.bool.filter = filterBool;
      }
      return completeQuery;
    }

    /**
     * Getter for the completed query
     * @return complete query cloned
     */

  }, {
    key: 'toJSON',


    /**
     * Customize JSON stringification behavior
     * @see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    value: function toJSON() {
      return this[_build]();
    }

    /**
     * Get the query strinfied (to be used in the REPL)
     */

  }, {
    key: 'query',


    /**
     * Add must query to the bool query
     * @param {Object} query
     */
    value: function query(_query) {
      this[_boolQuery].must(_query);
      return this;
    }

    /**
     * Add must not query to the bool query
     * @param {Object} query
     */

  }, {
    key: 'queryMustNot',
    value: function queryMustNot(query) {
      this[_boolQuery].mustNot(query);
      return this;
    }

    /**
     * Add should query to the bool query
     * @param {Object} query
     */

  }, {
    key: 'queryShould',
    value: function queryShould(query) {
      this[_boolQuery].should(query);
      return this;
    }

    /**
     * Add must filter to the bool query
     * @param {Object} query
     */

  }, {
    key: 'filter',
    value: function filter(query) {
      this[_boolQueryForFilter].must(query);
      return this;
    }

    /**
     * Add must not filter to the bool query
     * @param {Object} query
     */

  }, {
    key: 'filterMustNot',
    value: function filterMustNot(query) {
      this[_boolQueryForFilter].mustNot(query);
      return this;
    }

    /**
     * Add should filter to the bool query
     * @param {Object} query
     */

  }, {
    key: 'filterShould',
    value: function filterShould(query) {
      this[_boolQueryForFilter].should(query);
      return this;
    }

    /**
     * Add must query to the bool query
     * @param {Object} query
     */

  }, {
    key: 'queryAnd',
    value: function queryAnd(query) {
      return this.query(query);
    }

    /**
     * Add must not query to the bool query alias
     * @param {Object} query
     */

  }, {
    key: 'queryNot',
    value: function queryNot(query) {
      return this.mustNot(query);
    }

    /**
     * Add should query to the bool query alias
     * @param {Object} query
     */

  }, {
    key: 'queryOr',
    value: function queryOr(query) {
      return this.queryShould(query);
    }

    /**
     * Add must filter to the bool query alias
     * @param {Object} query
     */

  }, {
    key: 'filterAnd',
    value: function filterAnd(query) {
      return this.filter(query);
    }

    /**
     * Add must not filter to the bool query alias
     * @param {Object} query
     */

  }, {
    key: 'filterNot',
    value: function filterNot(query) {
      return this.filterMustNot(query);
    }

    /**
     * Add should filter to the bool query alias
     * @param {Object} query
     */

  }, {
    key: 'filterOr',
    value: function filterOr(query) {
      return this.filterShould(query);
    }
  }, {
    key: 'built',
    get: function get() {
      return JSON.parse(JSON.stringify(this[_build]()));
    }
  }, {
    key: 'stringified',
    get: function get() {
      return JSON.stringify(this[_build]());
    }
  }]);

  return QueryBuilder;
}();

;

var factoryQueryBuilder = function factoryQueryBuilder() {
  return new QueryBuilder();
};
// also expose statically the original class
factoryQueryBuilder._originalClass = QueryBuilder;

module.exports = factoryQueryBuilder;