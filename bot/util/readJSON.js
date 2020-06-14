const fs = require('fs');

function readJSON(fileName) {
  return JSON.parse(fs.readFileSync(fileName).toString('utf-8'));
}

module.exports = readJSON