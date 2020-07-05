// 判斷迴文
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function reverse(str) {
  const num = str.length;
  let result = '';
  for (let i = num - 1; i >= 0; i -= 1) {
    result += str[i];
  } return result;
}

function isSame(str) {
  if (str === reverse(str)) {
    return 'True';
  } return 'False';
}

function solve(input) {
  const ans = input[0];
  console.log(isSame(ans));
}

rl.on('close', () => {
  solve(lines);
});
