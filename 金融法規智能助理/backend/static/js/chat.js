// var currentProjectName = null;

// $(document).ready(function () {
// });


// document.querySelector('#messageInput').addEventListener('keydown', function (event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();

//         let message = document.querySelector('#messageInput').value.trim(); // 獲取輸入的文字，並去除前後空格
//         let fileInput = document.querySelector('#fileInput'); // 獲取檔案輸入框
//         let file = fileInput.files[0]; // 獲取檔案輸入框中的檔案

//         // 如果文字和檔案都為空，則不進行任何操作
//         if (message === '' && (!file || file.size === 0)) {
//             return;
//         }

//         send_message();
//     }
// });


// $("#sendMessage").click(function (event) {
//     event.preventDefault();

//     send_message();
// });


// $("#fileInput").click(function (event) {
//     document.activeElement.blur();
// });


// $(".ref-number").click(function (event) {
//     document.querySelector(".refData").style.display = "block";
// });


// // 點擊專案 回傳此專案的聊天紀錄
// document.querySelector('.list-group-flush').addEventListener('click', function (event) {
//     event.preventDefault();

//     var listItem = event.target.closest('.list-group-item');

//     // 在聊天室歷史紀錄 Highlight 專案
//     if (listItem) {
//         event.preventDefault();

//         // 移除所有元素的 active 屬性
//         document.querySelectorAll('.list-group-item').forEach(function (item) {
//             item.classList.remove('active');
//         });

//         // 為被點擊的元素添加 class="active" 屬性
//         listItem.classList.add('active');

//         var projectName = listItem.querySelector('.projectName').textContent;
//         var projectDate = listItem.querySelector('.projectDate').textContent;
//         currentProjectName = projectName;
//         console.log("Change current project to " + currentProjectName);
//     }

//     // 清空聊天紀錄
//     document.querySelectorAll('.chat-message-right').forEach(function (item) {
//         item.remove();
//     });

