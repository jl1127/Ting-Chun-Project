$("#btnCheck").click(function (event) {
    console.log("contract_check");
    console.log(csrftoken);
    $.ajax({
        url: "/change_mode/",
        type: "POST",
        data: {
            mode: "contract_check",
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/main/contract_check");
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#btnExplain").click(function (event) {
    console.log("marker");
    $.ajax({
        url: "/change_mode/",
        type: "POST",
        data: {
            mode: "marker"
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/marker");
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#btnGenerate").click(function () {
    console.log("contract_gen");
    $.ajax({
        url: "/change_mode/",
        type: "POST",
        data: {
            mode: "contract_gen",
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        success: function (data) {
            location.replace("/contract_gen/");
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