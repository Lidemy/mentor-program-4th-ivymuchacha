## 交作業流程

### github 上傳
1. 新開一個 branch：`git branch hw1`
2. 切換到 branch：`git checkout hw1`
3. 完成作業後，繳交作業：`git commit -am "hw1 完成"`
4. 將在本地的 branch 推至遠端 github : `git push origin hw1`
5. 進入自己 github 並進入 pull requests
6. 上方會出現新通知，點選 compare and pull request。若未出現，可按 New Request 新增。
7. 確認是正確的 branch 合併到 master，並確認下方作業內容為正確內容
8. 填寫這次 pull request 主旨，若有疑問或反饋可以在下方留言。完成後點選 Create pull request

### Lidemy 學習平台
1. 再至 Learning 平台，點選作業列表，點選新增作業
2. 選擇繳交作業的週數，並在 PR 連結欄位填入 github 上作業連結
3. 確認檢查作業，確認已完成自我檢討並修正錯誤後勾選再送出

### 同步遠端至本地
1. 確認作業批改完成也合併至遠端 github 後， 須將遠端資料同步至當地
2. 先將新增作業的 branch 切換至 master：`git checkout master`
3. 將遠端 master 和本地 master 同步：`git pull origin master`
4. 刪除新增作業的 branch ： `git branch -d hw1`



