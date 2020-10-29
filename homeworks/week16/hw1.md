#hw1：Event Loop
在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

##輸出答案：
1<br/>3<br/>5<br/>2<br/>4

##原因解釋：
首先，開始跑第一行程式碼 ` console.log(1) `，`console.log(1)`即會在 call stack 上，輸出 1 後，完成及移除在 call stack 上的作業。

再來即進入第二行 ` setTimeout(() => {console.log(2)}, 0) `，此程式在 call stack 上作業，然而因為 `setTimeout()`，會呼叫瀏覽器設定計時器，等待 0 毫秒後，` ( ) => {console.log(2)} ` 移轉至 task queue 待 call stack 清空後即可處理。

進入第三行 `console.log(3)` 至 call stack 上，輸出 3 後，完成及移除在 call stack 上的作業。

進入第四行 `setTimeout(() => {console.log(4)}, 0) ` ，此程式在 call stack 上作業，然而因為 `setTimeout()`，會呼叫瀏覽器設定計時器，等待 0 毫秒後，` ( )  =>  {console.log(4)} ` 移轉至 task queue 待 call stack 清空後即可處理。

進入第五行 `console.log(5)` 至 call stack 上，輸出 3 後，完成及移除在 call stack 上的作業。

call stack 全數清空後，即可處理 task queue 上的工作，首先會是將原先第二行程式碼的 `() => {console.log(2)}` 透過 event loop 轉移至 call stack 上作業，輸出 2 後，完成及移除在 call stack 上的作業。

再來處理最後在 task queue 的工作，將原先第四行的 `() => {console.log(4)}` 透過 event loop 轉移至 call stack 上作業，輸出 4 後，完成及移除在 call stack 上的作業。