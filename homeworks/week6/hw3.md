## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

* 	` <bgsound /> ` ： 放入音樂
	
	src：音樂檔路徑
	
	loop：重播次數（ 若要一直重複播放，可使用 `infinite` ）
	
	```
	Example：
	
	<bgsound src="img/music.mp3" loop="5" />
	```
*  ` <cite> </cite> ` ：用於引經據典的文字
*  ` <time>  </time> `  ：用以表示時間，可以是 24 小時制或以公曆紀年的日期。

	```
	Example：
	
	<p>I have a date on <time datetime="2008-02-14 20:00">Valentines day</time>.</p>
	```



## 請問什麼是盒模型（box modal）

盒模型為將所有元素表示為一個方形盒子，可由 CSS 來設定大小、位置與屬性。而每個盒模型由 4 個部分組成，分為內容區域（ Content Area ）、內邊距區域（ Padding Area ）、邊框區域（ Border Area ）與外邊框區域（ Margin Area ）。


* **內容區域（ Content Area ）**

	內容區域容納元素的內容（ex. 文字、圖像等等），尺寸由內容決定，也可透過 `width`、`height` 設定。

* **內邊距區域（ Padding Area ）**

	根據內容區域延伸擴展背景，填補元素中內容與邊框的間距，可透過  `padding-top`、`padding-right`、`padding-bottom`、`padding-left`、`padding` 來設定控制。

* **邊框區域（ Border Area ）**

	根據內邊距區域延伸擴展，可透過 `border-width` 控制粗細。

* **外邊框區域（ Margin Area ）**

	根據邊框區域，用空白區域向外延伸擴展，用以分開相鄰的元素。可透過 `margin-top`、`margin-right`、`margin-bottom`、`margin-left` 設定控制。
	
* **box-sizing**

	當需要一個尺寸固定的區塊，但又需加外框等屬性時，不想讓區塊因此而加大，則可以使用 box-sizing 屬性來設定。
	
	* `box-sizing: content-box;`  此為預設屬性。
	* `box-sizing: border-box; ` 此屬性則會將 padding 考慮進來，自動內縮調整，就不須額外計算縮小調整。  

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
* **inline 行內元素**：

	元素可在同一行呈現，圖片或文字均不換行，也不會影響版面配置。
	
	元素寬高由內容撐開， `margin`、`padding` 無法套用，其他行元素不會被推開。

	```
	Example：
	<span>、<a>、<imput>、<img> 等等
	```
	
* **block 區塊元素**：

	元素寬度預設是最大寬度，可以設定長寬、`margin`、 `padding`，會佔滿整行。

	```
	Example：
	<div>、<h1>、<p>、<ul> 等等
	```

* **inline-block 行內區塊**：

	對外像 inline 可併排，對內像 block 可調各種屬性。可設定元素的寬高、`margin`、`padding` ，也可以水平排列。

	```
	Example：
	<button>、<input>、<select> 等等
	```

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* **static**：
	
	網頁預設排版方式，不會被特定定位在頁面上的位置，而是按照瀏覽器預設的配置自動排版在頁面上。

* **relative**：

	相對原位置距離。可在設定  `top`、`right`、`bottom`、 `left` 屬性，會讓元素相對於原位置調整移動，且不會影響其他元素的所在位置。
	
* **absolute**：

	絕對定位，針對上層非 static 的元素來定位。若上層無非 static 元素，則會以網頁所有內容（ `<body>` 元素）的左上角來定位。
	
* **fixed**：
	
	固定定位，元素會根據瀏覽器視窗來定位，即使頁面捲動也會固定在同個位置。可設定  `top`、`right`、`bottom`、 `left` 屬性來定位。


