'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mixins = require('./Mixins');

/** Class representing a exists query.*/

var ExistsQuery = function (_Mixins) {
  _inherits(ExistsQuery, _Mixins);

  /**
   * Create exists query
   * @param {string} field
   */
  function ExistsQuery(field) {
    _classCallCheck(this, ExistsQuery);

    var _this = _possibleConstructorReturn(this, (ExistsQuery.__proto__ || Object.getPrototypeOf(ExistsQuery)).call(this, 'exists', field));

    _this.exists = {
      field: field
    };
    return _this;
  }

  return ExistsQuery;
}(Mixins);

;

var factoryExistsQuery = function factoryExistsQuery() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(ExistsQuery, [null].concat(args)))();
};
// also expose statically the original class
factoryExistsQuery._originalClass = ExistsQuery;

module.exports = factoryExistsQuery;