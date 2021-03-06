const request = require('request');
const process = require('process');

request.get(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`,
  (error, response, body) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      console.log(e);
    }
    const status = response.statusCode;
    if (error) {
      console.log('印出失敗', error);
      return;
    }
    if (status === 404) {
      console.log('找不到國家資訊');
      return;
    }
    if (response.statusCode >= 200 && response.statusCode < 300) {
      for (let i = 0; i < data.length; i += 1) {
        console.log('============');
        console.log(`國家：${data[i].name}`);
        console.log(`首都：${data[i].capital}`);
        console.log(`貨幣：${data[i].currencies[0].code}`);
        console.log(`國碼：${data[i].callingCodes}`);
      }
    }
  },
);
