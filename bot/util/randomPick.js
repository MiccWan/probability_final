const sum = require('lodash/sum');
const random = require('lodash/random');

function randomPickIndexByDist(arr) {
  const arrSum = sum(arr);
  const randomInt = random(arrSum - 1);
  let acc = 0;
  for (let i = 0; i < arr.length; ++i) {
    acc += arr[i];
    if (randomInt < acc) {
      return i;
    }
  }
}

function randomPickFrom(arr) {
  return arr[random(arr.length - 1)];
}

module.exports = { randomPickIndexByDist, randomPickFrom };