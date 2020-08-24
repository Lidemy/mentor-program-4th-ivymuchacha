document.querySelector('.button').addEventListener('click', () => {
  const request = new XMLHttpRequest();
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      const json = JSON.parse(response);
      const prizename = json.prize;
      const newBg = document.querySelector('.lotterys');
      if (prizename === 'FIRST') {
        newBg.innerHTML = `
        <div class="first">
        <div class="prize">
          <div class="prize__desc">
            恭喜你中頭獎了！日本東京來回雙人遊！
          </div>
          <div class="button">
            <input type="button" value="我要抽獎"/>
          </div>
        </div>
        </div>`;
      } else if (prizename === 'SECOND') {
        newBg.innerHTML = `
        <div class="second">
        <div class="prize">
          <div class="prize__desc">
            二獎！90 吋電視一台！
          </div>
          <div class="button">
            <input type="button" value="我要抽獎"/>
          </div>
        </div>
        </div>`;
      } else if (prizename === 'THIRD') {
        newBg.innerHTML = `
        <div class="third">
        <div class="prize">
          <div class="prize__desc">
            恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！
          </div>
          <div class="button">
            <input type="button" value="我要抽獎"/>
          </div>
        </div>
        </div>`;
      } else if (prizename === 'NONE') {
        newBg.innerHTML = `
        <div class="none">
          <div class="prize">
            <div class="prize__desc">
              銘謝惠顧
            </div>
            <div class="button">
            <input type="button" value="我要抽獎"/>
            </div>
          </div>
          </div>`;
      } else {
        alert('系統不穩定，請再試一次');
      }
      document.querySelector('.button').addEventListener('click', () => {
        window.location.reload();
      });
    }
  };

  request.onerror = () => {
    console.log('error');
  };
  request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
  request.send();
});
