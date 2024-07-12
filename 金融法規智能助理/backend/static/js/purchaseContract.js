function generatePurchaseContract(){

    // 取得表單元素
    const form = document.querySelector('form');

    // 取得所有的 input、textarea 元素
    const inputs = form.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');

    // 建立一個空物件來存放欄位資訊
    const formData = {};

    // 迭代每個 input、textarea 元素，將其 id 和值加入到 formData 物件中
    formData["contract_type"] = "purchase"
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    textareas.forEach(textarea => {
    formData[textarea.id] = textarea.value;
    });

    // 轉換為 json 格式
    const userRequest = JSON.stringify(formData);
    console.log(userRequest);

    // 將 userRequest 儲存到會話 session 中
    sessionStorage.setItem('userRequest', userRequest);

    // 跳轉頁面
    window.location.href = "http://127.0.0.1:8000/contract_generator/generate_contract/";
}

/* 回到上一頁 */
function LastStep(){
    baseUrl = "http://127.0.0.1:8000/contract_generator/";
    var url = baseUrl;
    console.log("Redirecting to URL: ", url);
    window.location.href = url;
}
