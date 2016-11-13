'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mixins = require('./Mixins');
var _field = Symbol('_field');

/** Class representing a range query.*/

var RangeQuery = function (_Mixins) {
  _inherits(RangeQuery, _Mixins);

  /**
   * Create range query
   * @param {string} field
   */
  function RangeQuery(field) {
    _classCallCheck(this, RangeQuery);

    var _this = _possibleConstructorReturn(this, (RangeQuery.__proto__ || Object.getPrototypeOf(RangeQuery)).call(this, 'range', field));

    _this.range = _defineProperty({}, field, {});
    _this[_field] = field;
    return _this;
  }

  /**
   * Add Greater-than or equal to
   * @param {number} value
   */


  _createClass(RangeQuery, [{
    key: 'gte',
    value: function gte(value) {
      var field = this[_field];
      this.range[field].gte = value;
      return this;
    }

    /**
     * Add Greater-than
     * @param {number} value
     */

  }, {
    key: 'gt',
    value: function gt(value) {
      var field = this[_field];
      this.range[field].gt = value;
      return this;
    }

    /**
     * Add Less-than or equal to
     * @param {number} value
     */

  }, {
    key: 'lte',
    value: function lte(value) {
      var field = this[_field];
      this.range[field].lte = value;
      return this;
    }

    /**
     * Add Less-than
     * @param {number} value
     */

  }, {
    key: 'lt',
    value: function lt(value) {
      var field = this[_field];
      this.range[field].lt = value;
      return this;
    }
  }]);

  return RangeQuery;
}(Mixins);

;

var factoryRangeQuery = function factoryRangeQuery() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(RangeQuery, [null].concat(args)))();
};
// also expose statically the original class
factoryRangeQuery._originalClass = RangeQuery;

module.exports = factoryRangeQuery;