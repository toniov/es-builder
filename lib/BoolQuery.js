'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var add = Symbol('add');
var _build = Symbol('_build');
var _boolQuery = Symbol('_boolQuery');

/** Class representing a query builder.*/

var BoolQuery = function () {
  /**
   * Create a bool query
   */
  function BoolQuery() {
    _classCallCheck(this, BoolQuery);

    this[_boolQuery] = {};
  }

  /**
   * Compose bool query
   * @private
   * @return completed query
   */


  _createClass(BoolQuery, [{
    key: _build,
    value: function value() {
      return {
        bool: this[_boolQuery]
      };
    }

    /**
     * Getter for the completed bool query
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
     * Add to the appropiate bool
     * @private
     * @param {string} type
     * @param {Object} query
     */

  }, {
    key: add,
    value: function value(type, query) {
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

  }, {
    key: 'must',
    value: function must(query) {
      return this[add]('must', query);
    }

    /**
     * Add must_not
     * @param {Object} query
     */

  }, {
    key: 'mustNot',
    value: function mustNot(query) {
      return this[add]('must_not', query);
    }

    /**
     * Add should
     * @param {Object} query
     */

  }, {
    key: 'should',
    value: function should(query) {
      return this[add]('should', query);
    }

    /**
     * Add query
     * @param {Object} query
     */

  }, {
    key: 'filter',
    value: function filter(query) {
      return this[add]('filter', query);
    }

    /**
     * must alias
     * @param {Object} query
     */

  }, {
    key: 'and',
    value: function and(query) {
      return this.must(query);
    }

    /**
     * must_not alias
     * @param {Object} query
     */

  }, {
    key: 'not',
    value: function not(query) {
      return this.mustNot(query);
    }

    /**
     * should alias
     * @param {Object} query
     */

  }, {
    key: 'or',
    value: function or(query) {
      return this.should(query);
    }
  }, {
    key: 'built',
    get: function get() {
      return JSON.parse(JSON.stringify(this[_build]()));
    }
  }]);

  return BoolQuery;
}();

;

var factoryBoolQuery = function factoryBoolQuery() {
  return new BoolQuery();
};
// also expose statically the original class
factoryBoolQuery._originalClass = BoolQuery;

module.exports = factoryBoolQuery;