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
          // Adding a class of movie to our button
          a.addClass("emotion");
          // Adding a data-attribute
          a.attr("data-name", emotions[i]);
          // Providing the initial button text
          a.text(emotions[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      };

      //Call to create buttons
      renderButtons();


/*---------AJAX call to access API----------*/

  	//Event listener to all buttons
    $("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    //AJAX call to request gifs from API
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) { 
          console.log(queryURL);
          console.log(response);
      });