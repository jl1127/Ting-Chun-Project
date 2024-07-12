function loadScript(url, callback) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    script.onerror = function() {
        console.error('Failed to load script: ' + url);
    };
    document.head.appendChild(script);
}

function generateContract() {
    // Retrieve userRequest from session storage
    const userRequest = sessionStorage.getItem('userRequest');
    let userRequestObj;

    // Validate JSON and contract type
    try {
        userRequestObj = JSON.parse(userRequest); // Parse JSON string to object
        console.log('Parsed userRequest:', userRequestObj);
    } catch (e) {
        console.error('Invalid JSON:', e);
        alert('Invalid request data. Please try again.');
        return;
    }

    const contractType = userRequestObj["contract_type"];
    if (!contractType) {
        console.error('Contract type is missing in userRequest');
        return;
    }

    // Determine the appropriate URL based on contract type
    let url = '';
    if (contractType === "service") {
        url = 'http://127.0.0.1:8000/contract_generator/service_contract/service_contract_generate_api/';
    } else if (contractType === "purchase") {
        url = 'http://127.0.0.1:8000/contract_generator/purchase_contract/purchase_contract_generate_api/';
    } else {
        console.error('Unsupported contract type:', contractType);
        return;
    }

    // Perform the fetch request to generate the contract
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userRequestObj), // Ensure valid JSON string is sent
    })
    .then(response => {
        if (!response.ok) {
            console.error('Server responded with:', response.status, response.statusText);
            return response.text().then(text => { throw new Error(text); });
        }
        return response.json();
    })
    .then(data => {
        console.log('Response data:', data);
        const contractContent = data.contract_content;

        // Remove spinner
        const spinner = document.getElementById('spinner');
        if (spinner) {
            spinner.remove();
        } else {
            console.error('Spinner element not found.');
        }

        // Display the editor with contract content
        const editorElement = document.getElementById('editor1');
        if (editorElement) {
            editorElement.style.display = 'block';
            loadScript('https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js', () => {
                CKEDITOR.replace('editor1', {
                    height: '450px',
                    on: {
                        instanceReady: function() {
                            const button = document.getElementById('cke_33');
                            if (button) {
                                button.click();
                                this.setData(contractContent);
                                setTimeout(() => {
                                    button.click();
                                }, 100);
                            } else {
                                console.error('CKEditor button not found.');
                            }
                        }
                    }
                });
            });
        } else {
            console.error('Editor element not found.');
        }

        // Display the download area
        const downloadArea = document.getElementById('downloadArea');
        if (downloadArea) {
            console.log("Download area found, setting display to block.");
            downloadArea.style.display = "block";
        } else {
            console.error("Download area not found.");
        }

        const btnDownload = document.getElementById('btnDownload');
        if (btnDownload) {
            console.log("Download button found, setting display to block.");
            btnDownload.style.display = "block";
        } else {
            console.error("Download button not found.");
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred while generating the contract. Please check the server logs for more details.');
    });

    // Clear userRequest from session storage
    sessionStorage.removeItem('userRequest');
}


// function backtoGenarate() {
//     const baseUrl = "http://127.0.0.1:8000/contract_generator/";
//     const url = baseUrl + "service_contract";
//     console.log("Redirecting to URL: ", url);
//     window.location.href = url;
// }

// function generateContract() {
//     // 從本地存儲或會話存儲中獲取 userRequest 數據
//     const userRequest = sessionStorage.getItem('userRequest');
//     const userRequestObj = JSON.parse(userRequest); // 將 JSON 字符串解析為 JavaScript 物件
//     const contractType = userRequestObj["contract_type"];

//     if (userRequest) {
//         let url = '';
//         if (contractType === "service") {
//             url = 'http://127.0.0.1:8000/contract_generator/service_contract/service_contract_generate_api/';
//         } else if (contractType === "purchase") {
//             url = 'http://127.0.0.1:8000/contract_generator/purchase_contract/purchase_contract_generate_api/';
//         } else {
//             console.error('Unsupported contract type:', contractType);
//             return;
//         }

//         fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: userRequest,
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             const contractContent = data.contract_content;
//             // //移除轉圈圈
//             // document.getElementById('spinner').remove();

//             // 顯示 textarea
//             const editorElement = document.getElementById('editor1');
//             editorElement.style.display = 'block';

//             // 讀取 ckeditor
//             loadScript('https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js', () => {
//                 CKEDITOR.replace('editor1', {
//                     // height: '450px',
//                      on: {
//                         instanceReady: function() {
//                             // 點擊原始碼按鈕
//                             const button = document.getElementById('cke_33');
//                             button.click();

//                             // 加入編輯器內容
//                             this.setData(contractContent);

//                              // 再次點擊原始碼按鈕
//                             setTimeout(() => {
//                                 button.click();
//                             }, 100);
//                         }
//                     }
//                 });
//             });
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });

//         // 清除本地存儲或會話存儲中的 userRequest，以防止重複使用
//         sessionStorage.removeItem('userRequest');
//     }
// }


function getEditorContent() {
    return CKEDITOR.instances.editor1.getData();
}

function downloadWordFile() {
    const editorContent = getEditorContent();
    const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
                   'xmlns:w="urn:schemas-microsoft-com:office:word" ' +
                   'xmlns="http://www.w3.org/TR/REC-html40">';
    const styles = '<style>body { font-family: Arial; }</style>';
    const footer = '</html>';

    const sourceHTML = header + styles + '<body>' + editorContent + '</body>' + footer;

    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = '合約草案.docx';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

document.getElementById('btnDownload').addEventListener('click', downloadWordFile);
