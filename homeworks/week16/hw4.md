#hw4：What is this?
請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

##輸出答案：
2</br>2</br>undefined

##原因解釋：
this 的值跟作用域跟程式碼的位置在哪裡完全無關，只跟「如何呼叫」有關。</br>
可以將所有的 function，都轉成利用 call 的形式來看，而 call 的第一個參數就是 this ，因此可以知道 this 的值是什麼了。

```
obj.inner.hello() 	// obj.inner.hello.call(obj.inner)  => 2
obj2.hello() // obj2.hello.call(obj2) => 2
hello() // hello.call() => undefined
```

