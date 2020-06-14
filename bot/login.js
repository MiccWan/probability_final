const login = require('facebook-chat-api');
const readlineSync = require('readline-sync');
const fs = require('fs');
const CONFIG = require('./config.json');

const email = readlineSync.question('Email: ');
const password = readlineSync.question('Password: ');

const creditencial = { email, password };

const option = {
  pageID: CONFIG.FB_PAGE_ID
}

login(creditencial, option, (err, api) => {
  if (err) {
    if (err.error === 'login-approval') {
      const code = readlineSync.question('[2-Factor Auth] code:');
      err.continue(code);
    }
    else if (err.error === 'review-recent-login') {
      console.error(err);
    }
    else {
      console.error(err);
    }
    return;
  }

  try {
    fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    console.log('Login state saved.');
  }
  catch(err){
    console.error(err);
  }
});