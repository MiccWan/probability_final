const login = require("facebook-chat-api");
const fs = require('fs');

const CONFIG = require('./config.json');
const { handleMessage } = require('./message.js');

const creditencial = {
  appState: JSON.parse(fs.readFileSync('./bot/appstate.json', 'utf8'))
}

const option = {
  pageID: CONFIG.FB_PAGE_ID
}

login(creditencial, option, (err, api) => {
  if (err) {
    return console.error(err);;
  }

  console.log('Listening');
  api.listenMqtt((err, message) => {
    if (err) return console.error(err);
    if (message.type === 'message') {
      handleMessage(api, message);
    }
  });
});