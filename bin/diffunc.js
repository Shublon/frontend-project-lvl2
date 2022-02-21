import * as fs from 'fs';
import * as path from 'path';

const diffunc = (filepath1, filepath2) => {
  const afterPath1 = path.isAbsolute(filepath1) ? filepath1 : path.resolve('__fixture__', filepath1);
  const afterPath2 = path.isAbsolute(filepath2) ? filepath2 : path.resolve('__fixture__', filepath2);

  const fileRead1 = fs.readFileSync(afterPath1, { encoding: 'utf8' });
  const fileRead2 = fs.readFileSync(afterPath2, { encoding: 'utf8' });

  const parsedFile1 = [];
  JSON.parse(fileRead1, (key, value) => parsedFile1.push(`${key}---${value}`));
  const parseFile1 = parsedFile1.slice(0, -1);

  const parsedFile2 = [];
  JSON.parse(fileRead2, (key, value) => parsedFile2.push(`${key}---${value}`));
  const parseFile2 = parsedFile2.slice(0, -1);

  parseFile1.sort();
  parseFile2.sort();

  console.log('{');

  const onlytest1 = parseFile1.map((array) => {
    const arr = array.split('---');
    if (parseFile2.includes(array)) {
      return `    ${arr[0]}: ${arr[1]}\n`;
    }
    return `  - ${arr[0]}: ${arr[1]}\n`;
  });
  onlytest1[onlytest1.length - 1] = onlytest1[onlytest1.length - 1].slice(0, -1);
  console.log(onlytest1.join(''));

  const onlytest2 = parseFile2.map((array) => {
    const arr = array.split('---');
    if (!parseFile1.includes(array)) {
      return `  + ${arr[0]}: ${arr[1]}\n`;
    }
    return null;
  });
  onlytest2[onlytest2.length - 1] = onlytest2[onlytest2.length - 1].slice(0, -1);
  console.log(onlytest2.join(''));
  console.log('}');
};

export default diffunc;