//     $.ajax({
//         url: "/select_current_project/",    // API 的位置
//         type: "POST",
//         dataType: "json",
//         data: {
//             'projectName': projectName,
//             'projectDate': projectDate,
//         },
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         success: function (data) {
//             console.log("回傳聊天訊息");
//             console.log(data);

//             if (data.chats == '') {
//                 document.querySelector('#messageInput').setAttribute('placeholder', '請先上傳檔案');
//             }
//             else {
//                 document.querySelector('#messageInput').setAttribute('placeholder', '請輸入訊息');
//             }

//             data.chats.forEach(function (chats) {
//                 // 使用者
//                 if (chats.sender_id != '2') {
//                     // 使用者有傳送檔案時
//                     if (chats.filePath != '') {
//                         var fileUrl = chats.filePath;
//                         var filename = chats.content;
//                         // fileUrl = fileUrl + '#toolbar=0';
//                         currentProjectName = data.projectName;

//                         console.log('[Return project history]');
//                         // console.log(fileUrl);
//                         if (fileUrl.endsWith(".pdf")) {
//                             append_user_message_with_file(chats.content, chats.time, fileUrl);
//                         }
//                         else if (fileUrl.endsWith(".docx")) {
//                             append_user_message_with_docx_file(chats.content, chats.time, filename);
//                         }
//                     }
//                     // 使用者沒有傳送檔案
//                     else {
//                         $('.chat-messages').append(`
//                             <div class="chat-message-right pb-4">
//                                 <div>
//                                     <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                                         width="40" height="40">
//                                     <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
//                                 </div>
//                                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                                     <div class="font-weight-bold mb-1"><strong>You</strong></div>
//                                     ${chats.content}
//                                 </div>
//                             </div>
//                         `)
//                         loadToLatest();
//                     }
//                 }
//                 // 系統回覆訊息
//                 else if (chats.sender_id == '2') {
//                     // 系統回覆不是檢查合約時
//                     if (chats.filePath == '') {

//                         if (chats.content == '') {
//                             chats.content = "出現錯誤，請再次操作";
//                         }
//                         $('.chat-messages').append(`
//                             <div class="chat-message-right pb-4">
//                                 <div>
//                                     <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                                         width="40" height="40">
//                                     <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
//                                 </div>
//                                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
//                                     <div class="font-weight-bold mb-1"><strong>α</strong></div>
//                                     <div class="message" style="white-space: pre-line;">
//                                     ${chats.content}
//                                     </div>
//                                 </div>
//                             </div>
//                         `);
//                     }
//                     else {
//                         var relevant_counter = 1;
//                         console.log(chats.llm_gen.refData);

//                         const messagesHtml = chats.llm_gen.map(item => `
//                             <div class="message-container">
//                                 <div class="contract">
//                                     <strong>合約內容:<br></strong> 
//                                     <div class="contract-content" style="white-space: pre-line;">
//                                         ${item.contract_content}
//                                     </div>
//                                 </div>
//                                 <div class="relevant">
//                                     <strong>相關法規:</strong>
//                                     <div class="message" style="white-space: pre-line;">
//                                         ${item.genContent}
//                                     </div>
//                                     ${item.refData ? `<a class="ref-number">[${relevant_counter++}]</a>` : ''}
//                                 </div>
//                                 ${item.refData ? `<div class="refData">${item.refData}</div>` : ''}
//                                 <br>
//                             </div>
//                         `).join('');


//                         var fileUrl = chats.filePath;

//                         $('.chat-messages').append(`
//                             <div class="chat-message-right pb-4">
//                                 <div>
//                                     <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                                         width="40" height="40">
//                                     <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
//                                 </div>
//                                 <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
//                                     <div class="font-weight-bold mb-1"><strong>α</strong></div>
//                                     ${messagesHtml}
//                                     <br>
//                                     <a href=${fileUrl} class="download-btn" download>
//                                         下載結果文件
//                                     </a>
//                                 </div>
//                             </div>
//                         `);

//                     }

//                     $('.contract').off('click', '.contract-content').on('click', '.contract-content', function (e) {
//                         e.stopPropagation();
//                         var $relevant = $(this).closest('.message-container').find('.relevant');
//                         if ($relevant.attr('show')) {
//                             $relevant.removeAttr('show');
//                             $relevant.hide();
//                         } else {
//                             $relevant.attr('show', true);
//                             $relevant.show();
//                         }
//                     });

//                     $('.relevant').off('click', '.ref-number').on('click', '.ref-number', function (e) {
//                         e.stopPropagation();
//                         var $refData = $(this).closest('.relevant').next('.refData');
//                         if ($refData.attr('show')) {
//                             $refData.removeAttr('show');
//                             $refData.hide();
//                         } else {
//                             $refData.attr('show', true);
//                             $refData.show();
//                         }
//                     });

//                     loadToLatest();
//                 }
//             })
//         },
//     });
//     loadToLatest();
// });


// // 建立一個新的專案
// document.querySelector('.newProject').addEventListener('click', function (event) {
//     event.preventDefault();
//     console.log('New Project');
//     console.log('Mode: ' + mode);
//     $.ajax({
//         url: "/create_project/",    // API 的位置
//         type: "POST",
//         data: {
//             'type': 'create_project',
//             'mode': mode,
//         },
//         dataType: "json",  // 預期服務器回傳的數據類型
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         success: function (data) {
//             console.log(data);

//             if (currentProjectName == null) {
//                 currentProjectName = data.projectName;

//                 // 清空聊天紀錄
//                 document.querySelectorAll('.chat-message-right').forEach(function (item) {
//                     item.remove();
//                 });

//                 $('.list-group-flush').append(`
//                     <a href="" class="list-group-item list-group-item-action py-3 lh-tight active">
//                         <div class="d-flex w-100 align-items-center justify-content-between">
//                             <strong class="mb-1 projectName">${data.projectName}</strong>
//                             <small class="text-muted projectDate">${data.date}</small>
//                         </div>
//                     </a>
//                 `);

//             }
//             else {
//                 $('.list-group-flush').append(`
//                     <a href="" class="list-group-item list-group-item-action py-3 lh-tight">
//                         <div class="d-flex w-100 align-items-center justify-content-between">
//                             <strong class="mb-1 projectName">${data.projectName}</strong>
//                             <small class="text-muted projectDate">${data.date}</small>
//                         </div>
//                     </a>
//                 `);
//             }
//         },
//         error: function (xhr, status, message) {
//             console.log("Error: " + message);
//             console.log("Status: " + status);
//             console.dir(xhr);
//             alert("錯誤: " + error);
//         }
//     });
// });


// // 網頁讀取完畢接收所有專案名稱
// $(document).ready(function () {
//     $.ajax({
//         url: "/get_all_projects/",  // API 的位置，需要根據你的後端路由設定來修改
//         type: "GET",
//         data: { "mode": mode },
//         dataType: "json",
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         success: function (data) {
//             console.log(data);
//             // 假設 data 是一個包含所有專案的陣列
//             data.forEach(function (project) {
//                 // 為每一個專案創建一個新的元素
//                 $('.list-group-flush').append(`
//                     <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
//                         <div class="d-flex w-100 align-items-center justify-content-between">
//                             <strong class="mb-1 projectName">${project.projectName}</strong>
//                             <small class="text-muted projectDate">${project.date}</small>
//                         </div>
//                     </a>
//                 `);

//             });
//         }
//     });
// });


// // 右鍵選單: 編輯名稱、刪除
// $(function () {
//     var items = {
//         "edit": { name: "編輯名稱", icon: "edit" },
//         "sep1": "---------",
//         "delete": { name: "刪除", icon: "delete" },
//     }

//     $.contextMenu({
//         selector: '.list-group-item',
//         callback: function (key, options) {
//             var m = "clicked: " + key;
//             var event = options.$trigger[0];

//             console.log(event);

//             switch (key) {
//                 case 'edit':
//                     console.log('編輯專案名稱');
//                     var listItem = options.$trigger[0];
//                     var projectNameElement = listItem.querySelector('.mb-1');
//                     var projectDate = listItem.querySelector('.projectDate').textContent;

//                     if (projectNameElement) {
//                         var projectName = projectNameElement.textContent;
//                         var parentElement = projectNameElement.parentNode;

//                         // 創建一個新的輸入框元素
//                         var inputElement = document.createElement('input');
//                         inputElement.type = 'text';
//                         inputElement.value = projectName;

//                         // 當輸入框失去焦點時，將輸入框替換回原本的元素
//                         inputElement.addEventListener('blur', function () {
//                             var newProjectName = inputElement.value;

//                             // 如果新的專案名稱與原始的專案名稱不同，且超過 15 個字符，則只取前 15 個字符
//                             if (newProjectName !== projectName && newProjectName.length > 20) {
//                                 newProjectName = newProjectName.substring(0, 20);
//                             }
//                             else if (newProjectName == projectName) {
//                                 console.log("還原名稱")
//                                 var originalProjectNameElement = document.createElement('strong');
//                                 originalProjectNameElement.className = 'mb-1 projectName';
//                                 originalProjectNameElement.textContent = projectName;

//                                 parentElement.replaceChild(originalProjectNameElement, inputElement);
//                             }

//                             // 傳送 ajax 請求更新專案名稱
//                             $.ajax({
//                                 url: "/change_project_name/",    // API 的位置
//                                 type: "POST",
//                                 dataType: "json",
//                                 data: {
//                                     // 舊名稱用來辨識後端專案名稱
//                                     // 新名稱用來更新專案名稱
//                                     'newProjectName': newProjectName,
//                                     'projectName': projectName,
//                                     'projectDate': projectDate,
//                                 },
//                                 beforeSend: function (xhr) {
//                                     xhr.setRequestHeader("X-CSRFToken", csrftoken);
//                                 },
//                                 success: function (data) {
//                                     console.log(data);
//                                     // 創建一個新的 projectNameElement
//                                     var newProjectNameElement = document.createElement('strong');
//                                     newProjectNameElement.className = 'mb-1 projectName';
//                                     newProjectNameElement.textContent = newProjectName;
//                                     currentProjectName = newProjectName;

//                                     // 清空聊天紀錄
//                                     document.querySelectorAll('.chat-message-right').forEach(function (item) {
//                                         item.remove();
//                                     });

//                                     parentElement.replaceChild(newProjectNameElement, inputElement);
//                                 },
//                                 error: function (xhr, status, message) {
//                                     console.log("Error: " + message);
//                                     // 更新失敗，將名稱還原回原來名稱
//                                     var originalProjectNameElement = document.createElement('strong');
//                                     originalProjectNameElement.className = 'mb-1 projectName';
//                                     originalProjectNameElement.textContent = projectName;

//                                     parentElement.replaceChild(originalProjectNameElement, inputElement);
//                                 }
//                             });


//                         });

//                         // 將原本的元素替換為輸入框
//                         parentElement.replaceChild(inputElement, projectNameElement);

//                         // 自動將焦點設定到輸入框
//                         inputElement.focus();
//                     }
//                     break;
//                 case 'delete':
//                     console.log('刪除專案');

//                     var listItem = options.$trigger[0];
//                     if (listItem) {
//                         listItem.remove(this);

//                         // 傳送 ajax 請求刪除專案
//                         var projectName = listItem.querySelector('.projectName').textContent;
//                         var projectDate = listItem.querySelector('.projectDate').textContent;

//                         $.ajax({
//                             url: "/delete_project/",    // API 的位置
//                             type: "POST",
//                             dataType: "json",
//                             data: {
//                                 'projectName': projectName,
//                                 'projectDate': projectDate,
//                             },
//                             beforeSend: function (xhr) {
//                                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//                             },
//                             success: function (data) {
//                                 listItem.remove(this);

//                                 if (currentProjectName == projectName) {
//                                     currentProjectName = null;
//                                     // 清空聊天紀錄
//                                     document.querySelectorAll('.chat-message-right').forEach(function (item) {
//                                         item.remove();
//                                     })
//                                 }
//                             },
//                             error: function (xhr, status, message) {
//                                 console.log("Error: " + message);
//                                 console.log("Status: " + status);
//                                 console.dir(xhr);
//                             }
//                         });
//                     }

//             }
//         },
//         items: items
//     });

//     $('.list-group-item').on('contextmenu', function (e) {
//         e.preventDefault();
//     })
// });


// // 沒有選擇專案的狀態，先建立一個聊天室
// function create_project_before_select() {
//     $.ajax({
//         url: "/create_project/",    // API 的位置
//         type: "POST",
//         data: {
//             'type': 'create_project',
//             'mode': mode,
//         },
//         dataType: "json",  // 預期服務器回傳的數據類型
//         // CSRF Token
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         success: function (data) {
//             currentProjectName = data.projectName;
//             console.log(data);

//             // 移除所有元素的 active 屬性
//             document.querySelectorAll('.list-group-item').forEach(function (item) {
//                 item.classList.remove('active');
//             });

//             // 建立一個新的專案
//             // 例如，您可以更新頁面的某一部分，或者顯示一個訊息給用戶
//             // 最下面的 div 要有摘要
//             $('.list-group-flush').append(`
//                 <a href="" class="list-group-item list-group-item-action py-3 lh-tight active">
//                     <div class="d-flex w-100 align-items-center justify-content-between">
//                         <strong class="mb-1 projectName">${data.projectName}</strong>
//                         <small class="text-muted projectDate">${data.date}</small>
//                     </div>
//                 </a>
//             `);
//         },
//         error: function (xhr, status, message) {
//             console.log("Error: " + message);
//             console.log("Status: " + status);
//             console.dir(xhr);
//             alert("錯誤: " + error);
//             return;
//         }
//     });
// }


// function append_user_message_without_file(message, time) {
//     $('.chat-messages').append(`
//         <div class="chat-message-right pb-4">
//             <div>
//                 <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                     width="40" height="40">
//                 <div class="text-muted small text-nowrap mt-2">${time}</div>
//             </div>
//             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
//                 <div class="font-weight-bold mb-1"><strong>You</strong></div>
//                 ${message}
//             </div>
//         </div>
//     `);
//     loadToLatest();
// }


// function append_user_message_with_file(message, time, fileUrl) {
//     $('.chat-messages').append(`
//         <div class="chat-message-right pb-4">
//             <div>
//                 <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                     width="40" height="40">
//                 <div class="text-muted small text-nowrap mt-2">${time}</div>
//             </div>
//             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" style="overflow: auto">
//                 <div class="font-weight-bold mb-1"><strong>You</strong></div>
//                 ${message}
//                 <br>
//                 <iframe src=${fileUrl} type="application/pdf" width="80%" height="500px" class="message-container user-message-file"></iframe>
//             </div>
//         </div>
//     `);
//     loadToLatest();
// }

// function append_user_message_with_docx_file(message, time, filename) {
//     $('.chat-messages').append(`
//         <div class="chat-message-right pb-4">
//             <div>
//                 <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                     width="40" height="40">
//                 <div class="text-muted small text-nowrap mt-2">${time}</div>
//             </div>
//             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" style="overflow: auto">
//                 <div class="font-weight-bold mb-1"><strong>You</strong></div>
//                 ${message}
//                 <br>
//                 <div>已處理檔案: ${filename}</div>
//             </div>
//         </div>
//     `);
//     loadToLatest();
// }


// function send_message() {
//     let sendBtn = document.getElementById('sendMessage');
//     let message = document.getElementById('messageInput').value.trim(); // 獲取輸入的文字，並去除前後空格
//     let fileInput = document.getElementById('fileInput'); // 獲取檔案輸入框
//     let file = fileInput.files[0]; // 獲取檔案輸入框中的檔案

//     // 如果文字和檔案都為空，則不進行任何操作
//     if (message === '' && (!file || file.size === 0)) {
//         return;
//     }

//     sendBtn.setAttribute("disabled", "disabled");

//     // 清空輸入。
//     document.getElementById('messageInput').value = ''; // 清空文字輸入框
//     document.getElementById('fileInput').value = '';    // 清空檔案輸入框
//     $('#fileName').text(''); // 清空顯示的檔案名稱
//     $('#filePreview').html(''); // 清空顯示的檔案圖示
//     $('#uploadedFile').hide(); // 隱藏檔案顯示區域
//     $('#chatInput').css('top', 'calc(100% - 10%)'); // 恢復 chatInput 的原始位置

//     // 沒有選擇專案
//     if (currentProjectName == null) {
//         // 建立一個新的專案
//         create_project_before_select();
//     }

//     // 顯示訊息時間
//     const dateObj = new Date()          //  輸入 timestamp（毫秒），回傳設定的時間物件
//     dateObj.getTime()                   //  輸入時間物件，回傳特定時間的 timestamp（毫秒)
//     minutes = dateObj.getMinutes();
//     second = dateObj.getSeconds();
//     time = dateObj.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (second < 10 ? '0' + second : second) + ' ' + (dateObj.getHours() >= 12 ? 'PM' : 'AM');

//     docx_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
//     pdf_type = 'application/pdf';

//     // 顯示使用者輸入訊息
//     // 沒有檔案的情況
//     if (file == null) {
//         append_user_message_without_file(message, time);
//     }
//     // 有檔案的情況
//     else {
//         let formData = new FormData();
//         var fileUrl;

//         // 辨識檔案格式做不同處理
//         if (file.type === docx_type) {
//             filename = file.name;
//             append_user_message_with_docx_file(file.name, time, filename);
//         }
//         else if (file.type === pdf_type) {
//             fileUrl = URL.createObjectURL(file);
//             append_user_message_with_file(message, time, fileUrl);
//         }
//     }

//     // 將資料放入 formData 中
//     console.log("Put into form message: " + message);
//     formData = new FormData();
//     formData.append('message', message);    // 將文字添加到 formData 中
//     formData.append('time', time);
//     formData.append('projectName', currentProjectName);  // 將專案名稱添加到 formData 中
//     formData.append('mode', mode);  // 將模式添加到 formData 中
//     if (file && file.size > 0) {
//         formData.append('file', file);  // 如果有檔案，則將檔案添加到 formData 中
//     }

//     let loadingInterval;
//     startLoadingAnimation(time, loadingInterval);

//     $.ajax({
//         url: "/send_message/",                // 打API的位置
//         type: "POST",
//         data: formData,
//         processData: false,              // 不預處理數據 FormData 已做
//         contentType: false,              // 不指定編碼 FormData 已做
//         beforeSend: function (xhr) {
//             xhr.setRequestHeader("X-CSRFToken", csrftoken);
//         },
//         success: function (data) {
//             stopLoadingAnimation(); // 等待動畫

//             // console.log(data);
//             // console.log("Chats: ");
//             // console.log(data.chats);

//             document.querySelector('#messageInput').setAttribute('placeholder', '請輸入訊息');

//             data.chats.forEach(function (chats) {
//                 console.log("Chats");
//                 console.log(chats);
//                 if (chats.filePath == "") {
//                     console.log("Normal message");
//                     if (chats.content == "") {
//                         chats.content = "出現錯誤，請再次操作";
//                     }
//                     $('.chat-messages').append(`
//                         <div class="chat-message-right pb-4">
//                             <div>
//                                 <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                                     width="40" height="40">
//                                 <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
//                             </div>
//                             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
//                                 <div class="font-weight-bold mb-1"><strong>α</strong></div>
//                                 <div class="message" style="white-space: pre-line;">
//                                 ${chats.content}
//                                 </div>
//                             </div>
//                         </div>
//                     `);
//                 }
//                 else {
//                     console.log("Contract check");
//                     var relevant_counter = 1;
//                     const messagesHtml = chats.llm_gen.map(item => `
//                         <div class="message-container">
//                             <div class="contract">
//                                 <strong>合約內容:<br></strong> 
//                                 <div class="contract-content" style="white-space: pre-line;">
//                                     ${item.contract_content}
//                                 </div>
//                             </div>
//                             <div class="relevant">
//                                 <strong>相關法規:</strong>
//                                 <div class="message" style="white-space: pre-line;">
//                                     ${item.genContent}
//                                 </div>
//                                 ${item.refData ? `<a class="ref-number">[${relevant_counter++}]</a>` : ''}
//                                 </div>
//                                 ${item.refData ? `<div class="refData">${item.refData}</div>` : ''}
//                             <br>
//                         </div>
//                     `).join('');

//                     var fileUrl = chats.filePath;

//                     $('.chat-messages').append(`
//                         <div class="chat-message-right pb-4">
//                             <div>
//                                 <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                                     width="40" height="40">
//                                 <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
//                             </div>
//                             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
//                                 <div class="font-weight-bold mb-1"><strong>α</strong></div>
//                                 ${messagesHtml}
//                                 <br>
//                                 <a href=${fileUrl} class="download-btn" download>
//                                     下載結果文件
//                                 </a>
//                             </div>
//                         </div>
//                     `);

//                 }


//                 // 滑鼠點擊合約條文上會顯示相關法規
//                 $('.chat-messages').off('click', '.contract-content').on('click', '.contract-content', function (e) {
//                     e.stopPropagation();
//                     var $relevant = $(this).closest('.message-container').find('.relevant');
//                     if ($relevant.attr('show')) {
//                         $relevant.removeAttr('show');
//                         $(this).closest('.relevant').next('.refData').removeAttr('show');
//                         $(this).closest('.relevant').next('.refData').hide();
//                         $relevant.hide();
//                     } else {
//                         $relevant.attr('show', true);
//                         $relevant.show();
//                     }
//                 });
//                 loadToLatest();

//                 // 顯示參考資料
//                 $('.relevant').off('click', '.ref-number').on('click', '.ref-number', function (e) {
//                     e.stopPropagation();
//                     var $refData = $(this).closest('.relevant').next('.refData');
//                     if ($refData.attr('show')) {
//                         $refData.removeAttr('show');
//                         $refData.hide();
//                     } else {
//                         $refData.attr('show', true);
//                         $refData.show();
//                     }
//                 });


//                 function displayText(element, text, index, interval) {
//                     return new Promise(resolve => {
//                         function typeCharacter() {
//                             if (index < text.length) {
//                                 element.append(text[index++]);
//                                 setTimeout(typeCharacter, interval);
//                             } else {
//                                 resolve();
//                             }
//                         }
//                         typeCharacter();
//                     });
//                 }

//             });
//             loadToLatest();
//         },
//         error: function (xhr, status, message) {
//             console.log("Error: " + message);
//             console.log("Status: " + status);
//             console.dir(xhr);
//             stopLoadingAnimation();
//             alert("錯誤: " + message);
//         }
//     });

//     sendBtn.removeAttribute("disabled");
// }


// // 選擇文件後的處理函數
// // 顯示上傳檔案的名稱
// function selectTextFile(files) {
//     if (!files.length) {
//         return false;
//     }
//     let file = files[0];
//     let reader = new FileReader();
//     let fileDisplayName = file.name;
//     console.log(fileDisplayName);
//     const fileNameElement = document.getElementById('fileName');
//     const filePreview = document.getElementById('filePreview');
//     const uploadedFile = document.getElementById('uploadedFile');
//     const chatInput = document.getElementById('chatInput');
//     filePreview.style.display = 'block';
//     // Display file name
//     fileNameElement.textContent = fileDisplayName;
//     fileNameElement.style.display = 'block'; 
//     // Show the uploaded file container and adjust chatInput top
//     uploadedFile.style.display = 'flex';
//     chatInput.style.top = 'calc(100% - 13%)';
//     reader.readAsDataURL(file);
// }


// function startLoadingAnimation(time, loadingInterval) {

//     let dots = 0;

//     $('.chat-messages').append(`
//         <div class="chat-message-right pb-4 loading_container">
//             <div>
//                 <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
//                     width="40" height="40">
//                 <div class="text-muted small text-nowrap mt-2">${time}</div>
//             </div>
//             <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
//                 <div class="font-weight-bold mb-1"><strong>α</strong></div>
//                 <div id="loading"></div>
//             </div>
//         </div>
//     `);

//     let loadingElement = document.getElementById('loading');

//     loadingInterval = setInterval(() => {
//         loadingElement.textContent = "檢查合約功能需花費 2-3 分鐘，請耐心等待系統回覆" + '.'.repeat(dots);
//         dots = (dots + 1) % 4;
//     }, 500);
// }


// function stopLoadingAnimation(loadingInterval) {
//     clearInterval(loadingInterval);
//     $('.loading_container').remove();
// }

// // 讀取到最新的訊息
// function loadToLatest() {
//     var messagesContainer = document.querySelector(".chat-messages");
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
// }


// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         let cookies = document.cookie.split(';');
//         // console.log('All cookies:', cookies);
//         for (let i = 0; i < cookies.length; i++) {
//             let cookie = cookies[i].trim();
//             // console.log('Processing cookie:', cookie);
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// let csrftoken = getCookie('csrftoken');


// function changeProjectName(newProjectName) {

// }
var currentProjectName = null;


document.querySelector('#messageInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        let message = document.querySelector('#messageInput').value.trim(); // 獲取輸入的文字，並去除前後空格
        let fileInput = document.querySelector('#fileInput'); // 獲取檔案輸入框
        let file = fileInput.files[0]; // 獲取檔案輸入框中的檔案

        // 如果文字和檔案都為空，則不進行任何操作
        if (message === '' && (!file || file.size === 0)) {
            return;
        }

        send_message();
    }
});


document.querySelector('#fileInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        let message = document.querySelector('#messageInput').value.trim(); // 獲取輸入的文字，並去除前後空格
        let fileInput = document.querySelector('#fileInput'); // 獲取檔案輸入框
        let file = fileInput.files[0]; // 獲取檔案輸入框中的檔案

        // 如果文字和檔案都為空，則不進行任何操作
        if (message === '' && (!file || file.size === 0)) {
            return;
        }

        send_message();
    }
});


