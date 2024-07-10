# α 金融法規助理
### Language
* Frontend
    * HTML
    * CSS
    * Java Script
* Backend
    * Python 3.11
### Framework
* Frontend
    * Bootstrap 5
* Backend
    * Django 4.2
### Prerequisite
* django-bootstrap-v5==1.0.11
* boto3==1.34.118
* celery==5.4.0
* Django==4.2.11
* langchain==0.2.3
* pdfplumber==0.11.0
* PyMySQL==1.1.0
* python_docx==1.1.2
* Requests==2.32.3
* djangorestframework==3.15.2
* mammoth==1.8.0
* python-docx==1.1.2
* python-dotenv==1.0.1

### Reference Design

#### Check Contract
```sequence
User-->Frontend: choose file and submit
Frontend-->User: display result with revision
Frontend->Backend(django): Upload File API
Backend(django)->Frontend: LLM Result
Note right of Database: Bedrock(RAG)
Backend(django)->Database: Save file & analyze data & self-training
Backend(django)->Database: Save Result
Database-->Backend(django): RAG Result 
Note right of Database: MySQL
Note right of Frontend: LLM: Bedrock(Claude 3.5)
```

### Frontend

#### Welcome
![welcome](https://hackmd.io/_uploads/Sy_7qoLvR.png)
* 登入：Login account
* 註冊：Register account

#### Register (Incomplete)
![Register](https://hackmd.io/_uploads/B18B5s8DA.png)
* 帳號：User name
* 密碼：Password
* 記住我：Remember
* 註冊：Register

#### Login (Incomplete)
![Signin](https://hackmd.io/_uploads/HyzN5oUDR.png)
* 帳號：User name
* 密碼：Password
* 記住我：Remember
* 登入：Login

#### Start
![start](https://hackmd.io/_uploads/B1ju2sID0.png)
* 合約檢查：Check contract and chat to Generative AI(Claude 3.5) to know more details
* 合約生成：Generate contracts for 4 types
* 合約解讀：Explain the technical terms in the contract
* 首頁：Back to Welcome Page
* 使用者：Change any info if needed

#### Chat
![chat](https://hackmd.io/_uploads/HkCkznIPC.png)
1. Redirect page to **Start**
2. Create a new chatroom
3. Logout
4. Upload files
5. Send flies or messages
6. Chat history list
    * left-click: Reload the chat history
    * right-click:
        * Rename the chat
        * Delete the chat

#### Generate
![generate1](https://hackmd.io/_uploads/HJUt2iLwA.png)
* 服務合約：Service Contract
* 採購合約：Purchase Contract
* 維護合約：Maintain Contract(Incomplete)
* 開發合約：Devlope Contract(Incomplete)
* 下一步：Redirect to the specific page that can type more details(up to the button have selected)

![generate2](https://hackmd.io/_uploads/r1UF3s8v0.png)
* Type the details about the contract
 
![Generate3](https://hackmd.io/_uploads/HJgUF2o8D0.png)
* Generating 

![Generate4](https://hackmd.io/_uploads/SyvPx3IPR.png)
* The content of contract can be changed and download as .docx file

#### Explain
![explain](https://hackmd.io/_uploads/S1nETiIPR.png)
* Drag or click to upload contracts need to explain technical terms

![explain2](https://hackmd.io/_uploads/HkTEajIvR.png)
* Technical terms would be marked red

![explain3](https://hackmd.io/_uploads/BkpV6jUvA.png)
* Move the mouse to get a detailed explanation

### Backend