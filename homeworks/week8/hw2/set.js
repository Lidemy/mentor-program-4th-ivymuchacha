const gameList = () => {
  const request = new XMLHttpRequest();
  const navList = document.querySelector('.navbar__list');
  const content = document.querySelector('.games_streams');
  const title = document.querySelector('h2');
  request.open('GET', 'https://api.twitch.tv/kraken/games/top?_limit=5', true);
  request.setRequestHeader('Client-ID', 'z85tx0z4lzuytncvoj61aewdhzqsk3');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = () => {
    const response = request.responseText;
    const data = JSON.parse(response).top;
    if (request.status >= 200 && request.status < 400) {
      for (let i = 0; i < 5; i += 1) {
        const li = document.createElement('li');
        li.innerText = `${data[i].game.name}`;
        navList.appendChild(li);
      }

      const newReq = new XMLHttpRequest();
      newReq.open('GET', `https://api.twitch.tv/kraken/streams/?game=${data[0].game.name}`, true);
      newReq.setRequestHeader('Client-ID', 'z85tx0z4lzuytncvoj61aewdhzqsk3');
      newReq.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
      newReq.onload = () => {
        if (newReq.status >= 200 && newReq.status < 400) {
          const newresponse = newReq.responseText;
          const newdata = JSON.parse(newresponse).streams;
          title.innerText = `${data[0].game.name}`;
          for (let i = 0; i < 20; i += 1) {
            const div = document.createElement('div');
            div.classList.add('game');
            div.innerHTML = `
            <a href = ${newdata[i].channel.url} />
              <img class = "game__video" src = ${newdata[i].preview.medium} ></img>
              <div class = "game__info">
                <img class = "game__pic" src = ${newdata[i].channel.logo}></img>
                <div class = "game__name">
                  ${newdata[i].channel.status}
                <p class = "game__kol">${newdata[i].channel.name}</p>
                </div>
              </div>`;
            content.appendChild(div);
          }
          for (let i = 0; i < 2; i += 1) {
            const empty = document.createElement('div');
            empty.classList.add('game');
            content.appendChild(empty);
          }
        }
      };
      newReq.send();
    }
  };
  request.send();
};

const gameLive = () => {
  const newReq = new XMLHttpRequest();
  const content = document.querySelector('.games_streams');
  const title = document.querySelector('h2');
  document.querySelector('.navbar').addEventListener('click', (e) => {
    let gameName = '';
    if (e.target.innerHTML !== '') {
      gameName = e.target.innerHTML;
    }
    newReq.open('GET', `https://api.twitch.tv/kraken/streams/?game=${gameName}`, true);
    newReq.setRequestHeader('Client-ID', 'z85tx0z4lzuytncvoj61aewdhzqsk3');
    newReq.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
    newReq.onload = () => {
      if (newReq.status >= 200 && newReq.status < 400) {
        content.innerHTML = '';
        const response = newReq.responseText;
        const newdata = JSON.parse(response).streams;
        title.innerText = `${gameName}`;
        for (let i = 0; i < 20; i += 1) {
          const div = document.createElement('div');
          div.classList.add('game');
          div.innerHTML = `
          <a href =${newdata[i].channel.url}/>
            <img class = "game__video" src = ${newdata[i].preview.medium}></img>
            <div class = "game__info">
              <img class = "game__pic" src =${newdata[i].channel.logo}></img>
              <div class = "game__name">
                ${newdata[i].channel.status}
              <p class = "game__kol">${newdata[i].channel.name}</p>
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
  });
};

gameList();
gameLive();
