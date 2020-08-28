## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

* VARCHAR 可調整長度，且可以設置最大長度，區間為 1 至 65,535 之間；適合用在長度可變的屬性，且儲存大小為輸入資料的位元組的實際長度。

* TEXT 不設置長度，不能有默認值，當不知道屬性的最大長度時，適合用 TEXT，最大固定長度為 65,535 個字符。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

1. 因 HTTP 協定為 Stateless 無狀態性，Server 不會紀錄用戶先前的行為。而 Cookie 則是 Server 透過瀏覽器暫存用戶狀態的文本資訊，而 Server 可以設定或讀取 Cookie 中包含資訊，藉此維護用戶跟 Server 互動中的狀態。

2. 當收到 HTTP Request 時，Server 會傳送 Set-Cookie 的 Response Header 讓瀏覽器設置 Cookie，瀏覽器會將 Cookie 暫存於瀏覽器內。

3. 當再次瀏覽網頁，再次發出 HTTP Request 至 Server 時，瀏覽器會自動比對符合條件的 Cookie（未過期且符合 Domain ），符合的 Cookie 會帶入至 HTTP Request Header 中。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. password 赤裸的存放在 Database 內，如果有人成功駭入，很容易取到 password，可能登入該 username 在其他平台的帳戶。（ 大家很喜歡用同個 username 和 password 在不同平台，因為很難記住每一個帳戶密碼 ）

2. 在輸入內容的區塊內，如果輸入程式語言會有效果，有心人士甚至可以透過內容區塊提取 Database 資料，或是刻意導入至釣魚網站。

```
ex. 
1. 輸入 <h1> Hello </h1>，即顯示出標題效果的 Hello。

2. 輸入 '),('iambadguy',(SELECT password FROM users WHERE id=10))# ，即可顯示出 id 為 9 的密碼資訊。

```
