import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const sortFiles = (filepath1, filepath2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const afterPath1 = path.isAbsolute(filepath1) ? filepath1 : path.join(__dirname, '..', '__fixture__', filepath1);
  const afterPath2 = path.isAbsolute(filepath2) ? filepath2 : path.join(__dirname, '..', '__fixture__', filepath2);

  const fileRead1 = fs.readFileSync(afterPath1, 'utf8');
  const fileRead2 = fs.readFileSync(afterPath2, 'utf8');

  const parsedFile1 = [];
  JSON.parse(fileRead1, (key, value) => parsedFile1.push(`${key}---${value}`));
  const parseFile1 = parsedFile1.slice(0, -1);

  const parsedFile2 = [];
  JSON.parse(fileRead2, (key, value) => parsedFile2.push(`${key}---${value}`));
  const parseFile2 = parsedFile2.slice(0, -1);

  parseFile1.sort();
  parseFile2.sort();
  return [parseFile1, parseFile2];
};

const diffunc = (filepath1, filepath2) => {
  const now = sortFiles(filepath1, filepath2);
  const parseFile1 = now[0];
  const parseFile2 = now[1];

  const onlytest1 = parseFile1.map((array) => {
    const arr = array.split('---');
    if (parseFile2.includes(array)) {
      return `    ${arr[0]}: ${arr[1]}\n`;
    }
    return `  - ${arr[0]}: ${arr[1]}\n`;
  });

  const onlytest2 = parseFile2.map((array) => {
    const arr = array.split('---');
    if (!parseFile1.includes(array)) {
      return `  + ${arr[0]}: ${arr[1]}\n`;
    }
    return null;
  });

  const demoResult = ['{\n', onlytest1, onlytest2, '}'];
  const result = demoResult.flat();
  return result.join('');
};

export default diffunc;
