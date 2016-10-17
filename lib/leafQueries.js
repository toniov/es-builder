'use strict';

/**
 * Create match query
 * @param {string} field
 * @param {string} text
 * @param {Object} [extraOps]
 */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var matchQuery = function matchQuery(field, text, extraOps) {
  var baseQuery = {
    match: _defineProperty({}, field, {
      query: text
    })
  };
  _extends(baseQuery.match[field], extraOps);
  return baseQuery;
};
exports.matchQuery = matchQuery;

/**
 * Create term query
 * @param {string} field
 * @param {string|number|Date} value
 */
var termQuery = function termQuery(field, value) {
  return {
    term: _defineProperty({}, field, value)
  };
};
exports.termQuery = termQuery;

/**
 * Create terms query
 * @param {} field
 * @param {string|number|Date|string[]|number[]|Date[]} values
 */
var termsQuery = function termsQuery(field, values) {
  return {
    terms: _defineProperty({}, field, Array.isArray(values) ? values : [values])
  };
};
exports.termsQuery = termsQuery;

/**
 * Create terms query
 * @param {string} field
 * @param {number, string, Date} [from]
 * @param {number, string, Date} [to]
 * @param {boolean} [includeLowser]
 * @param {boolean} [includeUpper]
 */
var rangeQuery = function rangeQuery(field, from, to, includeLower, includeUpper) {
  var baseQuery = {
    range: _defineProperty({}, field, {})
  };

  if (includeLower) {
    baseQuery.range[field].gte = from;
  } else {
    baseQuery.range[field].gt = from;
  }

  if (includeUpper) {
    baseQuery.range[field].lte = to;
  } else {
    baseQuery.range[field].lt = to;
  }

  return baseQuery;
};
exports.rangeQuery = rangeQuery;

/**
 * Create exists query
 * @param {string|number|Date} field
 */
var existsQuery = function existsQuery(field) {
  return {
    exists: {
      field: field
    }
  };
};
exports.existsQuery = existsQuery;

/**
 * Create prefix query
 * @param {string} field
 * @param {string} value
 */
var prefixQuery = function prefixQuery(field, value) {
  return {
    prefix: _defineProperty({}, field, value)
  };
};
exports.prefixQuery = prefixQuery;

/**
 * Shortcut for leaf queries
 * @param {Array} params
 */
exports.shortcut = function () {
  var _exports;

  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  var queryType = params[0] + 'Query';
  params.splice(0, 1);
  return (_exports = exports)[queryType].apply(_exports, params);
};