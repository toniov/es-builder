'use strict';

/**
 * Create match query
 * @param {string} field
 * @param {string} text
 * @param {Object} [extraOps]
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MatchQuery = function MatchQuery(field, text, extraOps) {
  var baseQuery = {
    match: _defineProperty({}, field, {
      query: text
    })
  };
  _extends(baseQuery.match[field], extraOps);
  return baseQuery;
};
module.exports = MatchQuery;