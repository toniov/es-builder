'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _queryType = Symbol('_queryType');
var _field = Symbol('_field');

/** Class representing mixins.*/
module.exports = function () {
  /**
   * Create mixin
   * @param {string} queryType - query type (e.g. 'term')
   * @param {string} field - field affected (e.g. 'name')
   */
  function Mixins() {
    _classCallCheck(this, Mixins);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this[_queryType] = args[0];
    this[_field] = args[1];
  }

  /**
   * Add boost to query
   * @param {number} score
   */


  _createClass(Mixins, [{
    key: 'boost',
    value: function boost(score) {
      var queryType = this[_queryType];
      var field = this[_field];
      if (queryType === 'exists') {
        this[queryType].boost = score;
        return this;
      }
      this[queryType][field].boost = score;
      return this;
    }

    /**
     * Getter for the completed query
     *  the result will be serialized after using JSON.stringify
     * @return complete query cloned
     */

  }, {
    key: 'built',
    get: function get() {
      return JSON.parse(JSON.stringify(this));
    }
  }]);

  return Mixins;
}();