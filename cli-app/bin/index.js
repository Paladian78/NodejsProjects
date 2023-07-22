#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");


program
  .version(pkg.version)
  .command('todo', 'Manage todo list items')
  .parse(process.argv);