$("#sendMessage").click(function (event) {
    event.preventDefault();

    send_message();
});


$("#fileInput").click(function (event) {
    document.activeElement.blur();
});


$(".ref-number").click(function (event) {
    console.log("Show reference data");
    document.querySelector(".refData").style.display = "block";
});


// 點擊專案 回傳此專案的聊天紀錄
document.querySelector('.list-group-flush').addEventListener('click', function (event) {
    event.preventDefault();

    var listItem = event.target.closest('.list-group-item');

    // 在聊天室歷史紀錄 Highlight 專案
    if (listItem) {
        event.preventDefault();

        // 移除所有元素的 active 屬性
        document.querySelectorAll('.list-group-item').forEach(function (item) {
            item.classList.remove('active');
        });

        // 為被點擊的元素添加 class="active" 屬性
        listItem.classList.add('active');

        var projectName = listItem.querySelector('.projectName').textContent;
        var projectDate = listItem.querySelector('.projectDate').textContent;
        currentProjectName = projectName;
        console.log("Change current project to " + currentProjectName);
    }

    // 清空聊天紀錄
    document.querySelectorAll('.chat-message-right').forEach(function (item) {
        item.remove();
    });

    $.ajax({
        url: "/select_current_project/",    // API 的位置
        type: "POST",
        dataType: "json",
        data: {
            'projectName': projectName,
            'projectDate': projectDate,
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            console.log("回傳聊天訊息");
            console.log(data);

            if (data.chats == '') {
                document.querySelector('#messageInput').setAttribute('placeholder', '請先上傳檔案');
            }
            else {
                document.querySelector('#messageInput').setAttribute('placeholder', '請輸入訊息');
            }

            data.chats.forEach(function (chats) {
                // 使用者
                if (chats.sender_id != '2') {
                    // 使用者有傳送檔案時
                    if (chats.filePath != '') {
                        var fileUrl = chats.filePath;
                        var filename = chats.content;
                        // fileUrl = fileUrl + '#toolbar=0';
                        currentProjectName = data.projectName;

                        console.log('[Return project history]');
                        // console.log(fileUrl);
                        if (fileUrl.endsWith(".pdf")) {
                            append_user_message_with_file(chats.content, chats.time, fileUrl);
                        }
                        else if (fileUrl.endsWith(".docx")) {
                            append_user_message_with_docx_file(chats.content, chats.time, filename);
                        }
                    }
                    // 使用者沒有傳送檔案
                    else {
                        $('.chat-messages').append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
                                        width="40" height="40">
                                    <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                    <div class="font-weight-bold mb-1"><strong>You</strong></div>
                                    ${chats.content}
                                </div>
                            </div>
                        `)
                        loadToLatest();
                    }
                }
                // 系統回覆訊息
                else if (chats.sender_id == '2') {
                    // 系統回覆不是檢查合約時
                    if (chats.filePath == '') {

                        if (chats.content == '') {
                            chats.content = "出現錯誤，請再次操作";
                        }
                        $('.chat-messages').append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
                                        width="40" height="40">
                                    <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
                                    <div class="font-weight-bold mb-1"><strong>α</strong></div>
                                    <div class="message" style="white-space: pre-line;">
                                    ${chats.content}
                                    </div>
                                </div>
                            </div>
                        `);
                    }
                    else {
                        var relevant_counter = 1;
                        console.log(chats.llm_gen.refData);

                        const messagesHtml = chats.llm_gen.map(item => `
                            <div class="message-container">
                                <div class="contract">
                                    <strong>合約內容:<br></strong> 
                                    <div class="contract-content" style="white-space: pre-line;">
                                        ${item.contract_content}
                                    </div>
                                </div>
                                <div class="relevant">
                                    <strong>相關法規:</strong>
                                    <div class="message" style="white-space: pre-line;">
                                        ${item.genContent}
                                    </div>
                                    ${item.refData ? `<a class="ref-number">[${relevant_counter++}]</a>` : ''}
                                </div>
                                ${item.refData ? `<div class="refData">${item.refData}</div>` : ''}
                                <br>
                            </div>
                        `).join('');


                        var fileUrl = chats.filePath;

                        $('.chat-messages').append(`
                            <div class="chat-message-right pb-4">
                                <div>
                                    <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
                                        width="40" height="40">
                                    <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
                                    <div class="font-weight-bold mb-1"><strong>α</strong></div>
                                    ${messagesHtml}
                                    <br>
                                    <a href=${fileUrl} class="download-btn" download>
                                        下載結果文件
                                    </a>
                                </div>
                            </div>
                        `);

                    }

                    $('.contract').off('click', '.contract-content').on('click', '.contract-content', function (e) {
                        e.stopPropagation();
                        var $relevant = $(this).closest('.message-container').find('.relevant');
                        if ($relevant.attr('show')) {
                            $relevant.removeAttr('show');
                            $relevant.hide();
                        } else {
                            $relevant.attr('show', true);
                            $relevant.show();
                        }
                    });

                    $('.relevant').off('click', '.ref-number').on('click', '.ref-number', function (e) {
                        e.stopPropagation();
                        var $refData = $(this).closest('.relevant').next('.refData');
                        if ($refData.attr('show')) {
                            $refData.removeAttr('show');
                            $refData.hide();
                        } else {
                            $refData.attr('show', true);
                            $refData.show();
                        }
                    });

                    loadToLatest();
                }
            });
            loadToLatest();
        },
    });
    loadToLatest();
});


