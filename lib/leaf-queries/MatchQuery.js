'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mixins = require('./Mixins');

/** Class representing a match query.*/

var MatchQuery = function (_Mixins) {
  _inherits(MatchQuery, _Mixins);

  /**
   * Create match query
   * @param {string} field
   * @param {string} text
   * @param {Object} [extraOps]
   */
  function MatchQuery(field, text, extraOps) {
    _classCallCheck(this, MatchQuery);

    var _this = _possibleConstructorReturn(this, (MatchQuery.__proto__ || Object.getPrototypeOf(MatchQuery)).call(this, 'match', field));

    _this.match = _defineProperty({}, field, {
      query: text
    });
    _extends(_this.match[field], extraOps);
    return _this;
  }

  return MatchQuery;
}(Mixins);

;

var factoryMatchQuery = function factoryMatchQuery() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(MatchQuery, [null].concat(args)))();
};
// also expose statically the original class
factoryMatchQuery._originalClass = MatchQuery;

module.exports = factoryMatchQuery;