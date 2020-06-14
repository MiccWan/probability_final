const readJSON = require('./util/readJSON');

function StickerManager() {
  // init
  this.stat = readJSON('data/export/stat.json');
  this.categoryNames = readJSON('data/export/categoryNames.json');
  this.stickerIdsByName = readJSON('data/export/stickerIdsByName.json');
  this.n = this.categoryNames.length;
  this.categoryByStickerId = {};
  this.categoryIndexByName = {};
  for (let i = 0; i < this.categoryNames.length; i++) {
    const categoryName = this.categoryNames[i];
    for (const id of this.stickerIdsByName[categoryName]) this.categoryByStickerId[id] = categoryName;
    this.categoryIndexByName[categoryName] = i;
  }
}

const stickerManager = new StickerManager();

module.exports = stickerManager;