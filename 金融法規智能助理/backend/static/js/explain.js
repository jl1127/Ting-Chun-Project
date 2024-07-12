// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelector('.file-upload-input').addEventListener('change', function() {
//       readURL(this);
//   });
// });

// function readURL(input) {
//     if (input.files && input.files[0]) {
//       var fileName = input.files[0].name;
//       document.getElementById('file-name').innerText = "已選擇檔案: " + fileName;
//       document.getElementById('file-info').style.display = 'block';
//     }
//   }

  // document.querySelector('.file-upload-input').addEventListener('change', function() {
  //   readURL(this);
  // });


document.addEventListener('DOMContentLoaded', function() {
    var fileUploadInput = document.querySelector(".file-upload-input");
    if (fileUploadInput) {
        fileUploadInput.addEventListener('change', function() {
            readURL(this);
        });
    } else {
        console.error('Element with class "file-upload-input" not found');
    }
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var fileName = input.files[0].name;
        document.getElementById('file-name').innerText = "已選擇檔案: " + fileName;
        document.getElementById('file-info').style.display = 'block';
    }
}