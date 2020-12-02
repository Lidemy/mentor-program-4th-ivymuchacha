## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState
```
const [state, setState] = useState(initialState);
```
在 React 中，因資料的變動會影響畫面的渲染，因此將資料視為 State （狀態）。而 React 透過 `useState` 來監控與改變資料狀態。
`useState` 會回傳一個 state 的值，以及更新 state 的 function。

**對於較複雜的運算，建議將初始值寫入 useState function 內，因僅會執行一次，不會有效能上的浪費。**

### useEffect

傳遞給 useEffect 的 function 會在 layout 和 render 之後觸發，並會在每一次畫面有更動的時候執行。

```
useEffect(()=> {
	alert('render完畢！')
})
```

若只想指定在某個狀態改變的時候再執行，則將指定的狀態帶入第二個參數。

```
function writeTodosToLocalStorage(todos) {
	window.localStorage.setItem('todos', JSON.stringify(todos))
}

// 每次 render 完都將最新的值寫入 todos
useEffect(()=> {
	writeTodosToLocalStorage(todos)
}, [todos])  // 指定為當 todos 有改變時，再重新執行 useEffect

```
若想要第一次 render 後執行 Effect，後方則可帶入空陣列。因空陣列內部為空，因此不會改變。可用於初始化（ex. API 拿取資料時使用，即可不需每次 render 都要重新領取資料）。

```
useEffect(() => {
	const todoData = window.localStorage.getItem('todos') || ""
	if (todoData) {
		setTodos(JSON.parse(todoData));
	}
}, [])
```

`useEffect()` 可以回傳另一個函式，這個函式作為清理函式，會在組件被移除的時候，以及每次 useEffect 再度被執行之前被執行。

### useLayoutEffect
`useLayoutEffect()` 類似於 `useEffect()` ，為 render 完，瀏覽器繪製以前會做的事情。

```
useLayoutEffect(() => {
	const todoData = window.localStorage.getItem('todos') || ""
	if(todoData) {
		setTodos(JSON.parse(todoData));
	}
}, [])
```

因使用 `useEffect()` 時，若原先 state 內已有預設資料，則每次重新整理時，畫面都會有跳閃的樣式（會先顯示原先 state 內容，再顯示 `useEffect()` 的內容）。為了解決上述問題，可使用 `useLayoutEffect()` 避免此情況。

### useContext
React 上層和下層溝通需要傳遞參數，而當有多層 Component，在傳遞參數時，需一層傳一層，才能找到指定的地方，造成 props drilling 的現象。 為了改善此狀況，可使用 `useContext()` 取值，不用透過 render props 來得到 value 內容了。

```
import React , {useState, useContext, createContext} from 'react';

const TitleContext = createContext(); // 使用 useContext

function DemoInnerBoxContent(){
  const setTitle = useContext(TitleContext) // 將 setTitle 從 useContext 內取出
  return (
    <div>
      <button onClick ={()=> {
        setTitle(Math.random())
      }}>Update Title!</button>
    </div>
  )
}

function DemoInnerBox() {
  return <DemoInnerBoxContent />;
}

function DemoInner() {
  return <DemoInnerBox />;
}

export default function Demo() {
  const [title, setTitle] = useState("I am title!");
  return ( 
  // 將需要傳遞的 Component 包住， value 內放需要傳遞的值
    <TitleContext.Provider value={setTitle}>
      <div>
        title: {title}
        <DemoInner />
      </div>
    </TitleContext.Provider>
  )
}
```

### useReducer

```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

useReducer 會回傳兩個數值，第一個就是 state，第二個就是對應 reducer 的 dispatch function。
state 會隨著 Reducer 會傳的 state 做改變，dispatch 是用來和 Reducer 溝通的 Function 。


```

function counterReducer(state, action) {
  switch (action.type) {
  	// 規範 action
    case "INCREMENT":
      return { counter: state.counter + 1 };
    default:
      return { counter: 0 };
  }
}

function App(props) {
  const [state, dispatch] = useReducer(counterReducer, { counter: 10 });
  return (
  	// 	點擊時，dispatch action
    <h1 onClick={() => dispatch({ type: "INCREMENT" })}>
      Hello, {props.name}
      {state.counter} times
    </h1>
  );
}
```

適合用在複雜邏輯，尤其當你有多層複雜結構的狀態資料，或者每次的 state 轉換都依賴前一個 state 的時候。當狀態更新要穿過多層組件的時候也很方便，因為你可以直接往下傳 dispatch 而不是自組的 callback。

### useMemo

`useMemo( )` 為偵測資料改變，決定需不需 re-render，避免一些不必要的複雜計算而使用。

```
const s = useMemo(()=>{
    return value ? redStyle: blueStyle
  },[value])   // value 改變時會重新計算，而其他功能變動時不會 re-render
