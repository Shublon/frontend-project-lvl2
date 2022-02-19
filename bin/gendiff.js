#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();
program
  .name("gendiff")
  .usage("[options] <filepath1> <filepath2>")

program
  .version("0.0.1", "-V, --version", "output the version number")
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f --format <type>', 'output format');
  //program.configureHelp({
  //  sortOptions: true ,
  //});
program.parse();







//Usage: gendiff [options] <filepath1> <filepath2>



