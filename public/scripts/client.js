/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// import { format } from 'timeago.js';

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // First clear out any existing tweets that were rendered on the page
    $('#tweets').empty();
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }

  const escape = function(str) {
    let article = document.createElement("article");
    article.appendChild(document.createTextNode(str));
    return article.innerHTML;
  };

  const createTweetElement = function(data) {
    return `
        <div class="tweet-container">
          <header>
            <div id="tweet-profile-name">
              <img src="${data["user"]["avatars"]}" class="profile-pic">
              <div>${data["user"]["name"]}</div>
            </div>
            <div>${data["user"]["handle"]}</div>
          </header>
          <article>${escape(data["content"]["text"])}</article>
          <footer>
            <div>${timeago.format(data["created_at"])}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </div>
      `;
  };

  const loadTweets = function() {
    // $.ajax({
    //   url: '/tweets',
    //   data: $(this).serialize(),
    //   success: renderTweets(data)
    // });
    $.get('/tweets', function(tweets) {
      console.log(tweets);
      renderTweets(tweets);
    });
  };

  // Initial call to the database to load any tweets at the moment of first loading the page
  loadTweets();

  // Add an Event Listener and Prevent the Default Behaviour
  $("form").on("submit", function(event) {
    event.preventDefault();
    // console.log($(this).serialize());
    let data = $(this).serialize();

    if (data === "text=" || data === null) {
      $('#tweet-error-text').text('Error: No tweet has been typed.');
      $('.tweet-error').slideDown('slow');
      $('.tweet-error').css('display', 'flex');
    } else if (140 - ($("#tweet-text").val().length) < 0) {
      $('#tweet-error-text').text('Error: Tweet is too long.');
      $('.tweet-error').slideDown('fast');
      $('.tweet-error').css('display', 'flex');
    } else {
      $('.tweet-error').slideUp(1000);
      setTimeout(() => {
        $('.tweet-error').css('display', 'none');
      }, 900);
      // Serialize the form data and send it to the server as a query string.
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: data,
        success: function() {
          console.log("POST worked");
          loadTweets();
          $("form").trigger("reset");
        },
      });
    }
  });
});