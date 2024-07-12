let selectedButtonId = null;

function buttonClicked(buttonId) {
    // 記住被選中的按鈕
    selectedButtonId = buttonId;
    console.log("Button " + buttonId + " was clicked.");
}


function nextStep1() {
    if (selectedButtonId === null) {
        alert("請先選擇一個合約！");
        return;
    }
    const baseUrl = "http://127.0.0.1:8000/contract_generator/";
    let url = baseUrl + 'index.html';
    switch (selectedButtonId) {
        case 'service':
            url = baseUrl + "service_contract";
            console.log("Redirecting to URL: ", url);
            break;
        case 'purchase':
            url = baseUrl + 'purchase_contract';
            console.log("Redirecting to URL: ", url);
            break;
        case 'maintain':
            url = baseUrl + 'maintainContract.html';
            break;
        case 'develop':
            url = baseUrl + 'developContract.html';
            break;
    }
    window.location.href = url;
}




