import sortFiles from './parsers.js';

const diffunc = (filepath1, filepath2) => {
  const now = sortFiles(filepath1, filepath2);
  const pare1demo = Object.entries(now[0]);
  const pare2demo = Object.entries(now[1]);

  const pare1 = pare1demo.map((arr) => `${arr[0]}: ${arr[1]}\n`);
  const pare2 = pare2demo.map((arr) => `${arr[0]}: ${arr[1]}\n`);
  pare1.sort();
  pare2.sort();

  const onlytest1 = pare1.map((str) => {
    if (pare2.includes(str)) {
      return `    ${str}`;
    }
    return `  - ${str}`;
  });

  const onlytest2 = pare2.map((str) => {
    if (!pare1.includes(str)) {
      return `  + ${str}`;
    }
    return null;
  });

  const demoResult = ['{\n', onlytest1, onlytest2, '}'];
  const result = demoResult.flat();
  return result.join('');
};

export default diffunc;
