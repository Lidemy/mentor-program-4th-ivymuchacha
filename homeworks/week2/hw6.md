``` js
function isValid(arr) {
  for(var i=0; i<arr.length; i++) {
    if (arr[i] <= 0) return 'invalid'
  }
  for(var i=2; i<arr.length; i++) {
    if (arr[i] !== arr[i-1] + arr[i-2]) return 'invalid'
  }
  return 'valid'
}

isValid([3, 5, 8, 13, 22, 35])
```

## 執行流程
1. 將陣列 [3, 5, 8, 13, 22, 35]，執行 isValid 函數
2. 執行第 2 行，設定變數 i 是 0，檢查 i 是否小於陣列內元素數量 6。是，開始進入第一圈迴圈。
3.   執行第 3 行，判斷 arr 陣列中第 i 個元素是否小於 0，是，則回傳 ' invalid ' 並結束 function 。否，則繼續執行。
4.  變數 i 為 0， 陣列第 i 個元素為 3，判斷是否小於 0。否，繼續執行，進入第二圈迴圈。
5.  回到第 2 行， i++ 是 1，檢查 i 是否小於陣列內元素數量 6。是，繼續執行。
6.  變數 i 為 1， 陣列第 i 個元素為 5，判斷是否小於 0。否，繼續執行，進入第三圈迴圈。
7. 回到第 2 行， i++ 是 2，檢查 i 是否小於陣列內元素數量 6。是，繼續執行。
8. 變數 i 為 2， 陣列第 i 個元素為 8，判斷是否小於 0。否，繼續執行，進入第四圈迴圈。
9. 回到第 2 行， i++ 是 3，檢查 i 是否小於陣列內元素數量 6。是，繼續執行。 
10. 變數 i 為 3， 陣列第 i 個元素為 13，判斷是否小於 0。否，繼續執行，進入第五圈迴圈。
11. 回到第 2 行， i++ 是 4，檢查 i 是否小於陣列內元素數量 6。是，繼續執行。
12. 變數 i 為 4， 陣列第 i 個元素為 22，判斷是否小於 0。否，繼續執行，進入第六圈迴圈。
13. 回到第 2 行， i++ 是 5，檢查 i 是否小於陣列內元素數量 6。是，繼續執行。
14. 變數 i 為 5， 陣列第 i 個元素為 35，判斷是否小於 0。否，繼續執行，進入第七圈迴圈。
15. 回到第 2 行， i++ 是 6，檢查 i 是否小於陣列內元素數量 6。否，跳出迴圈。
16. 執行第 5 行，設定變數 i 是 2，檢查 i 是否小於陣列內元素數量 6。是，開始進入第一圈迴圈。
17. 進入第 6 行，判斷 arr 陣列中第 i 個元素是否非 第 i-1 個元素與第 i-2 個元素的總和。是，則回傳 ' invalid ' 並結束 function 。否，則繼續執行。
18.  變數 i 為 2 ，判斷陣列中第 i 個元素為 8 是否非 第 i-1 個元素為 5 與第 i-2 個數字 3 的總和為 8。否，則繼續執行，進入第二個迴圈。
19. 回到第 5 行，i++ 是 3，檢查 i 是否小於陣列內元素數量 6，是，繼續執行。
20. 變數 i 為 3 ，判斷陣列中第 i 個元素為 13 是否非 第 i-1 個元素為 8 與第 i-2 個數字 5 的總和為 13。否，則繼續執行，進入第三個迴圈。
21. 回到第 5 行，i++ 是 4，檢查 i 是否小於陣列內元素數量 6，是，繼續執行。
22. 變數 i 為 4 ，判斷陣列中第 i 個元素為 22 是否非 第 i-1 個元素為 13 與第 i-2 個數字 8 的總和為 21。是，回傳 ' invalid ' 並結束 isValid function 。