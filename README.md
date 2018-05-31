## 小練習

使用RESTful API的設計風格來寫出四支API，其功能為：
+ 讀取資料
+ 新增資料
+ 修改資料
+ 刪除資料

並讓四支API也能同時觸發「firebase」所對應到的功能，並帶入「購物車」的情境來做開發。

（四個API所相對應的firebase function有預先寫在routes資料夾中的firebase.js檔案中，可直接使用。）

## 建立firebase

1. 至[firebase](https://firebase.google.com/)網站。
2. 登入後，點選「GET STARTED」按鈕。
3. 選擇「新增專案」，並填入相關所需資料。
4. 進入firebase主頁面後，選擇「將 Firebase 加入您的網路應用程式」的按鈕，並將所提供的config資料給記錄下來。
5. 到左邊選單中，點選「Database」按鈕，選擇「Realtime Database」並按下「開始使用」。
6. 選擇「以測試模式啟動」後即可。

（當設定完成且與Node JS API有做互動後，就能在該Database中看到所建立出來的資料。）