'use strict';

/**
 * Create match query
 * @param {string} field
 * @param {string} text
 * @param {Object} [extraOps]
 */
const matchQuery = (field, text, extraOps) => {
  const baseQuery = {
    match: {
      [field]: {
        query: text
      }
    }
  };
  Object.assign(baseQuery.match[field], extraOps);
  return baseQuery;
};
exports.matchQuery = matchQuery;

/**
 * Create term query
 * @param {string} field
 * @param {string|number|Date} value
 */
const termQuery = (field, value) => {
  return {
    term: {
      [field]: value
    }
  };
};
exports.termQuery = termQuery;

/**
 * Create terms query
 * @param {} field
 * @param {string|number|Date|string[]|number[]|Date[]} values
 */
const termsQuery = (field, values) => {
  return {
    terms: {
      [field]: Array.isArray(values) ? values : [values]
    }
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
const rangeQuery = (field, from, to, includeLower, includeUpper) => {
  const baseQuery = {
    range: {
      [field]: {}
    }
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
const existsQuery = (field) => {
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
const prefixQuery = (field, value) => {
  return {
    prefix: {
      [field]: value
    }
  };
};
exports.prefixQuery = prefixQuery;

/**
 * Shortcut for leaf queries
 * @param {Array} params
 */
exports.shortcut = (...params) => {
  const queryType = params[0] + 'Query';
  params.splice(0, 1);
  return exports[queryType](...params);
};
