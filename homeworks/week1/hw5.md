## 請解釋後端與前端的差異。

### 前端
前端為使用者看得到的部分，為網頁的前台，接受使用者指令並呈現網頁內容。

### 後端
後端為使用者看不到的部分，處理使用者的指令並提供內容。



## 假設我今天去 Google 首頁搜尋框打上：JavaScri[t 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

1. 網頁瀏覽器會去問 DNS 伺服器 google.com 的 IP 位置
2. DNS 回傳 google.com IP 位置 （ 10.1.1.1 ）
3. 網頁瀏覽器傳送關鍵字 “ Javascri[t " 的 request 給 google.com IP 位置，要求存取資料與頁面
4. google. com 位置的主機 server 收到 “ Javascri[t " 的 request
5. sever 詢問資料庫，查詢搜尋的關鍵字 “ Javascri[t "
6. 資料庫找到後，會回傳 “ Javascri[t " 搜尋結果給 server 
7. server 再回傳 response 給瀏覽器
8. 瀏覽器解析回傳資訊並顯示出來 

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

* ` find path -name "filename" `：找檔名
* `whoami`：產生使用者名稱
* `reboot`：重新開機
* `df`：顯示硬碟使用量
* `head file`：顯示檔案內前十行內容
* `tail file`：顯示檔案內後十行內容