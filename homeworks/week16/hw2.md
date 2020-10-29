#hw2：Event Loop + Scope
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```
##輸出答案：
i: 0<br/>i: 1<br/>i: 2<br/>i: 3<br/>i: 4<br/>5<br/>5<br/>5<br/>5<br/>5

##原因解釋：
在瀏覽器的上會使用 WebAPI， 在 Node.js 上會是 C++API。以下都假設以瀏覽器作業。

`main() `進入 call stack 中，迴圈再堆疊至 call stack 上。

**進入第一個迴圈 :<br/>**
i = 0 且 i 小於 5，符合迴圈條件後進入迴圈內容，`console.log('i: ' + i)` 堆疊至 call stack 上，輸出 i: 0 後，完成及移除此作業。</br>
進入 `setTimeout(() => { console.log(i) }, i * 1000)`，因爲 `setTimeout()`，會呼叫瀏覽器設定計時器，待 0 毫秒後 `() => { console.log(i) } ` 再轉移至 task queue，待 call stack 內為空即可處理。</br>
完成第一個迴圈，i 再加一，此時 i = 1。

**進入第二個迴圈：:<br/>**
i = 1 且 i 小於 5，符合迴圈條件後進入迴圈內容，`console.log('i: ' + i)` 堆疊至 call stack 上，輸出 i: 1 後，完成及移除此作業。</br>
進入 `setTimeout(() => { console.log(i) }, i * 1000)`，因爲 `setTimeout()`，會呼叫瀏覽器設定計時器，待 1000 毫秒後 `() => { console.log(i) } ` 再轉移至 task queue，待 call stack 內為空即可處理。</br>
完成第二個迴圈，i 再加一，此時 i = 2。

**進入第三個迴圈：:<br/>**
i = 2 且 i 小於 5，符合迴圈條件後進入迴圈內容，`console.log('i: ' + i)` 堆疊至 call stack 上，輸出 i: 2 後，完成及移除此作業。</br>
進入 `setTimeout(() => { console.log(i) }, i * 1000)`，因爲 `setTimeout()`，會呼叫瀏覽器設定計時器，待 2000 毫秒後 `() => { console.log(i) } ` 再轉移至 task queue，待 call stack 內為空即可處理。</br>
完成第三個迴圈，i 再加一，此時 i = 3。

**進入第四個迴圈：:<br/>**
i = 3 且 i 小於 5，符合迴圈條件後進入迴圈內容，`console.log('i: ' + i)` 堆疊至 call stack 上，輸出 i: 3 後，完成及移除此作業。</br>
進入 `setTimeout(() => { console.log(i) }, i * 1000)`，因爲 `setTimeout()`，會呼叫瀏覽器設定計時器，待 3000 毫秒後 `() => { console.log(i) } ` 再轉移至 task queue，待 call stack 內為空即可處理。</br>
完成第四個迴圈，i 再加一，此時 i = 4。

**進入第五個迴圈：:<br/>**
i = 4 且 i 小於 5，符合迴圈條件後進入迴圈內容，`console.log('i: ' + i)` 堆疊至 call stack 上，輸出 i: 4 後，完成及移除此作業。</br>
進入 `setTimeout(() => { console.log(i) }, i * 1000)`，因爲 `setTimeout()`，會呼叫瀏覽器設定計時器，待 4000 毫秒後 `() => { console.log(i) } ` 再轉移至 task queue，待 call stack 內為空即可處理。</br>
完成第五個迴圈，i 再加一，此時 i = 5。

**進入第六個迴圈：<br/>**
i = 5 並非小於 5，不符合迴圈條件後跳出迴圈，移除 call stack 此作業，並移除 `main()`。

**Call Stack 上的作業清空後，即可處理 task queue 上的作業（ 此時 task queue 裡頭有五個待處理的作業 ）。<br/>**
透過 Event Loop 將 task queue 上的作業轉移至 call stack 上處理。`() => { console.log(i) } ` 即移轉至 call stack 上作業，因 var 是以 function 為作用域，因此 i 為 5 ，輸出 5 後，完成及移除此作業。重複處理至 task queue 內為空的，即全數完成。