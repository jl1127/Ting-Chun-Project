function readURL(input) {
    if (input.files && input.files[0]) {
      var fileName = input.files[0].name;
      document.getElementById('file-name').innerText = "已選擇檔案: " + fileName;
      document.getElementById('file-info').style.display = 'block';
    }
  }
  
  document.querySelector('.file-upload-input').addEventListener('change', function() {
    readURL(this);
  });
  