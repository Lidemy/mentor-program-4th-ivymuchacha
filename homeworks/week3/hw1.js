// 好多星星
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

const repeat = (string, k) => {
  let result = '';
  for (let j = 1; j <= k; j += 1) {
    result += string;
  }
  return result;
};

function Star(n) {
  console.log(repeat('*', n));
}

function solve(input) {
  const n = Number(input[0]);
  for (let i = 1; i <= n; i += 1) {
    Star(i);
  }
}

rl.on('close', () => {
  solve(lines);
});
