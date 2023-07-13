$(document).ready(function() {
  // Calculate and display the amount of characters remaining to be used when typing tweet
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

    // Reset the character count that is displayed to 140 once a user submits the form
    $('#tweet-form').on('submit', function() {
      charCount = 140;
      numElement.text(charCount);
    });
  });
});