// 建立一個新的專案
document.querySelector('.newProject').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('New Project');
    console.log('Mode: ' + mode);
    $.ajax({
        url: "/create_project/",    // API 的位置
        type: "POST",
        data: {
            'type': 'create_project',
            'mode': mode,
        },
        dataType: "json",  // 預期服務器回傳的數據類型
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            console.log(data);

            if (currentProjectName == null) {
                currentProjectName = data.projectName;

                // 清空聊天紀錄
                document.querySelectorAll('.chat-message-right').forEach(function (item) {
                    item.remove();
                });

                $('.list-group-flush').append(`
                    <a href="" class="list-group-item list-group-item-action py-3 lh-tight active">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1 projectName">${data.projectName}</strong>
                            <small class="text-muted projectDate">${data.date}</small>
                        </div>
                    </a>
                `);

            }
            else {
                $('.list-group-flush').append(`
                    <a href="" class="list-group-item list-group-item-action py-3 lh-tight">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1 projectName">${data.projectName}</strong>
                            <small class="text-muted projectDate">${data.date}</small>
                        </div>
                    </a>
                `);
            }
        },
        error: function (xhr, status, message) {
            console.log("Error: " + message);
            console.log("Status: " + status);
            console.dir(xhr);
            alert("錯誤: " + error);
        }
    });
});


