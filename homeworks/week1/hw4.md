## 跟你朋友介紹 Git

### git 簡介
git 為協助版本控制的工具。在個人或團體作業時，相同檔案會有不同版本，我們希望將每個版本都保存下來，則可以透過 git 控制與紀錄各種版本。

### git 指令介紹

* `git init`：建立 git 到需要追蹤紀錄的路徑
* `git status`：查詢 git 狀態
* `git add`：在想要追蹤的檔案加入版本控制
	* `git add .` ：追蹤資料夾內所有檔案
* `git commit `
：建立新版本
	* `git commit -m + "版本敘述"`
（m 代表 message）
	* `git commit -am + "版本敘述"` ： 合併 `git add . `和  `git commit -m " " ` 兩個動作（但若有新增檔案，則不會直接加入，需要額外操作 `git add` ） 
* `git log` ：查看歷史紀錄
	* `git log —oneline `：顯示簡短的歷史紀錄
* `git checkout`：回到某個版本
	* `git checkout master`：回到最新狀態
* `.gitignore` ：需要忽略的檔案（可以將系統檔案、暫存檔、記錄檔 和專案無關的檔案放在裡頭 ）
* `git diff` ：查看檔案的差異
* `git commit —amend` ：更改 commit message
* `git reset HEAD^`：commit 後卻不想 commit
	* ` —hard`：剛剛的改變完全不需要
	* ` —soft`：保持改變，只是重新調整後再commit
* `git checkout — 檔案`：還沒 commit 但想回到還沒處理的狀態
* `git hook`：發生某事的時候通知我
* `git checkout -b + branch-name`：新建 branch 並切換過去

### 流程紀錄

1. `git init`：讓資料夾可以被 git 控制
2. 建立 `.gitignore` 忽略不要的檔案，可以想像成這檔案會被排除在資料夾外
3. `git add . `：把所有檔案加進去版本控制
4. 	`git commit -am " "`： 建立第一個commit 

專案建立後

1.  新增檔案後記得把檔案加入版本控制內
> `git add .` 或 `git add 檔案名稱`

2. 更改現有檔案，則記得 `git commit -am "   "`

### Branch 簡介
Branch 為 “ 分支 ” ，在團體開發時可以平行開發，各自開發完成後再合併。

### Branch 指令介紹
* `git branch -v`：查看現在有哪些 branch
* `git branch + branch-name`：建立新的 branch 
* `git branch -d branch-name`： 刪除 branch
* `git checkout branch-name`：切換 branch
* `git merge  branch-name` ： 把 branch-name 合併進來
* `git push` ： 把本地最新狀態同步推上 github
* `git pull`：把 github 最新變動拉下至本地
* `git clone`：複製 respository
* `git branch -m new-branch-name`：改 branch 名稱