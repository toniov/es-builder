'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mixins = require('./Mixins');

/** Class representing a prefix query.*/

var PrefixQuery = function (_Mixins) {
  _inherits(PrefixQuery, _Mixins);

  /**
   * Create prefix query
   * @param {string} field
   * @param {string|number|Date} value
   */
  function PrefixQuery(field, value) {
    _classCallCheck(this, PrefixQuery);

    var _this = _possibleConstructorReturn(this, (PrefixQuery.__proto__ || Object.getPrototypeOf(PrefixQuery)).call(this, 'prefix', field));

    _this.prefix = _defineProperty({}, field, {
      value: value
    });
    return _this;
  }

  return PrefixQuery;
}(Mixins);

;

var factoryPrefixQuery = function factoryPrefixQuery() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(PrefixQuery, [null].concat(args)))();
};
// also expose statically the original class
factoryPrefixQuery._originalClass = PrefixQuery;

module.exports = factoryPrefixQuery;