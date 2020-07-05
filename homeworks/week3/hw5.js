// 聯誼順序比大小
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isWin(a, b, c) {
  if (c === 1 && a.length > b.length) {
    return 'A';
    /* eslint-disable */
  } else if (c === 1 && a.length < b.length) {
    /* eslint-enable */
    return 'B';
  } else if (c === 1 && a.length === b.length) {
    for (let k = 0; k < a.length; k += 1) {
      if (a[k] > b[k]) {
        return 'A';
      /* eslint-disable */
      } else if (a[k] < b[k]) {
      /* eslint-enable */
        return 'B';
      }
    } return 'DRAW';
  } else if (c === -1 && a.length > b.length) {
    return 'B';
  } else if (c === -1 && a.length < b.length) {
    return 'A';
  } else if (c === -1 && a.length === b.length) {
    for (let k = 0; k < a.length; k += 1) {
      if (a[k] > b[k]) {
        return 'B';
      /* eslint-disable */
      } else if (a[k] < b[k]) {
      /* eslint-enable */
        return 'A';
      }
    } return 'DRAW';
  } else {
    return 'DRAW';
  }
}

function solve(input) {
  const num = Number(input[0]);
  for (let i = 1; i <= num; i += 1) {
    const a = input[i].split(' ');
    console.log(isWin(a[0], a[1], Number(a[2])));
  }
}

rl.on('close', () => {
  solve(lines);
});
