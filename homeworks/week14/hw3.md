## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

**什麼是 DNS？**

DNS 是 Domain Name System，指網域名稱系統。DNS 可將我們習慣使用的網域名稱，轉譯為電腦相互訊需要使用的 IP 位置。每當我們探訪網頁時，若該網頁未曾瀏覽過，電腦會發送查詢請求請 DNS 伺服器查看其記憶體是否儲存該網域與名稱。找到後， DNS 伺服器會將該網域名稱及 IP 位置回傳，電腦會將資訊存於記憶體內，在下次載入時可以更加快速。

**Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？**

* 效能：</br>
	Google 擁有幾十億使用者遍佈全世界，因此他們需要全方位管理技術棧以提供高效能的網頁，並吸引更多使用者使用他們的服務。因此提供自己的 DNS 以確保網頁是訪問的到且快速訪問的。

* 安全性：</br>
	DNS 已有數十年的歷史系統，多年來都存在一些漏洞，且容易遭受攻擊或導入錯誤惡意的網站。Google 的 DNS 提供保護與防禦措施，讓大眾使用上可以更有安全。

* 數據資料：</br>
	DNS 數據可以提供大量關於高流量網站與網路流量移動足跡的資訊。透過這些資訊，Google 可以評估網路的運行狀況，目前指標性的內容與使用者的使用狀況。


## 什麼是資料庫的 lock？為什麼我們需要 lock？

**什麼是資料庫的 lock？**

在多使用者的資料庫中進行資料操作時，將處理中的數據資料鎖定住，使其他會使用到該資料的需求無法進行，以避免受到資料干擾。鎖定(Locks) 是防止存取同一資料的使用者之間，不正確地修改資料。

**為什麼我們需要 lock？**

多筆資料同時讀取與寫入時，彼此會互相影響。例如， 雙 11 期間大量搶購發生時，可能同時收到多筆訂單需求，若未使用 Lock 來確保每次交易都是上一筆交易結束後才開始執行，容易發生超賣的狀況。</br>
然而，Lock 雖然可以防止超賣的情況，但因為一筆資料處理完成前，其他資料需求都是停滯等待的狀況，會有效能損耗的問題。

## NoSQL 跟 SQL 的差別在哪裡？
NoSQL 為 Not Only SQL 非關聯式資料庫。

1. 沒有 schema，可以想像成將 JSON 資料存進資料庫。沒有架構的並且建立在分散式系統上，這使得它易於擴充套件和分片，較為彈性。
2. 用 Key-value 鍵值資料庫的方式來存取資料（ 一欄是關鍵字 （Key)，一欄是值 (Value），作為查詢的資料結構 ）。
3. 不支援 JOIN 的查詢方式。
4. 通常用來存取結構不固定的資料。

NoSQL 資料存取類似如下：

```
db.inventory.insertMany([
   { item: "journal", qty: 25, status: "A", size: { h: 14, w: 21, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "notebook", qty: 50, status: "A", size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank" ] },
   { item: "paper", qty: 10, status: "D", size: { h: 8.5, w: 11, uom: "in" }, tags: [ "red", "blank", "plain" ] },
   { item: "planner", qty: 0, status: "D", size: { h: 22.85, w: 30, uom: "cm" }, tags: [ "blank", "red" ] },
   { item: "postcard", qty: 45, status: "A", size: { h: 10, w: 15.25, uom: "cm" }, tags: [ "blue" ] }
]);

// MongoDB adds an _id field with an ObjectId value if the field is not present in the document
```

> [資料參考](https://read01.com/GPnEx.html#.X2ipG5MzZYg)

## 資料庫的 ACID 是什麼？
1. 原子性 automicity：</br>
	全部失敗或全部成功，資料操作無部分完成的狀況。
2. 一致性 consistency：</br>
	維持資料的一致性（ 例如，A 轉 100 元給 B，則 Ｂ 會收到 100 元，兩邊金額總數相同 ）
3. 隔離性 isolation：</br>
	多筆資料操作時，不會互相影響，不能同時改同一個值。
4. 持久性 durability：</br>
	交易成功之後，寫入的資料不會不見，對資料庫的操作是永久的，不會丟失。