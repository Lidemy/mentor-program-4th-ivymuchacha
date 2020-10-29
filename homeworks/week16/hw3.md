#hw3：Hoisting
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

##輸出答案：
undefined</br>5</br>6</br>20</br>1</br>10</br>100

##原因解釋：
Javascript 作業一開始會有 Global Execution Context，每進入一個 Function 就會進入一個新的 Execution Context。最上方為現在正在執行的，執行完會清空。而每個 Execution Context 裡面會有 Variable Object 或 Activation Object，裡頭宣告的變數與 Function 都會存放於內。</br>
此程式碼開始作業時，會有 Global Execution Context（簡稱 Global EC），宣告的變數與 Function 會在裡頭的 Variable Object （簡稱 VO）或 Activation Object （簡稱 AO）存放。
（ Global EC 內為 VO，在 Function EC 內為 AO )

第一次會先處理宣告，在處理賦值。第一層 global 的部分有宣告 `var a` 與 `function fn()`。</br>

```
global EC
global VO { 
	a：undefined
	fn：function
}
```
再來才會處理賦值。

```
global EC
global VO { 
	a：1 //var a = 1
	fn：function
}
```

因 `fn()`，會執行 fn 的函式，因此會進入 fn EC，處理宣告。

```
fn EC
fn AO {
	a : undefined
	fn2：function
}

global EC
global VO { 
	a：1 
	fn：function
}
```
因此在執行 fn 函式時，第一個 `console.log(a)` 輸出為 undefined。

```
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
```
執行函式第二行 ` var a = 5 ` ，即可賦值變數 a 為 5。

```
fn EC
fn AO {
	a : 5
	fn2：function
}

global EC
global VO { 
	a：1 
	fn：function
}
```
在執行 fn 函式時，第三行 `console.log(a)` 輸出為 5。

```
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
```
執行函式第四行 ` a++ ` ，即變數 a 為 6。 第五行 `var a` ，因為 a 已宣告過，因此沒有改變 AO 內容。 

```
fn EC
fn AO {
	a : 6
	fn2：function
}

global EC
global VO { 
	a：1 
	fn：function
}
```
執行第六行 `fn2()`，會執行 fn2 的函式，因此會進入 fn2 EC，處理宣告。因 fn2 無任何變數與函式宣告，因此 AO 內為空的。

```
fn2 EC
fn2 AO {

}

fn EC
fn AO {
	a : 6
	fn2：function
}

global EC
global VO { 
	a：1 
	fn：function
}
```

執行 fn2 第一行 `console.log(a)` ，因 fn2 EC 內無變數 a ，則往上一層 fn EC 找，則輸出 6。

```
fn2 EC
fn2 AO {
	// 無宣告 a，往上一層找。
}

fn EC
fn AO {
	a : 6  // 有 a = 6
	fn2：function
}

global EC
global VO { 
	a：1 
	fn：function
}
```
```
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
```

執行 fn2 第二行賦值  `a = 20`  ，因 fn2 EC 內無變數 a ，則往上一層 fn EC 找，賦值  `a = 20`。</br>
執行 fn2 第二行賦值  `b = 100`  ，因 fn2 EC 內無變數 b ，則往上一層 fn EC 找，無變數 b，再往上一層 global EC 找，無變數 b，則將此 `b = 100`，放置於 global EC 內。

```
fn2 EC
fn2 AO {
	// 無宣告 a，往上一層找。
	// 無宣告 b，往上一層找。
}

fn EC
fn AO {
	a : 20  // 有 a = 20
	fn2：function
	// 無宣告 b，往上一層找。
}

global EC
global VO { 
	a：1 
	b：100 // 無宣告 b，則將 b 存放於此。
	fn：function
}
```
fn2 執行結束，清空 fn2 EC。執行 fn 函式第七行， ` console.log(a)` ，此時 fn EC 內 a = 20，則輸出 20。

```
fn EC
fn AO {
	a : 20  // 有 a = 20
	fn2：function
	// 無宣告 b，往上一層找。
}

global EC
global VO { 
	a：1 
	b：100 // 無宣告 b，則將 b 存放於此。
	fn：function
}
```
```
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
```

fn 執行結束，清空 fn EC。執行 `fn()` 後程式碼 ` console.log(a)` ，此時 global EC 內 a = 1，則輸出 1。

```
global EC
global VO { 
	a：1 
	b：100 // 無宣告 b，則將 b 存放於此。
	fn：function
}
```
```
var a = 1
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a)
console.log(b)
```

執行 a = 10 ，改變 global EC 內， global VO 內的 a 值為 10。</br>
再來執行 `console.log(a)` 與 `console.log(b)`， global VO 內的 a 值為 10， b 值為 100 ，則個別輸出。

```
global EC
global VO { 
	a：10
	b：100 // 無宣告 b，則將 b 存放於此。
	fn：function
}
```
```
var a = 1
function fn() {
  console.log(a)  //undefined
  var a = 5
  console.log(a)  // 5
  a++
  var a
  fn2()
  console.log(a) // 20
  function fn2(){
    console.log(a) // 6
    a = 20
    b = 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a)	//10
console.log(b)	//100
```

執行完成後清空 global EC，結束。