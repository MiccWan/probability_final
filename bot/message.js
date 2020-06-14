const stickerManager = require('./StickerManager');
const CONFIG = require('./config.json');
const { randomPickIndexByDist, randomPickFrom } = require('./util/randomPick');

function responseWithinCategory(category, threadID) {
  const responseStickerId = randomPickFrom(stickerManager.stickerIdsByName[category]);
  api.sendMessage({ sticker: responseStickerId }, threadID);
}

function logMessage(api, senderID, body, note) {
  api.getUserInfo(senderID, (err, userObj) => {
    if (err) console.error(err);
    const userName = userObj && userObj[senderID].name;
    console.info(`Got ${body} from '${userName}', ${note}`);
  });
}

function handleMessage(api, message) {
  const isOthers = message.senderID !== CONFIG.FB_PAGE_ID;
  if (message.attachments.length && message.attachments[0].type === 'sticker') {
    // is sticker
    const stickerId = message.attachments[0].ID;
    const category = stickerManager.categoryByStickerId[stickerId];

    if (category) {
      // response accordingly
      const categoryId = stickerManager.categoryIndexByName[category];
      const row = stickerManager.stat[categoryId + stickerManager.n * isOthers]; // get distribution row
      const responseState = randomPickIndexByDist(row);

      if (responseState < stickerManager.n) {
        const responseCategory = stickerManager.categoryNames[responseState];
        const responseStickerId = randomPickFrom(stickerManager.stickerIdsByName[responseCategory]);
        api.sendMessage({ sticker: responseStickerId }, message.threadID);

        // logging
        logMessage(api, message.senderID, `sticker ${stickerId}`, `responsed with ${responseStickerId}`);
      }
      else if (responseState === (stickerManager.n * 2)) {
        if (isOthers) {
          const replies = ['Bye~bye~~', { sticker: '1064722136889253' }];
          const reply = randomPickFrom(replies);
          api.sendMessage(reply, message.threadID);
        }
        // logging
        logMessage(api, message.senderID, `sticker ${stickerId}`, `going into empty state`);
      }
      else {
        // do nothing, wait for the other side to response
        api.markAsRead(message.threadID);

        // logging
        logMessage(api, message.senderID, `sticker ${stickerId}`, `waiting for more stickers`);
      }
    }
    else {
      // failed to classify the sticker received, response a question sticker
      const responseStickerId = randomPickFrom(stickerManager.stickerIdsByName['question']);
      api.sendMessage({ sticker: responseStickerId }, message.threadID);

      // logging
      logMessage(api, message.senderID, `sticker ${stickerId}`, `a unknown one!`);
    }
  }
  else if (isOthers) {
    const replies = ['I love stickers!!!!!!!!!!!!!!!!!!!!!', 'Why don\'t u send me a sticker ~~~~~~~'];
    const reply = randomPickFrom(replies);
    api.sendMessage(reply, message.threadID);
    const responseStickerId = randomPickFrom(stickerManager.stickerIdsByName['angry']);
    api.sendMessage({ sticker: responseStickerId }, message.threadID);

    // logging
    logMessage(api, message.senderID, `message '${message.body}'`, '');
  }
}

module.exports = {
  handleMessage
}