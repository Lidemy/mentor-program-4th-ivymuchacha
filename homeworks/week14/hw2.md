#部署心得
[部署網址](http://ivymuchacha.tw/blog/index.php)
##心得
第一次購買主機與部署，一開始在 GWP 與 AWS 間猶豫不決，也查了兩個方案的資料，雖然 GWP 有部分產品使用量在限度內免費，但他只有三個月的免費期間，最後還是選擇 AWS 來部署。

原先想要靠自己摸索設定部署，看了 AWS 的設定文件，總覺得好像怪怪的，還需要使用一些 AWS 其他的工具操作，有點擔心誤用收費的產品，收到巨額賬單，還是參考同學的共同筆記操作。

感謝同學的共同筆記，很清楚很詳細。第一次操作的時候，不大確定每個步驟的用意，只是按照筆記操作，僅有在設定防火牆時，卡在 mySQL 設定所有 IP 皆可連線，還有連線主機時，因為 key 權限的關係，需降低權限才可以連線，其他部分都還算順利完成。

後來看檢討影片才知道免費方案的虛擬主機可以架在亞洲地區，我就終止俄亥俄的主機，重新在亞洲地區新增主機。第二次部署因為看過檢討影片，比較清楚每一步驟的用意，部署時間快很多就完成了，也有整理部署的筆記（附在下方），成功部署主機，看到網站成功可以跑的時候還蠻有成就感的，可以在自己的主機上操作，上傳檔案也相對快很多，很期待將更多自己的作品放在上面。

## aws 主機部署 + 本機設定連線筆記

部署前可選地區，亞洲地區相得叫鄰近，速度較快。

![地區選擇](https://imgur.com/0YUbhqU.png)


### 選擇 啟動虛擬機器 EC2

![ 選擇啟動虛擬機器 EC2](https://imgur.com/DZC0Ajn.png)


- Step 1: Choose an Amazon Machine Image (AMI)  選擇機器映像檔
> 選擇 Ubuntu Server 18.04

![選擇 AMI ](https://imgur.com/wEpVF2s.png)


- Step 2: Choose an Instance Type 選擇主機等級
> 選擇 t2.micro 
> 選擇 Next: Configure Instance Details

![Choose an Instance Type 選擇主機等級](https://imgur.com/8TpCayM.png)


- Step 3: Configure Instance Details 主機設定
> 不調整，選擇 Next: Add Storage

![Configure Instance Details 主機設定](https://imgur.com/QTNtxvv.png)


- Step 4: Add Storage
> 不調整，下一步

![Add Storage](https://imgur.com/UnduBUd.png)


- Step 5: Add Tags （為方便管理主）
> 不調整，下一步

![Add Tags](https://imgur.com/EYjH9U8.png)


- Step 6: Configure Security Group （aws 上的防火牆）
> 0.0.0.0 指所有 IP 皆可連線
> 選擇SSH、HTTP、MYSQL

![Configure Security Group](https://imgur.com/oCeXsiT.png)


- Step 7: Review Instance Launch

![Review Instance Launch](https://imgur.com/kPqIMob.png)

- 需產生密碼已連線主機，下載密碼後，即可 Launch

![下載密碼](https://imgur.com/nNPWTMF.png)

主機成功產生即會顯示於頁面上（如下圖）。

![成功](https://imgur.com/bOQOoH2.png)


### Terminal 安裝處理

- 輸入指令  `ssh -i + key + 使用者名稱 + IPV4`

```bash
$ ssh -i ~/Downloads/ivymuchacha.pem ubuntu@18.224.169.246
```

  > 即會跳出  Are you sure you want to continue connecting (yes/no/[fingerprint])?

  > 輸入“yes”

![輸入指令](https://imgur.com/NENevgi.png)

- 會跳出 key 權限太高的問題

![key 權限太高](https://imgur.com/UclKdq6.png)

  > 先使用chmod 400 加上key降低權限，再次用 ssh 連線

```bash
$ chmod 400 ~/Downloads/ivymuchacha.pem
$ ssh -i ~/Downloads/ivymuchacha.pem ubuntu@18.224.169.246
```

- 成功連線如下圖

![成功連線](https://imgur.com/KXDYcfY.png)

- 使用指令 top 可以看到即時的主機資訊，按 q 即可離開

```bash
$ top
```

![top](https://imgur.com/1eWDdYp.png)


### 更新 ubuntu 系統

sudo ：要用管理員的身份去執行
apt ：在 ubuntu 上面管理套件的軟體
（mac 為 homebrew 或 cask）

```bash
$ sudo apt update && sudo apt upgrade && sudo apt dist-upgrade
```

![更新 ubuntu 系統](https://imgur.com/KXDYcfY.png)


### 安裝 tasksel

tasksel 是一個軟體包(輔助工具)，協助安裝其他軟體(像是lamp-server)

```bash
// 用 apt 來安裝 tasksel
$ sudo apt install tasksel
```

  > 問  Do you want to continue? [Y/n] 

  > 輸入 y

![安裝 tasksel](https://imgur.com/XFkvY9r.png)


### 用 tasksel 安裝 lamp-server

```bash
$ sudo tasksel install lamp-server
```

會跑出下載中的紫紅色框框

![tasksel 安裝 lamp-server](https://imgur.com/xr36Xv4.png)


### 安裝 phpmyadmin

```bash
$ sudo apt install phpmyadmin
```

- 需按空白鍵選擇 apache2 （有星號出現，如下圖）

![安裝 phpmyadmin](https://imgur.com/xhg7wnY.png)

  > 是否設定 dbconfig-common  選擇 y

  > 完成設定密碼即可


### 改變 phpmyadmin 登入的設定，改成可以用密碼登入

```bash
$ sudo mysql -u root mysql
```

- 進入 sql 指令

![phpmyadmin 登入的設定](https://imgur.com/e7yQRRL.png)

- 輸入 sql 指令

```sql
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
```

```sql
FLUSH PRIVILEGES;
```

```sql
// 離開 sql
exit
```


### 設定 root 密碼

```bash
$ sudo mysql_secure_installation
```

- Would you like to setup VALIDATE PASSWORD plugin?
Press y|Y for Yes, any other key for No</br>
: y
- Please enter 0 = LOW, 1 = MEDIUM and 2 = STRONG: 2</br>
: 0 或 1 或 2
- Please set the password for root here.
New password:</br>
: 輸入密碼
- Re-enter new password:</br>
: 輸入密碼
- Do you wish to continue with the password provided?(Press y|Y for Yes, any other key for No) :</br>
: y
- Disallow root login remotely? (Press y|Y for Yes, any other key for No) </br>
: y
- Remove test database and access to it? (Press y|Y for Yes, any other key for No)</br>
 : y
- Reload privilege tables now? (Press y|Y for Yes, any other key for No)</br>
 : y
- All done!  （完成）

![設定 root 密碼](https://imgur.com/fb32j93.png)


### 更新 phpmyadmin 權限

登入後需更新使用者 root ，以從自己的電腦透過別的軟體(任意主機)連到遠端主機

- 在瀏覽器網址列輸入 IPv4/phpmyadmin 可以看到登入畫面

> 帳號：root
> 
> 密碼：剛剛設定的密碼

- 選擇使用者帳號 >  >選擇 root 的 編輯權限 > 登入資訊  > 主機名稱改為 “任何主機” > 執行

![更新 phpmyadmin 權限](https://imgur.com/iyfVL0y.png)

![更新 phpmyadmin 權限](https://imgur.com/9g5ojGV.png)


### local 資料庫匯出至遠端資料庫

```bash
// 讓 ubuntu 可以有權限更改檔案
// chown change ownership 
sudo chown ubuntu /var/www/html
```

```bash
// 確認權限
ls -al 
```

![local 資料庫匯出至遠端資料庫](https://imgur.com/x1WtGmC.png)

- 設定 filezilla

![設定 filezilla](https://imgur.com/cmBgF9S.png)

- 設定完成後找到正確的檔案放置的位置再新增檔案
路徑：/var/www/html

完成後即可在瀏覽器輸入 `IPV4/檔案名稱` 即可連線至網路
