const gameList = (cb) => {
  const request = new XMLHttpRequest();
  const navList = document.querySelector('.navbar__list');
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?limit=5', true);
  request.setRequestHeader('Client-ID', 'z85tx0z4lzuytncvoj61aewdhzqsk3');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = () => {
    const response = request.responseText;
    const data = JSON.parse(response).top;
    if (request.status >= 200 && request.status < 400) {
      for (let i = 0; i < data.length; i += 1) {
        const li = document.createElement('li');
        li.innerText = data[i].game.name;
        navList.appendChild(li);
      }
      cb();
    }
  };
  request.send();
};

const gameLive = (n) => {
  const newReq = new XMLHttpRequest();
  const content = document.querySelector('.games_streams');
  const title = document.querySelector('h2');
  let gameName = document.querySelector('li').innerText;
  if (n) {
    gameName = n;
  }
  newReq.open('GET', `https://api.twitch.tv/kraken/streams/?game=${gameName}`, true);
  newReq.setRequestHeader('Client-ID', 'z85tx0z4lzuytncvoj61aewdhzqsk3');
  newReq.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  newReq.onload = () => {
    if (newReq.status >= 200 && newReq.status < 400) {
      content.innerHTML = '';
      const response = newReq.responseText;
      const newdata = JSON.parse(response).streams;
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
    } else {
      console.log(newReq.status, newReq.responseText);
    }
  };
  newReq.onerror = () => {
    console.log('error');
  };
  newReq.send();
};

gameList(gameLive);
document.querySelector('.navbar').addEventListener('click', (e) => {
  gameLive(e.target.innerHTML);
});
