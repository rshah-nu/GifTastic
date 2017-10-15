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


/*---------AJAX call to access API----------*/
/*Per class discussion something along the following lines would be better.
Trying to accomplish the base goal and THEN improve formatting.
  $.get("https://api.giphy.com/v1/gifs/search?", {api_key:"inMvyNCFgyQC1dyf6cQvHVk3djujZ24O", 
  q:`${search}`, limit:"10"}).done(function(response){ */
    
    //Event listener to all buttons
    $("button").on("click", function() {
    //Create variable to hold the data from the button clicked to
    //search in the API
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

            // Creating and storing a div tag
            var emotionsDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var emotionsImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            emotionsImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and image tag to the animalDiv
            emotionsDiv.append(p);
            emotionsDiv.append(emotionsImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(emotionsDiv);
          }
        });
    });