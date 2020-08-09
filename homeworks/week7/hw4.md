## 什麼是 DOM？

DOM 為 Document Object Model 文件物件模型，將 HTML 文件內的各個標籤、文字、圖片等都定義成物件，物件會形成一個樹狀結構，有很多節點與階層關係。我們可透過 DOM 作為 HTML、瀏覽器和 Javascript 之間溝通的橋樑，


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞機制的順序為先捕獲，至點擊目標後再冒泡。且當事件傳到 target 本身，並沒有區分捕獲跟冒泡。

* 冒泡為當使用者觸發頁面中的定義好的事件後，由事件目標由內依序向外，過程中觸發個別元素的冒泡階段事件監聽。

* 捕獲為由使用者觸發事件後，瀏覽器會從根節點開始由外到內進行事件傳播，由 DOM 樹的最外層依序向內，觸發個別元素的捕獲階段事件監聽。

![ w3c 講 event flow](https://www.w3.org/TR/DOM-Level-3-Events/images/eventflow.svg)


## 什麼是 event delegation，為什麼我們需要它？

event delegation 為事件代理機制，利用 DOM 架構與捕獲冒泡機制，透過父節點來處理子節點的事件。

當有多個子節點時，若要新增、刪除或變動時，不需一個個掛置 listener 重複改動，因點擊子節點的事件都會傳到父節點上，僅須將 listener 掛在父節點上，就可以處理子節點的事件。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

` e.stopPropagation` 跟 ` e.preventDefault ` 的差別為 ` e.stopPropagation` 是取消事件繼續往下傳遞，而 ` e.preventDefault ` 為取消瀏覽器的預設行為，和事件傳遞無關。且只要使用 `preventDefault`，在之後傳遞下去的事件裡面也會有相同效果。

*  e.stopPropagation 範例：

```
HTML：
<div class = "outer">
  <div class = "inside">  
    <input class = "button" type="button" />
  </div>
</div>

Javascript：
ducument.querySelector('.outer').addEventListener( 'click' , function(e){
  console.log('outer')
  }
)

ducument.querySelector('.inside').addEventListener( 'click' , function(e){
  console.log('inside')
 }
)

ducument.querySelector('.button').addEventListener( 'click' , function(e){
  console.log('button')
 }
)
```

當點擊 button 時，會 console 出 button、inside、outer。因三個互相重疊，因此會同時觸發所有 click 事件。

但當在 button 加入 ` e.stopPropagation ` 時，如下：

```
Javascript：
ducument.querySelector('.outer').addEventListener( 'click' , function(e){
  console.log('outer')
  }
)

ducument.querySelector('.inside').addEventListener( 'click' , function(e){
  console.log('inside')
 }
)

ducument.querySelector('.button').addEventListener( 'click' , function(e){
  console.log('button')
  e.stopPropagation()
 }
)
```

當點擊 button 時，僅會 console 出 button，因 ` e.stopPropagation ` 阻止事件繼續冒泡，不再繼續傳遞。


* e.preventDefault 範例：

```
HTML：
<div class = "question">
  <input type = "text" placeholder="您的回答"/>
  <input class = "button" type= "submit"/>
</div>
```
當點擊 button 時，即會將填入的 value 送出。

然而當加入  e.preventDefault  時，如下：

```
Javascript：
ducument.querySelector('.question').addEventListener( 'submit' , function(e){
  e.preventDefault()
 }
)
```
當點擊 button 時，資料並不會送出，因 e.preventDefault 阻止原先的預設行為。