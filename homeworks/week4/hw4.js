const request = require('request');

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'z85tx0z4lzuytncvoj61aewdhzqsk3',
  },
};

function callback(error, response, body) {
  if (!error && response.statusCode >= 200 && response.statusCode < 300) {
    let info;
    try {
      info = JSON.parse(body);
    } catch (e) {
      console.log(e);
    }
    const data = info.top;
    for (let i = 0; i < data.length; i += 1) {
      console.log(`${data[i].viewers} ${data[i].game.name}`);
    }
  }
}

request(options, callback);
