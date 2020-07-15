/* eslint-disable no-unused-vars */
const request = require('request');
const process = require('process');

if (process.argv[2] === 'list') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      if (error) {
        console.log('印出失敗', error);
        return;
      }
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        for (let i = 0; i < data.length; i += 1) {
          console.log(`${data[i].id} ${data[i].name}`);
        }
      }
    },
  );
} else if (process.argv[2] === 'read') {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      if (error) {
        console.log('輸出失敗', error);
        return;
      }
      let data;
      try {
        data = JSON.parse(body);
      } catch (e) {
        console.log(e);
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`${data.name}`);
      }
    },
  );
} else if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: process.argv[3],
      },
    },
    (error, response, body) => {
      if (error) {
        console.log('失敗', error);
        return;
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`新增一本名為 ${process.argv[3]} 的書籍`);
      }
    },
  );
} else if (process.argv[2] === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      if (error) {
        console.log('刪除失敗', error);
        return;
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`刪除 id 為 ${process.argv[3]} 的書籍`);
      }
    },
  );
} else if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error, response) => {
      if (error) {
        console.log('更新失敗', error);
        return;
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(`更新 id 為 ${process.argv[3]} 的書名為 ${process.argv[4]}`);
      }
    },
  );
} else {
  console.log('輸入錯誤');
}
