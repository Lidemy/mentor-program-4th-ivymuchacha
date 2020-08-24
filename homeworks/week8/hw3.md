## 什麼是 Ajax？

AJAX 是 Asynchronous JavaScript and XML，非同步的 JavaScript 與 XML 技術，使網頁不需重新整理、不需重新讀取整個頁面，就能即時地透過瀏覽器去跟伺服器溝通，撈出資料。

## 用 Ajax 與我們用表單送出資料的差別在哪？

表單送出資料，一般會使頁面跳轉，而 Ajax 則可以再不重新整理頁面的狀態下，執行發出資料需求操作，只刷新頁面局部，不影響頁面其他內容。

表單再回傳結果時，會透過瀏覽器換頁並直接顯示結果。而 Ajax 再回傳結果時，會將結果送至瀏覽器，瀏覽器將結果提供給 Javascript，不會換頁。

## JSONP 是什麼？

JSONP 為 JSON with Padding，可以將網頁從別的網域要求資料。
因同源政策的關係，不同網域的網頁無法互相溝通，然而 HTML 的 `<script> `不在此限制，因此可以透過 `<script>`得到其他來源產生的 JSON 資料。而由 JSONP 抓取的資料並非 JSON，而是 Javascript。

## 要如何存取跨網域的 API？

跨網域存取 API 可透過 JSONP，利用 ` <script> ` 或是其他不受同源政策限制的標籤（ex. `<img>`）來交換資料。此外，若 Server 在 Response 的 Header 中設置 `Access-Control-Allow-Origin : *` ，即允許跨網域存取，就可以跨網域存取 API。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週（觀看 JS102 影片的時候）卻碰到了？

因第四週時，是直接透過 node.js 發 Request 交換資料，而本週是透過瀏覽器去發 Request 交換資料，而瀏覽器考慮到安全性，受同源政策限制，因此有跨網域無法交換資料的狀況。
