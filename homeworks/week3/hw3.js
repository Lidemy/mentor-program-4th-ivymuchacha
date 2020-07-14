// 判斷質數
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function prime(num) {
  if (num === 1) {
    return false;
  }
  if (num === 2) {
    return true;
  }
  for (let j = 2; j < num; j += 1) {
    if (num % j === 0) {
      return false;
    }
  } return true;
}

function solve(input) {
  const k = input[0];
  for (let i = 1; i <= k; i += 1) {
    if (prime(Number(input[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