// 網頁讀取完畢接收所有專案名稱
$(document).ready(function () {
    $.ajax({
        url: "/get_all_projects/",  // API 的位置，需要根據你的後端路由設定來修改
        type: "GET",
        data: { "mode": mode },
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            console.log(data);
            // 假設 data 是一個包含所有專案的陣列
            data.forEach(function (project) {
                // 為每一個專案創建一個新的元素
                $('.list-group-flush').append(`
                    <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1 projectName">${project.projectName}</strong>
                            <small class="text-muted projectDate">${project.date}</small>
                        </div>
                    </a>
                `);

            });
        }
    });
});


// 右鍵選單: 編輯名稱、刪除
$(function () {
    var items = {
        "edit": { name: "編輯名稱", icon: "edit" },
        "sep1": "---------",
        "delete": { name: "刪除", icon: "delete" },
    }

    $.contextMenu({
        selector: '.list-group-item',
        callback: function (key, options) {
            var m = "clicked: " + key;
            var event = options.$trigger[0];

            console.log(event);

            switch (key) {
                case 'edit':
                    console.log('編輯專案名稱');
                    var listItem = options.$trigger[0];
                    var projectNameElement = listItem.querySelector('.mb-1');
                    var projectDate = listItem.querySelector('.projectDate').textContent;

                    if (projectNameElement) {
                        var projectName = projectNameElement.textContent;
                        var parentElement = projectNameElement.parentNode;

                        // 創建一個新的輸入框元素
                        var inputElement = document.createElement('input');
                        inputElement.type = 'text';
                        inputElement.value = projectName;

                        // 當輸入框失去焦點時，將輸入框替換回原本的元素
                        inputElement.addEventListener('blur', function () {
                            var newProjectName = inputElement.value;

                            // 如果新的專案名稱與原始的專案名稱不同，且超過 15 個字符，則只取前 15 個字符
                            if (newProjectName !== projectName && newProjectName.length > 20) {
                                newProjectName = newProjectName.substring(0, 20);
                            }
                            else if (newProjectName == projectName) {
                                console.log("還原名稱")
                                var originalProjectNameElement = document.createElement('strong');
                                originalProjectNameElement.className = 'mb-1 projectName';
                                originalProjectNameElement.textContent = projectName;

                                parentElement.replaceChild(originalProjectNameElement, inputElement);
                            }

                            // 傳送 ajax 請求更新專案名稱
                            $.ajax({
                                url: "/change_project_name/",    // API 的位置
                                type: "POST",
                                dataType: "json",
                                data: {
                                    // 舊名稱用來辨識後端專案名稱
                                    // 新名稱用來更新專案名稱
                                    'newProjectName': newProjectName,
                                    'projectName': projectName,
                                    'projectDate': projectDate,
                                },
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                },
                                success: function (data) {
                                    console.log(data);
                                    // 創建一個新的 projectNameElement
                                    var newProjectNameElement = document.createElement('strong');
                                    newProjectNameElement.className = 'mb-1 projectName';
                                    newProjectNameElement.textContent = newProjectName;
                                    currentProjectName = newProjectName;

                                    // 清空聊天紀錄
                                    document.querySelectorAll('.chat-message-right').forEach(function (item) {
                                        item.remove();
                                    });

                                    parentElement.replaceChild(newProjectNameElement, inputElement);
                                },
                                error: function (xhr, status, message) {
                                    console.log("Error: " + message);
                                    // 更新失敗，將名稱還原回原來名稱
                                    var originalProjectNameElement = document.createElement('strong');
                                    originalProjectNameElement.className = 'mb-1 projectName';
                                    originalProjectNameElement.textContent = projectName;

                                    parentElement.replaceChild(originalProjectNameElement, inputElement);
                                }
                            });


                        });

                        // 將原本的元素替換為輸入框
                        parentElement.replaceChild(inputElement, projectNameElement);

                        // 自動將焦點設定到輸入框
                        inputElement.focus();
                    }
                    break;
                case 'delete':
                    console.log('刪除專案');

                    var listItem = options.$trigger[0];
                    if (listItem) {
                        listItem.remove(this);

                        // 傳送 ajax 請求刪除專案
                        var projectName = listItem.querySelector('.projectName').textContent;
                        var projectDate = listItem.querySelector('.projectDate').textContent;

                        $.ajax({
                            url: "/delete_project/",    // API 的位置
                            type: "POST",
                            dataType: "json",
                            data: {
                                'projectName': projectName,
                                'projectDate': projectDate,
                            },
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                            },
                            success: function (data) {
                                listItem.remove(this);

                                if (currentProjectName == projectName) {
                                    currentProjectName = null;
                                    // 清空聊天紀錄
                                    document.querySelectorAll('.chat-message-right').forEach(function (item) {
                                        item.remove();
                                    })
                                }
                            },
                            error: function (xhr, status, message) {
                                console.log("Error: " + message);
                                console.log("Status: " + status);
                                console.dir(xhr);
                            }
                        });
                    }

            }
        },
        items: items
    });

    $('.list-group-item').on('contextmenu', function (e) {
        e.preventDefault();
    })
});


