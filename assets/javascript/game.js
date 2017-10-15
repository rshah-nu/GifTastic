    //Global variables to toggle between animated and still gifs
    var emotionsAnimatedImage
    var emotionsStillImage

    //Initial array of emotions for initial buttons
  	var emotions = ["happy", "sad", "hyper", "embarrassed", 
        "tired", "fear", "disgust", "surprise"];

      //Function to generate initial buttons from emotions array
      function renderButtons() {
        //Deleting the emotions prior to adding new emotions
        //Will stop repeat buttons from being created
        $("#buttons-view").empty();
        //Loop to go through the values in the emotions array
        for (var i = 0; i < emotions.length; i++) {
          //Then dynamically create a button for each
          //This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          //Adding a class of movie to our button
          a.addClass("emotion");
          //Adding a data-attribute
          a.attr("data-emotion", emotions[i]);
          //Providing the initial button text
          a.text(emotions[i]);
          //Add the button to the HTML
          $("#buttons-view").append(a);
        }
      };

      //Call to create buttons
      renderButtons();


/*---------AJAX call to access API and return still gifs----------*/
/*Per class discussion something along the following lines would be better.
Trying to accomplish the base goal and THEN improve formatting.
  $.get("https://api.giphy.com/v1/gifs/search?", {api_key:"inMvyNCFgyQC1dyf6cQvHVk3djujZ24O", 
  q:`${search}`, limit:"10"}).done(function(response){ */
    
    //Event listener to all buttons
    $("button").on("click", function() {
    //Create variable to hold the data from the button clicked to
    //search in the API. Return is limited to 10
      var feelings  = $(this).attr("data-emotion");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        feelings + "&api_key=dc6zaTOxFJmzC&limit=10";

    //AJAX call to request gifs from API
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) { 
    //After data comes back console.log to see what return is
    //recieved from the API
          console.log(queryURL);
          console.log(response);
    //Once data is returned store the results in a variable
    var results = response.data;

    //Loop to go through the results for each item
          for (var i = 0; i < results.length; i++) {
            //Create and store a div tag
            var emotionsDiv = $("<div>");
            //Create a paragraph element with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);
            //Create and store still image tag
            var emotionsStillImage = $("<img>");
            //Set the source to the _still version returned from the API
            emotionsStillImage.attr("src", results[i].images.fixed_height_still.url);
            emotionsStillImage.addClass("still");
            //Append the rating to the gif recieved from the API
            emotionsDiv.append(p);
            emotionsDiv.append(emotionsStillImage);

            //Variable to hold animated gif
            var emotionsAnimatedImage = $("<img>");
            //Set the source to the animated version returned from the API
            emotionsAnimatedImage.attr("src", results[i].images.fixed_height.url);
            emotionsAnimatedImage.addClass("animated");
            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(emotionsDiv);
          }
        });
    });
/*---------Function to then animate the still gifs received----------*/
    $("img").on("click",  function() {
      //If img clicked on is still, animate, if image clicked on is animated, still
        if ("animated")
      });