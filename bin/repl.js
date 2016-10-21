#!/usr/bin/env node

const repl = require('repl');
const fs = require('fs');
const path = require('path');
const eb = require('../src');
const util = require('util');

function myWriter (output) {
  return util.inspect(output, { depth: null, colors: true });
}

const r = repl.start({ prompt: 'es-builder> ', writer: myWriter });

// exposte main classes
r.context.eb = eb;
r.context.QueryBuilder = eb.QueryBuilder;
r.context.BoolQuery = eb.BoolQuery;
// expose all the leaf-queries
fs.readdirSync(path.join(__dirname, '..', 'src', 'leaf-queries')).forEach((file) => {
  r.context[file.slice(0, -3)] = require(`../src/leaf-queries/${file}`);
});
