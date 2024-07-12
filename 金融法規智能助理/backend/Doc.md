# 前後端傳輸格式

## 1. 建立專案

### main_create_project(request)

---

#### 成功

-   ##### 後端傳送

```javascript
return:
{
    'status': 'success',
    'message': 'create project success',
    'projectName': projectName
    'date': date
}
```

-   ##### 前端接收

    前端建立一筆新的專案，接收 projectName, date 並渲染。

#### 失敗

-   ##### 後端傳送

```javascript
    {
        'status': 'error',
        'message': 'create project failed'
    }
```

-   ##### 前端接收

    前端發送 alert 訊息

<br>

---

## 2. 傳送訊息

### send_message(request)

---

#### 1. 前端 post request

> ##### 僅有檔案
>
> ##### 僅有訊息
>
> ##### 有訊息且有檔案

<br>

#### 2. 後端接收 request

<br>

#### 3. 後端處理 request

<br>

#### 4. 回傳 json 前端接收
