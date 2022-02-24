import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as yaml from 'js-yaml';

const sortFiles = (filepath1, filepath2) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const afterPath1 = path.isAbsolute(filepath1) ? filepath1 : path.join(__dirname, '..', '__fixture__', filepath1);
  const afterPath2 = path.isAbsolute(filepath2) ? filepath2 : path.join(__dirname, '..', '__fixture__', filepath2);

  const format1 = path.extname(filepath1);
  const format2 = path.extname(filepath2);

  let parsedFile1;
  let parsedFile2;

  if (format1 === '' || format1 === '.json') {
    parsedFile1 = JSON.parse(fs.readFileSync(afterPath1, 'utf8'));
  } else if (format1 === '.yml' || format1 === '.yaml') {
    parsedFile1 = yaml.load(fs.readFileSync(afterPath1, 'utf8'));
  }

  if (format2 === '' || format2 === '.json') {
    parsedFile2 = JSON.parse(fs.readFileSync(afterPath2, 'utf8'));
  } else if (format2 === '.yml' || format2 === '.yaml') {
    parsedFile2 = yaml.load(fs.readFileSync(afterPath2, 'utf8'));
  }
  return [parsedFile1, parsedFile2];
};

export default sortFiles;