// 沒有選擇專案的狀態，先建立一個聊天室
async function create_project_before_select() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/create_project/",    // API 的位置
            type: "POST",
            data: {
                'type': 'create_project',
                'mode': mode,
            },
            dataType: "json",  // 預期服務器回傳的數據類型
            // CSRF Token
            beforeSend: function (xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
            success: function (data) {
                currentProjectName = data.projectName;
                console.log(data);

                // 移除所有元素的 active 屬性
                document.querySelectorAll('.list-group-item').forEach(function (item) {
                    item.classList.remove('active');
                });

                // 建立一個新的專案
                // 例如，您可以更新頁面的某一部分，或者顯示一個訊息給用戶
                // 最下面的 div 要有摘要
                $('.list-group-flush').append(`
                    <a href="" class="list-group-item list-group-item-action py-3 lh-tight active">
                        <div class="d-flex w-100 align-items-center justify-content-between">
                            <strong class="mb-1 projectName">${data.projectName}</strong>
                            <small class="text-muted projectDate">${data.date}</small>
                        </div>
                    </a>
                `);

                resolve(data);
            },
            error: function (xhr, status, message) {
                console.log("Error: " + message);
                console.log("Status: " + status);
                console.dir(xhr);
                alert("錯誤: " + message);
                reject(new Error(message));
            }
        });
    });
}


