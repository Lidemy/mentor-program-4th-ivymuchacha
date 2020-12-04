## 為什麼我們需要 Redux？
當專案越來越複雜，功能變得越來越多的時候，前端會需要處理更多資料與狀態，且這些資料也會在不同的頁面或元件中共用。

因此每當修改資料的時候，需要確保其他相關的資料同步更新，以避免造成畫面不一致的狀況。然而因為多個功能都可能會影響同一份資料變動，如果出錯的時候，較難去確認是哪個功能造成錯誤，因此需要透過 Redux，統一資料的變動。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？
### Redux 是什麼？
Redux 是全域的狀態管理物件，用來集中式的管理資料，而透過 State、Action、Reducer 來管理。

### Redux 的各個元件
**State**

用來儲存整個應用程式的資料，由一個單一的 Object Tree 構成，以遵循 Single Source of Truth 原則。（ 透過 store.getState() 來取得 State。）

**Action**

要改變 State 唯一的方式就是指派一個 Action，而 Action 本身就只是一個 Object，但 Action 不會直接修改 State，而是交由 Reducer 來處理。（ 透過 store.dispatch() 來指派 Action。）

**Reducer**

Reducer 是一個 Pure Function，能夠透過當前的 State 和被指派的 Action 來回傳一個新的 State。

### Redux 資料流
![Redux 資料流](https://imgur.com/bbXvJO7.png)

1. 在頁面 UI 上按下按鈕後，即會發送事件。
2. 事件會進入 Event Handler，Dispatch 出一個 Action 指令。
3. Action 即會進入儲存資料的 Store 內，經由 Reducer 將現在的 State 和新進的 Action 結合，產生新的 State。
4. 產生新的 State 後則會連動改變 UI。

## 該怎麼把 React 跟 Redux 串起來？
可以透過 React-Redux 套件來整合 React 和 Redux。
### connnect()
我們可以透過 `connnect()` 來產生 container component，它會使用 store.subscribe() 來監測 state，並且提供 props 傳給子元件，並會接收以下兩個參數 
mapStateToProps 與 mapDispatchToProps。

**mapStateToProps**

mapStateToProps 為偵測 Redux store 的變動與更新。會回傳部分 state 的 function，為 container component 要傳給其他子元件的 props。

```
const mapStateToProps = (store) => {
  return {
    todos: store.todoState.todos,
  };
};
```

**mapDispatchToProps**

mapDispatchToProps 會回傳 action creator 的 function，讓 container component可以 dispatch 的 actions 都需要傳入，並且綁定dispatch，讓接收到 props 的 component 可以直接呼叫這些 function。

```
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo:(payload) => dispatch(addTodo(payload))
  }
}
```

最後透過 `connect()` 將參數傳入串連 React 與 Redux。

```
export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);
```
