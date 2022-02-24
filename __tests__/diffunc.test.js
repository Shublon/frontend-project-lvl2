import { expect, test } from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import diffunc from '../bin/diffunc.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileTest = (file) => {
  const afterPath = path.join(__dirname, '..', '__fixture__', file);
  const fileRead = fs.readFileSync(afterPath, 'utf8');
  return fileRead;
};

test('diffunc', () => {
  expect(diffunc('file1.json', 'file2.json')).toEqual(fileTest('expectFiles.txt'));
  expect(diffunc('file1.yml', 'file2.json')).toEqual(fileTest('expectFiles.txt'));
  expect(diffunc('file1.json', 'file2.yaml')).toEqual(fileTest('expectFiles.txt'));
  expect(diffunc('file1.yml', 'file2.yaml')).toEqual(fileTest('expectFiles.txt'));
});
