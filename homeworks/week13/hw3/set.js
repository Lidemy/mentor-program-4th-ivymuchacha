/* eslint-disable arrow-parens */
const apiUrl = 'https://api.twitch.tv/kraken/games/top?limit=5';
const apiStreamUrl = 'https://api.twitch.tv/kraken/streams/?game=';

const gameList = (cb) => {
  const navList = document.querySelector('.navbar__list');
  fetch(
    apiUrl, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Client-ID': 'z85tx0z4lzuytncvoj61aewdhzqsk3',
        Accept: 'application/vnd.twitchtv.v5+json',
      }),
    },
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      const data = json.top;
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement('li');
        li.innerText = data[i].game.name;
        navList.appendChild(li);
      }
      cb();
    }).catch((err) => {
      console.log('error', err);
    });
};

const gameLive = (n) => {
  const content = document.querySelector('.games_streams');
  const title = document.querySelector('h2');
  let gameName = document.querySelector('li').innerText;
  if (n) {
    gameName = n;
  }
  fetch(
    apiStreamUrl + gameName, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Client-ID': 'z85tx0z4lzuytncvoj61aewdhzqsk3',
        Accept: 'application/vnd.twitchtv.v5+json',
      }),
    },
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      content.innerHTML = '';
      const newdata = json.streams;
      title.innerText = gameName;
      for (let i = 0; i < 20; i += 1) {
        const div = document.createElement('div');
        div.classList.add('game');
        div.innerHTML = `
        <a href=${newdata[i].channel.url}/>
          <img class="game__video" src=${newdata[i].preview.medium}></img>
          <div class="game__info">
            <img class="game__pic" src=${newdata[i].channel.logo}></img>
            <div class="game__name">
              ${newdata[i].channel.status}
            <p class="game__kol">${newdata[i].channel.name}</p>
            </div>
          </div>`;
        content.appendChild(div);
      }
      for (let i = 0; i < 2; i += 1) {
        const empty = document.createElement('div');
        empty.classList.add('game');
        content.appendChild(empty);
      }
    }).catch((err) => {
      console.log('error', err);
    });
};

gameList(gameLive);
document.querySelector('.navbar').addEventListener('click', (e) => {
  gameLive(e.target.innerHTML);
});