function append_user_message_without_file(message, time) {
    $('.chat-messages').append(`
        <div class="chat-message-right pb-4">
            <div>
                <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
                    width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                <div class="font-weight-bold mb-1"><strong>You</strong></div>
                ${message}
            </div>
        </div>
    `);
    loadToLatest();
}


function append_user_message_with_file(message, time, fileUrl) {
    $('.chat-messages').append(`
        <div class="chat-message-right pb-4">
            <div>
                <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
                    width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" style="overflow: auto">
                <div class="font-weight-bold mb-1"><strong>You</strong></div>
                ${message}
                <br>
                <iframe src=${fileUrl} type="application/pdf" width="80%" height="500px" class="message-container user-message-file"></iframe>
            </div>
        </div>
    `);
    loadToLatest();
}


function append_user_message_with_docx_file(message, time, filename) {
    $('.chat-messages').append(`
        <div class="chat-message-right pb-4">
            <div>
                <img src="${logo1Url}" class="rounded-circle mr-1" alt="Chris Wood"
                    width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3" style="overflow: auto">
                <div class="font-weight-bold mb-1"><strong>You</strong></div>
                ${message}
                <br>
                <div>已處理檔案: ${filename}</div>
            </div>
        </div>
    `);
    loadToLatest();
}


async function send_message() {
    let sendBtn = document.getElementById('sendMessage');
    let message = document.getElementById('messageInput').value.trim(); // 獲取輸入的文字，並去除前後空格
    let fileInput = document.getElementById('fileInput'); // 獲取檔案輸入框
    let file = fileInput.files[0]; // 獲取檔案輸入框中的檔案

    // 如果文字和檔案都為空，則不進行任何操作
    if (message === '' && (!file || file.size === 0)) {
        return;
    }

    sendBtn.setAttribute("disabled", "disabled");

    // 清空輸入
    document.getElementById('messageInput').value = ''; // 清空文字輸入框
    document.getElementById('fileInput').value = '';    // 清空檔案輸入框
    $('#fileName').text(''); // 清空顯示的檔案名稱
    $('#filePreview').hide(); // 清空顯示的檔案圖示
    $('#uploadedFile').hide(); // 隱藏檔案顯示區域
    $('#chatInput').css('top', 'calc(100% - 10%)'); // 恢復 chatInput 的原始位置

    // 沒有選擇專案
    if (currentProjectName == null) {
        // 建立一個新的專案
        await create_project_before_select();
        console.log("Project Created");
    }

    // 顯示訊息時間
    const dateObj = new Date()          //  輸入 timestamp（毫秒），回傳設定的時間物件
    dateObj.getTime()                   //  輸入時間物件，回傳特定時間的 timestamp（毫秒)
    minutes = dateObj.getMinutes();
    second = dateObj.getSeconds();
    time = dateObj.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (second < 10 ? '0' + second : second) + ' ' + (dateObj.getHours() >= 12 ? 'PM' : 'AM');

    docx_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    pdf_type = 'application/pdf';

    // 顯示使用者輸入訊息
    // 沒有檔案的情況
    if (file == null) {
        append_user_message_without_file(message, time);
    }
    // 有檔案的情況
    else {
        let formData = new FormData();
        var fileUrl;

        // 辨識檔案格式做不同處理
        if (file.type === docx_type) {
            filename = file.name;
            append_user_message_with_docx_file(file.name, time, filename);
        }
        else if (file.type === pdf_type) {
            fileUrl = URL.createObjectURL(file);
            append_user_message_with_file(message, time, fileUrl);
        }
    }

    // return;

    // 將資料放入 formData 中
    console.log("Put into form message: " + message);
    formData = new FormData();
    formData.append('message', message);    // 將文字添加到 formData 中
    formData.append('time', time);
    formData.append('projectName', currentProjectName);  // 將專案名稱添加到 formData 中
    formData.append('mode', mode);  // 將模式添加到 formData 中
    if (file && file.size > 0) {
        formData.append('file', file);  // 如果有檔案，則將檔案添加到 formData 中
    }

    let loadingInterval;
    startLoadingAnimation(time, loadingInterval);

    $.ajax({
        url: "/send_message/",                // 打API的位置
        type: "POST",
        data: formData,
        processData: false,              // 不預處理數據 FormData 已做
        contentType: false,              // 不指定編碼 FormData 已做
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            stopLoadingAnimation(); // 等待動畫

            // console.log(data);
            // console.log("Chats: ");
            // console.log(data.chats);

            document.querySelector('#messageInput').setAttribute('placeholder', '請輸入訊息');

            data.chats.forEach(function (chats) {
                console.log("Chats");
                console.log(chats);
                if (chats.filePath == "") {
                    console.log("Normal message");
                    if (chats.content == "") {
                        chats.content = "出現錯誤，請再次操作";
                    }
                    $('.chat-messages').append(`
                        <div class="chat-message-right pb-4">
                            <div>
                                <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
                                    width="40" height="40">
                                <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
                                <div class="font-weight-bold mb-1"><strong>α</strong></div>
                                <div class="message" style="white-space: pre-line;">
                                ${chats.content}
                                </div>
                            </div>
                        </div>
                    `);
                }
                else {
                    console.log("Contract check");
                    var relevant_counter = 1;
                    const messagesHtml = chats.llm_gen.map(item => `
                        <div class="message-container">
                            <div class="contract">
                                <strong>合約內容:<br></strong> 
                                <div class="contract-content" style="white-space: pre-line;">
                                    ${item.contract_content}
                                </div>
                            </div>
                            <div class="relevant">
                                <strong>相關法規:</strong>
                                <div class="message" style="white-space: pre-line;">
                                    ${item.genContent}
                                </div>
                                ${item.refData ? `<a class="ref-number">[${relevant_counter++}]</a>` : ''}
                                </div>
                                ${item.refData ? `<div class="refData">${item.refData}</div>` : ''}
                            <br>
                        </div>
                    `).join('');

                    var fileUrl = chats.filePath;

                    $('.chat-messages').append(`
                        <div class="chat-message-right pb-4">
                            <div>
                                <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
                                    width="40" height="40">
                                <div class="text-muted small text-nowrap mt-2">${chats.time}</div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
                                <div class="font-weight-bold mb-1"><strong>α</strong></div>
                                ${messagesHtml}
                                <br>
                                <a href=${fileUrl} class="download-btn" download>
                                    下載結果文件
                                </a>
                            </div>
                        </div>
                    `);

                }


                // 滑鼠點擊合約條文上會顯示相關法規
                $('.chat-messages').off('click', '.contract-content').on('click', '.contract-content', function (e) {
                    e.stopPropagation();
                    var $relevant = $(this).closest('.message-container').find('.relevant');
                    if ($relevant.attr('show')) {
                        $relevant.removeAttr('show');
                        $(this).closest('.relevant').next('.refData').removeAttr('show');
                        $(this).closest('.relevant').next('.refData').hide();
                        $relevant.hide();
                    } else {
                        $relevant.attr('show', true);
                        $relevant.show();
                    }
                });
                loadToLatest();

                // 顯示參考資料
                $('.relevant').off('click', '.ref-number').on('click', '.ref-number', function (e) {
                    e.stopPropagation();
                    var $refData = $(this).closest('.relevant').next('.refData');
                    if ($refData.attr('show')) {
                        $refData.removeAttr('show');
                        $refData.hide();
                    } else {
                        $refData.attr('show', true);
                        $refData.show();
                    }
                });


                function displayText(element, text, index, interval) {
                    return new Promise(resolve => {
                        function typeCharacter() {
                            if (index < text.length) {
                                element.append(text[index++]);
                                setTimeout(typeCharacter, interval);
                            } else {
                                resolve();
                            }
                        }
                        typeCharacter();
                    });
                }

            });
            loadToLatest();
        },
        error: function (xhr, status, message) {
            console.log("Error: " + message);
            console.log("Status: " + status);
            console.dir(xhr);
            stopLoadingAnimation();
            alert("錯誤: " + message);
        }
    });

    sendBtn.removeAttribute("disabled");
    loadToLatest();
}


