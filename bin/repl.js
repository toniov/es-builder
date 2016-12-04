#!/usr/bin/env node

const repl = require('repl');
const fs = require('fs');
const path = require('path');
const os = require('os');
const eb = require('../lib');
const util = require('util');

const file = path.join(os.homedir(), '.es-builder_repl_history');
const fd = fs.openSync(file, 'a');

const myWriter = (output) => {
  return util.inspect(output, { depth: null, colors: true });
};

const replServer = repl.start({ prompt: 'es-builder> ', writer: myWriter });
replServer.on('line', (input) => {
  fs.write(fd, input + '\n');
});
replServer.history = fs.readFileSync(file, 'utf-8').split('\n').reverse();

// exposte main classes
replServer.context.eb = eb;
replServer.context.QueryBuilder = eb.QueryBuilder;
replServer.context.BoolQuery = eb.BoolQuery;
// expose all the leaf-queries
fs.readdirSync(path.join(__dirname, '..', 'lib', 'leaf-queries')).forEach((file) => {
  replServer.context[file.slice(0, -3)] = require(`../lib/leaf-queries/${file}`);
});
