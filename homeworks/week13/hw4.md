## Webpack 是做什麼用的？可以不用它嗎？

Webpack 為模組打包器，將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，讓瀏覽起可以解讀。

當大型專案時，前端會需要引用許多預處理工具（ ex. SASS、Babel ）及框架（ ex. Vue、React ），然而原模組無法在瀏覽器解讀使用，僅能在 node.js 上使用，因此需要透過 Webpack 編譯轉換後，即可在瀏覽器上使用，

## gulp 跟 webpack 有什麼不一樣？

Gulp 為 Task Manager 管理各種功能任務，為自動化和優化前端工作流程，使用 Gulp 並搭配需要的功能 plugins，即可自動化你開發工作中機械重複任務（ ex. 壓縮、編譯、測試等等），以提升效率。Gulp 本身不包括模組化功能，且 Gulp 可支援的 Task 項目多於 Webpack。

Webpack 是 bundler，是前端資源（ ex. Javascript、SCSS、image ）模組化管理和打包工具。將所有資源視為模組，必須藉由各種資源的loader 處理轉換並打包。雖然 WebPack 可以處理類似 gulp 的文件壓縮合併、預處理等功能，但那些都只是 webpack 的附帶的功能，Webpack 重點為模組化開發。

![參考資料](https://imgur.com/p1FgbBT.png)

>  [參考資料一](https://www.itread01.com/content/1548820829.html)
> 
> [參考資料二](https://blog.csdn.net/weixin_42881768/article/details/105025095)

## CSS Selector 權重的計算方式為何？

### 基本權重計算：inline style > ID > Class > Element >  *

#### * 全站預設值
權重計算為 0-0-0-0，所以只要權重超過就可以覆蓋過它的預設。

####Element
權重計算為 0-0-0-1。

```
Element 包含：
div, p, ul, ol, li, em, header, footer, article....
```

####Class
class 在 html 上面會寫成 class="box" ，在 css 內長這樣 .box ，前方會有一個點'.'

Class 的權重計算為 0-0-1-0。

```
html：
<div class="box"></div>

css：
.box { 
 }
```

####id

id 的權重計算為0-1-0-0。

```
html：
<div id="box"></div>

css：
#box { 
 }
```

####inline style attribute
inline style attribute 為寫在 html 行內的 style，權重計算為 1-0-0-0 。

```
<div style="color:red">
    CSS Specificity
</div>
```

####psuedo-class(偽類)
權重計算為 0-0-1-0 。
```
Example：
:nth-child() 、 :link 、 :hover 、 :focus 
:only-of-type 、 :nth-of-type

```

####attribute（屬性選擇器）
權重計算為 0-0-1-0 。

```
Example：
[type:checkbox]、[attr]
```

####!important
!important 的權重非常高，可以蓋過所有的權重

```
用法：
.product {
    width: 200px;!important
}
```