// 選擇文件後的處理函數
// 顯示上傳檔案的名稱
function selectTextFile(files) {
    if (!files.length) {
        return false;
    }
    let file = files[0];
    let reader = new FileReader();
    let fileDisplayName = file.name;
    console.log(fileDisplayName);
    const fileNameElement = document.getElementById('fileName');
    const filePreview = document.getElementById('filePreview');
    const uploadedFile = document.getElementById('uploadedFile');
    const chatInput = document.getElementById('chatInput');
    filePreview.style.display = 'block';
    // Display file name
    fileNameElement.textContent = fileDisplayName;
    fileNameElement.style.display = 'block'; 
    // Show the uploaded file container and adjust chatInput top
    uploadedFile.style.display = 'flex';
    chatInput.style.top = 'calc(100% - 13%)';
    reader.readAsDataURL(file);
}

function startLoadingAnimation(time, loadingInterval) {

    let dots = 0;

    $('.chat-messages').append(`
        <div class="chat-message-right pb-4 loading_container">
            <div>
                <img src="${logo2Url}" class="rounded-circle mr-1" alt="Chris Wood"
                    width="40" height="40">
                <div class="text-muted small text-nowrap mt-2">${time}</div>
            </div>
            <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3 system_message">
                <div class="font-weight-bold mb-1"><strong>α</strong></div>
                <div id="loading"></div>
            </div>
        </div>
    `);

    let loadingElement = document.getElementById('loading');

    loadingInterval = setInterval(() => {
        loadingElement.textContent = "檢查合約功能需花費 3 ~ 4 分鐘，請耐心等待系統回覆" + '.'.repeat(dots);
        dots = (dots + 1) % 4;
    }, 500);
}


function stopLoadingAnimation(loadingInterval) {
    clearInterval(loadingInterval);
    $('.loading_container').remove();
}

// 讀取到最新的訊息
function loadToLatest() {
    var messagesContainer = document.querySelector(".position-relative");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        // console.log('All cookies:', cookies);
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // console.log('Processing cookie:', cookie);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');


function changeProjectName(newProjectName) {

}


