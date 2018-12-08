// initial topic variables
var topics = [
  "The Office",
  "Jim Halpert",
  "Dwight Shrute",
  "Michael Scott",
  "Kevin Malone",
  "Creed Bratton",
  "Toby Flenderson",
  "Pam Beesly",
  "Meredith Palmer",
  "Angela Martin",
  "Gabe Lewis",
  "Oscar Martinez"
];
var userTopics = $("#topicInput");

$(document).ready(function() {
  // for loop for creating Inital Topic Buttons from above and appends them. Learned to use curly brackets to grab a variable within jquery. Added bootstrap classes to add styling when they are appended.
  for (i = 0; i < topics.length; i++) {
    $("#topicButtons").append(
      `<button id="${topics[i]}" class="topicButtons btn btn-primary">${
        topics[i]
      }</button>`
    );
  }

  //submit button
  $("#submitButton").click(userInput);

  // Submit Button Function
  function userInput(e) {
    e.preventDefault();

    // Keeps Users From Being Able to Add Multiple of the Same Topic
    if (topics.indexOf(userTopics.val()) === -1) {
      topics.push(userTopics.val());
      $("#topicButtons").append(
        `<button id="${userTopics.val()}" class="topicButtons btn btn-primary">${userTopics.val()}</button>`
      );
    }
  }

  // Activates and Controls Topic Buttons, when clicked it will fetch gifs from the api
  $(document).on("click", ".topicButtons", function(event) {
    $("#topicGIFs").empty();

    // Set Var for Giphy API
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=AttVip230BugV7EkTVWyqtcdLXTohkOw&q=" +
      event.target.id +
      "&limit=10&offset=0&rating=PG&lang=en";

    // API Function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      // Loop for Displaying GIF Responses, curl brackets to grab data from the object and uses html to append ratings, also sets the gifs to be still once loaded.
      for (var i = 0; i < response.data.length; i++) {
        $("#topicGIFs").append(
          `<div class="gifDivs"><p>Rating: ${
            response.data[i].rating
          }</p><img src='${
            response.data[i].images.fixed_height_still.url
          }' data-still='${
            response.data[i].images.fixed_height_still.url
          }' data-animate='${
            response.data[i].images.fixed_height.url
          }' data-state='still' width='200px' height='200px' class='GIFs'></div>`
        );
      }

      // Function for Playing/Pausing Gifs. if clicked then will begin to play, clicked again to stop
      $(".GIFs").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
          var animateURL = $(this).attr("data-animate");
          $(this).attr("src", animateURL);
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  });
});
