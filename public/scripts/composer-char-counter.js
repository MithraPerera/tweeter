$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let charCount = 140 - ($(this).val().length);
    let numElement = $(this).next().children().next();
    numElement.text(charCount);
    if (charCount < 0) {
      numElement.text(charCount);
      numElement.css('color', '#8f0001');
    } else {
      numElement.css('color', '#545149');
    }
  });
});