'use strict';

/**
 * Create term query
 * @param {Object} query
 * @param {string} type
 * @param {string} field
 */
module.exports = (query, type, field) => {
  return {
    /**
     * Add boost to query
     * @param {number} score
     */
    boost (score) {
      if (type === 'exists') {
        query[type].boost = score;
        return this;
      }
      query[type][field].boost = score;
      return this;
    },

    /**
     * Getter for the completed query
     *  the result will be serialized after using JSON.stringify
     * @return complete query cloned
     */
    get built () {
      return JSON.parse(JSON.stringify(query));
    },

    /**
     * Customize JSON stringification behavior
     * @see: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     */
    toJSON () {
      return query;
    }
  };
};
