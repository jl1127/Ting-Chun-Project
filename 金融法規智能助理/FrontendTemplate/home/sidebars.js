/* global bootstrap: false */
(function () {
  'use strict'
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()
document.getElementById('uploadFileButton').addEventListener('click', function() {
  document.getElementById('fileInput').click(); // Trigger the file input click
});
document.getElementById('uploadImageButton').addEventListener('click', function() {
  document.getElementById('imageInput').click(); // Trigger the file input click
});