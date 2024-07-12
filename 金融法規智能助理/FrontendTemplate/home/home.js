<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
$(".sendMessage").click(function () {
    console.log("Send message test");
    let formData = new FormData($("#upload-form")[0]);
    var fileMsg = $("#fileMsg");
    $.ajax({
        url: "/uploads/",                // 打API的位置
        type: "post",
        data: formData,
        // 以下必須寫
        processData: false,              // 不預處理數據 FormData 已做
        contentType: false,              // 不指定編碼 FormData 已做
        success: function (data) {
            console.log(data);
            fileMsg.text(data);         // 將訊息顯示在 fileMsg
        }
    });
});

document.querySelector('.newProject').addEventListener('click', function (event) {
    event.preventDefault();
    console.log('New Project');
    $.ajax({
        url: "/main_create_project/",    // API 的位置
        type: "POST",
        data: JSON.stringify({ 'type': 'create_project' }),  // 要傳送的數據
        contentType: "application/json; charset=utf-8",  // 設定請求的內容類型為 JSON
        dataType: "json",  // 預期服務器回傳的數據類型
        success: function (data) {
            console.log(data);
            // 在這裡添加您的代碼，這個代碼會在請求成功時執行
            // 例如，您可以更新頁面的某一部分，或者顯示一個訊息給用戶
            // 最下面的 div 要有摘要
            $('.list-group-flush').append(`
                <a href="#" class="list-group-item list-group-item-action py-3 lh-tight">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <strong class="mb-1">${data.projectName}strong>
                        <small class="text-muted">${data.date}</small>
                    </div>
                    <div class="col-10 mb-1 small">Some placeholder content in a paragraph below the heading and date.</div>
                </a>
            `);
        },
        error: function (xhr, status, message) {
            console.log("Error: " + message);
            console.log("Status: " + status);
            console.dir(xhr);
            alert("錯誤: " + error);
        }
    });
});