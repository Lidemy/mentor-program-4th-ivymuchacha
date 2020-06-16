## 教你朋友 CLI

### 什麼是 CLI
CLI 就是 Command Line Interface，是一種操縱電腦的方式。主要透過純文字，來給電腦下指令。

### 指令教學
* `pwd`：Print Working Directory  印出所在位置
* `ls`：LiSt  印出所在位置內的所有檔案
* `cd`：Change Directory 切換資料夾
	* `cd ..`：回到上一層資料夾
*  `man`：MANual  說明指令的使用方式與可用參數
*  `touch`：若檔案不存在則建立檔案，若檔案存在則更改檔案最後修改時間
*  `rm`：ReMove  刪除檔案
*  `rmdir`：刪除資料夾
*  `mkdir`：MaKe DIRectory  建立資料夾
*  `mv`：MoVe  移動檔案或改名稱 
	*  若路徑內資料夾可偵測則移動檔案：`mv +  檔案名稱 + 資料夾`  
	*  若路徑內資料夾不可偵測則更改檔案名稱：`mv +  檔案名稱 + 新檔案名稱`
*  `cp`：CoPy 複製檔案
	*  `cpdir`或`cp -r `：複製資料夾
*  `vim`：文字編輯器，需要按	`i`進入輸入文字模式，`esc` 一般編輯模式。
	* `:q` 離開文字編輯器
*  `cat`：連結檔案和看檔案內容
*   `less`：分頁式印出檔案
*  `grep + 搜尋問字 + 檔案名稱`：指定檔案內抓取關鍵字
*  `wget`：下載檔案或原始碼
*  `curl`：送出 request
*  `>`：重新導向輸出或輸入，會將檔案內容全部覆蓋
*  `>>` ：新增檔案內容
*  `｜`：pipe 串接指令，將左邊指令輸出變成右邊指令輸入
*  `date`：印出現在時間
*  `top`：Table Of Processes 印出所有 process
*  `echo`：印出字串


### h0w 哥求解：我想用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。
1. 打開 terminal 
2. `mkdir wifi`：建立 wifi 資料夾
3. `touch afu.js`：建立 afu.js 檔案