$("#btnCheck").click(function (event) {
    console.log("contract_check");
    console.log(csrftoken);
    $.ajax({
        url: "/contract_check/",
        type: "POST",
        data: {
            mode: "contract_check",
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/contract_check");
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#btnGenerate").click(function () {
    console.log("contract_generator");
    $.ajax({
        url: "/contract_generator/",
        type: "POST",
        data: {
            mode: "contract_generator",
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/contract_generator");
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#btnExplain").click(function (event) {
    console.log("contract_explain");
    $.ajax({
        url: "/contract_explain/",
        type: "POST",
        data: {
            mode: "contract_explain"
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/contract_explain");
        },
        error: function (error) {
            console.log(error);
        }
    });
});



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        console.log('All cookies:', cookies);
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            console.log('Processing cookie:', cookie);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
let csrftoken = getCookie('csrftoken');
console.log('CSRF Token:', csrftoken);