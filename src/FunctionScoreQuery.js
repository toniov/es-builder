'use strict';

/** Class representing a function score query.*/
class FunctionScoreQuery {
  /**
   * Create a function score query
   */
  constructor () {
    this.function_score = {};
  }

  /**
   * Getter for the completed function score query
   * @return complete query cloned
   */
  get built () {
    return JSON.parse(JSON.stringify(this));
  }

  /**
   * Set source query
   * @param {Object} sourceQuery
   */
  query (sourceQuery) {
    this.function_score.query = sourceQuery;
    return this;
  }

  /**
   * Set source filter
   * @param {Object} sourceFilter
   */
  filter (sourceFilter) {
    this.function_score.filter = sourceFilter;
    return this;
  }

  /**
   * Set scoring mode
   * @param {string} mode
   */
  scoreMode (mode) {
    this.function_score.score_mode = mode;
    return this;
  }

  /**
   * Set score threshold
   * @param {number} score
   */
  minScore (score) {
    this.function_score.min_score = score;
    return this;
  }

  /**
   * Set how the new score is calculated
   * @param {string} mode
   */
  boostMode (mode) {
    this.function_score.boost_mode = mode;
    return this;
  }

  /**
   * Set maximum boost value
   * @param {number} boost
   */
  maxBoost (boost) {
    this.function_score.max_boost = boost;
    return this;
  }

  /**
   * Set boost value for all documents
   * @param {number} boost
   */
  boost (boost) {
    this.function_score.boost = boost;
    return this;
  }

  /**
   * Add score function
   * NOTE: Not compatible with functions() method
   * @param {Object} scoreFunction
   */
  function (scoreFunction) {
    Object.assign(this.function_score, scoreFunction);
    return this;
  }

  /**
   * Add multiple score functions or single score function to score_functions array
   * NOTE: Not compatible with function() method
   * @param {Object[]|Object} scoreFunctions
   */
  functions (scoreFunctions) {
    const isArray = Array.isArray(scoreFunctions);
    if (!this.function_score.functions) {
      this.function_score.functions = isArray ? scoreFunctions : [scoreFunctions];
    } else {
      if (isArray) {
        this.function_score.functions.push(...scoreFunctions);
      } else {
        this.function_score.functions.push(scoreFunctions);
      }
    }
    return this;
  }
}

const factoryFunctionScoreQuery = () => {
  return new FunctionScoreQuery();
};
// also expose statically the original class
factoryFunctionScoreQuery._originalClass = FunctionScoreQuery;

module.exports = factoryFunctionScoreQuery;
