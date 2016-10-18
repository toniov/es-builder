'use strict';

const fs = require('fs');
const path = require('path');

exports.QueryBuilder = require('./QueryBuilder');
exports.BoolQuery = require('./BoolQuery');

fs.readdirSync(path.join(__dirname, 'leaf-queries')).forEach((file) => {
  exports[file.slice(0, -3)] = require(`./leaf-queries/${file}`);
});
