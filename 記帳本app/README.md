# Account
Keep account and save money.

## 使用說明
1.	開啟「記帳本」軟體
2.	點選左下角「記帳」按鈕，進入記帳頁面
    1. 紀錄欄位：可以選擇支出或是收入
    2. 日期欄位：可以選擇記帳日期
    3. 金額欄位：可以輸入數字
    4. 分類欄位：可以選擇更詳細的記帳分類
    5. 備註欄位：可以輸入文字
    6. 點選左下角「送出」按鈕，回到首頁並顯示所有的記帳內容
        + 若日期欄位或是金額欄位未輸入內容，會跳出提示訊息
    7. 點選右下角「取消」按鈕，回到首頁並顯示原本的記帳內容
3.	點選右下角「離開」按鈕，離開本軟體
4.	本軟體提供三國語言：繁體中文、英文、日文

## 使用元件、技術
1. 元件
    1. Text View
    2. Button
    3. Edit Text (Number)
    4. Spinner
    5. Edit Text (Plain)
    6. Date Picker
2. 技術
    1. Toast: 提示訊息
    2. Array Adapter: 分類欄位的spinner會隨著紀錄欄位的選項改變
    3. Intent
        + startActivityForResult() / onActivityResult(): 確認是否有記帳
        + putXXXExtra(): 選擇傳送欄位、內容
        + getXXXExtra(): 取得傳送欄位、內容
    4. Database
        + cv.put(): 將記帳內容存入資料庫
    5. Cursor
        + cv.getXXX(): 取得資料庫的內容，並用存入的記帳金額，計算總存款