```

### useCallback
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
與 `useMemo()` 類似。`useCallback ()` 使 React 在元件重新渲染時，如果 dependencies array 中的值在沒有被修改的情況下，它會幫我們記住 Object，防止 Object 被重新分配記憶體位址，以避免父元件重新渲染後，Object 被重新分配記憶體位址，造成 React.memo 的 shallowly compare 發現傳遞的 Object 記憶體位址不同。


### useRef
```
const refContainer = useRef(initialValue);
```
`useRef()` 存放可變的值，跟使用 useState 的改變值區別在於，它不會導致 component re-render。
useRef 回傳一個可變的 ref object，而 .current 的屬性被初始為傳入的參數（initialValue）。


### useImperativeHandle
`useImperativeHandle()` hook 在使用 ref 屬性時，可以向父 component 暴露自定義的 instance 的值。useImperativeHandle 應與 forwardRef 一同使用。（ forwardRef 用來建立一個新的 React component 並將 ref 屬性轉交到底下的另外一個 component。）

[參考資料](https://ithelp.ithome.com.tw/articles/10253073)

### useDebugValue
```
useDebugValue(value)
```
用在 custom hooks 裡面，類似 `console.log()`，會在 React DevTool 裡面顯示 custom hook 的名稱與 debug 的值。

[參考資料](https://medium.com/@scars.yao/react-hooks-%E7%AD%86%E8%A8%98-9f9d99c0b72e#d441)



## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![class component lifecycle](https://imgur.com/2AVKUHe.png)

1. 首先，Component 會 Call Constructor 來建立 Component。
2. 再來，Call Render Function 去 Render 第一次的畫面。
3. React 處理 DOM 上的操作。
4. Call componentDidMount 表示已將 Component 放在畫面上，已於 DOM 裡頭，可開始對 DOM 操作（ex. 初始化）。
5. 若有 new State 或 new Props 則會進入 Update 的階段， Call Render 更新畫面。
6. React 處理 new State 或 new Props 的變動如何實際改變到 DOM 上。
7. Call componentDidUpdate 表示已更新完成後，需要做什麼操作。
8. 最後當要移除 Component 時，則會 Call componentWillUnMount，處理在移除前要做的操作。

### constructor 
constructor 是在 Component 被建立時，會執行的 Function 。

```
class App extends Component {
	constructor(props){
		super(props)

	}
}
```

### shouldComponentUpdate

依照 Component 是否有變，來決定是否需要 render。為改變 state 後，render 以前做的事情。

**change state → shouldComponentUpdate → render**

```
// 未寫內容時，預設回傳 true
shouldComponentUpdate(nextProps, nextState) { 
	return true
}
```

### componentDidMount 與 componentWillUnmount

**componentDidMount** </br>
Component render 完後，放到 DOM 上面為 Mount。適合處理初始化相關的事件。

**componentWillUnmount** </br>
處理 Component 被 Unmount 以前做的事情。清楚垃圾、Timer 或不會用到的值。

```
componentDidMount(){
    this.timer = setTimeout(()=> {
      this.setState({
        title:'ya!'
      })
    }, 2000)
  }

	// 如果倒數計時還未到時，按下 Toggle 來移除物件，會發生錯誤。（因試圖操作一個已被摧毀的物件）
  	// 因此需要 componentWillUnmount 來處理被移除前的動作
	componentWillUnmount(){
    clearTimeout(this.timer);
  }

```

### componentDidUpdate

componentDidUpdate 為 Props 或 State 更新後要處理的事情。

```
componentDidUpdate(prevProps, prevState) {

}
```

## 請問 class component 與 function component 的差別是什麼？

Class component 可透過 this.props.value 拿到最新的屬性，而 Function component 是每一次 render，都是「重新」呼叫一次 function，而傳入的 props 為當時的 props，而不會受到 props 改變而改變。

Class component 思考模式會以 lifecycle 去思考，考慮到 Mount 、 Update 各種階段的處理。但 hook 的重點會放在「每一次 render」為主，每一次 render 都會把整個 function 重新執行一遍。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

**controlled component**  </br>
是 React 控制的組件，透過 Props 來傳遞參數，透過 State 來維持自身的狀態，並只能以 `setState` 來更新。透過 onChange 、event handler 等函式來偵測改變。

```
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todotext:''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      todotext: e.target.value
    })
  }

  render(){
    const { todotext } = this.state 
    return(
      <input type="text" value={todotext} onChange={this.handleChange}/>
    )
  }
}

export default App;
```

**uncontrolled component**  </br>
是資料數據由 DOM 本身處理，而不是 React 組件。通常會使用 `ref` 來從 DOM 取得表單的資料。

```
class App extends Component {
  constructor(props){
    super(props)
    this.input = React.createRef();
  }

  render(){
    const { todotext } = this.state 
    return(
      <input type="text" ref={this.input} /> 
     // 透過 this.input.current.value 來取值
    )
  }
}

export default App;
```