#!/usr/bin/env node

import * as commander from 'commander';
import diffunc from './diffunc.js';

const program = new commander.Command();

program
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(diffunc(filepath1, filepath2));
  });

program.parse();
