// 水仙花數
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function mathPow(x, y) {
  let result = 1;
  for (let i = 1; i <= y; i += 1) {
    result *= x;
  } return result;
}

function sumNum(num) {
  const n = String(num);
  let sum = 0;
  for (let j = 0; j < n.length; j += 1) {
    sum += mathPow(n[j], n.length);
  } return sum;
}

function printNarc(n, m) {
  for (let i = n; i <= m; i += 1) {
    if (sumNum(i) === i) {
      console.log(i);
    }
  }
}

function solve(input) {
  const temp = input[0];
  const line = temp.split(' ');
  const n = Number(line[0]);
  const m = Number(line[1]);
  printNarc(n, m);
}

rl.on('close', () => {
  solve(lines);
});
