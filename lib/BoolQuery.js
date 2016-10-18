'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var add = Symbol('add');
var boolQuery = Symbol('boolQuery');

/** Class representing an Elasticsearch bool query.*/

var BoolQuery = function () {
  /**
   * Reference:
   * https://www.elastic.co/guide/en/elasticsearch/guide/current/combining-filters.html
   *
   */
  function BoolQuery() {
    _classCallCheck(this, BoolQuery);

    this[boolQuery] = {};
  }

  /**
   * Add to the appropiate bool
   *
   * @private
   * @param {string} type
   * @param {Object} query
   */


  _createClass(BoolQuery, [{
    key: add,
    value: function value(type, query) {
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

  }, {
    key: 'must',
    value: function must(query) {
      return this[add]('must', query);
    }

    /**
     * Add must_not
     *
     * @param {Object} query
     */

  }, {
    key: 'mustNot',
    value: function mustNot(query) {
      return this[add]('must_not', query);
    }

    /**
     * Add should
     *
     * @param {Object} query
     */

  }, {
    key: 'should',
    value: function should(query) {
      return this[add]('should', query);
    }

    /**
     * Add query
     *
     * @param {Object} query
     */

  }, {
    key: 'filter',
    value: function filter(query) {
      return this[add]('filter', query);
    }

    /**
     * Getter for built bool query
     * @return complete bool query cloned
     */

  }, {
    key: 'built',
    get: function get() {
      var completeBoolQuery = {
        bool: this[boolQuery]
      };
      return JSON.parse(JSON.stringify(completeBoolQuery));
    }
  }]);

  return BoolQuery;
}();

// Add aliases


BoolQuery.prototype.and = BoolQuery.prototype.must;
BoolQuery.prototype.not = BoolQuery.prototype.mustNot;
BoolQuery.prototype.or = BoolQuery.prototype.should;

module.exports = BoolQuery;