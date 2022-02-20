#!/usr/bin/env node

import * as commander from "commander";
import _ from "lodash";
import * as fs from "fs";
import * as path from "path";

const program = new commander.Command();

program
  .version("0.0.1", "-V, --version", "output the version number")
  .description("Compares two configuration files and shows a difference.")
  .helpOption("-h, --help", "output usage information")
  .option("-f --format <type>", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    const afterPath1 = path.resolve("__fixture__", filepath1);
    const afterPath2 = path.resolve("__fixture__", filepath2);

    const fileRead1 = fs.readFileSync(afterPath1, { encoding: "utf8" });
    const fileRead2 = fs.readFileSync(afterPath2, { encoding: "utf8" });

    let parsedFile1 = [];
    JSON.parse(fileRead1, (key, value) =>
      parsedFile1.push(`${key}---${value}`)
    );
    const parseFile1 = parsedFile1.slice(0, -1);

    const parsedFile2 = [];
    JSON.parse(fileRead2, (key, value) =>
      parsedFile2.push(`${key}---${value}`)
    );
    const parseFile2 = parsedFile2.slice(0, -1);

    parseFile1.sort();
    parseFile2.sort();

    console.log("{");

    for (let array of parseFile1) {
      if (parseFile2.includes(array)) {
        const arr = array.split("---");
        console.log(`    ${arr[0]}: ${arr[1]}`);
      } else {
        const arr = array.split("---");
        console.log(`  - ${arr[0]}: ${arr[1]}`);
      }
    }

    for (let array of parseFile2) {
      if (parseFile1.includes(array)) {
        continue;
      } else {
        const arr = array.split("---");
        console.log(`  + ${arr[0]}: ${arr[1]}`);
      }
    }
    console.log("}");
  });

program.parse();
