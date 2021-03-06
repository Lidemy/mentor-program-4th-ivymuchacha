## 請以自己的話解釋 API 是什麼
API 為給伺服器與使用者之間交換資料的介面。
使用者可以透過 API 串接伺服器的資料庫，讀取或使用伺服器開放的資料庫。而伺服器可以透過 API，將擁有的資料庫開放給使用者使用。

而 API 如同自動販賣機，僅提供販賣機機台上的品項，並按照該販賣機的指示操作。因此，伺服器可以選擇願意開放的資料供使用者串連，並也須提供 API 串連格式與使用方式，供使用者串連前閱讀，即可順利串連使用。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
**1. 206 Partial Content**

2 開頭的狀態碼表示伺服器成功接收到用戶端要求、理解用戶端要求、以及接受用戶端要求。206 為伺服器已經成功處理了部分 GET 請求。

**2. 403 Forbidden**

4 開頭狀態碼為用戶端錯誤。403 為伺服器已經理解用戶端請求，但是拒絕執行它。用戶端沒有權限存取此站，雖然伺服器收到請求，但拒絕提供服務。

**3. 410 Gone**

表示所請求的資源不再可用，已不存在，且為永久性的刪除。

**4. 418 I'm a teapot**

客戶端錯誤代碼表示如果有人想用茶壺來泡咖啡，你應該回個它一個 418 的狀態碼，我是個茶壺，你幹嘛拿我來泡咖啡？

<details>
<summary> 我是個茶壺！ </summary>
剛看到覺得很可愛，而且竟然還有後續移除風波，算是藏在 HTTP status code 的小彩蛋吧！
</details>
## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

* Base URL：[https://letuseat.com]()

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 回傳所有餐廳資料 | GET    | /bistro   | _limit:限制回傳資料數量           | /bistro?_limit=5 |
| 回傳單一餐廳資料 | GET    | /bistro/:id | 無                    | /bistro/5   |
| 新增餐廳   | POST   | /bistro     | name: 餐廳名稱 | 無              |
| 刪除餐廳   | DELETE   | /bistro /:id     | 無 | 無              |
| 更改餐廳  | PATCH   | /bistro[]() /:id     | name: 餐廳名稱 | 無              |