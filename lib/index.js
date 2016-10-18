'use strict';

var fs = require('fs');
var path = require('path');

exports.QueryBuilder = require('./QueryBuilder');
exports.BoolQuery = require('./BoolQuery');

fs.readdirSync(path.join(__dirname, 'leaf-queries')).forEach(function (file) {
  exports[file.slice(0, -3)] = require('./leaf-queries/' + file);
});