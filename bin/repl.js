#!/usr/bin/env node

const repl = require('repl');
const fs = require('fs');
const path = require('path');
const qb = require('../src');

const r = repl.start('es-builder> ');

// exposte main classes
r.context.qb = qb;
r.context.QueryBuilder = qb.QueryBuilder;
r.context.BoolQuery = qb.BoolQuery;
// expose all the leaf-queries
fs.readdirSync(path.join(__dirname, '..', 'src', 'leaf-queries')).forEach((file) => {
  r.context[file.slice(0, -3)] = require(`../src/leaf-queries/${file}`);
});
