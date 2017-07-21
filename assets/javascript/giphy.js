// Dave Jagodowski - HW06 - Giphy Project

$(document).ready(function(){
   
  //Create an initial array of fish
  var fishArray = ["Trout", "Salmon", "Bass", "Catfish"];
  

  //Create a new div to contain the buttons
  //Assign a variable to a new div element.
  var buttonsDiv = $("<div id='buttonsView'>");
  //create sample text for testing
  var titleText = "Click a button to view animaged GIFs!";
  //create an element to hold the new buttons.
  var p1 = $("<p>").text(titleText);
  //insert sample text indo new div
  buttonsDiv.append(p1);
  //insert new div into DOM
  $("#container").prepend(buttonsDiv);

  //Create another div to contain the gif images 
  var gifPlace = $("<div id='gifView'>");
  $("#container").append(gifPlace);



  // Function for displaying new buttons
  function renderButtons() {
    // Deleting the existing fish from the div prior to adding new one
    // (otherwise you will have repeat buttons)
    $("#buttonsView").empty(); 

  // Loop through the array of fish species.
      for (var i = 0; i < fishArray.length; i++) {
        console.log(fishArray[i]);
       // Then dynamicaly generate buttons for each fish in the array
        var b = $("<button>"); //jQuery generates beginning and end <button> tags.
        // Adding a class of fishClass to our button
        b.addClass("fishClass");
        // Adding an attribute called "data-name" 
        b.attr("data-name", fishArray[i]);
        // Providing the initial button text`
        b.text(fishArray[i]);
        // Adding the button to the fishButtons div
        $("#buttonsView").append(b);
      } // end for loop
    }

    // Create an event handler for when the submit button is clicked
      $("#addFish").on("click", function(event) {
      	//prevent the Submit button from submitting a form.
        event.preventDefault();
        // Grab the value of the input from the textbox and remove any extra spaces from string.
        var newFish = $("#fish-input").val().trim();
        console.log("newFish = " + newFish);
        // Add the new fish (from the textbox) to the end of the array
        fishArray.push(newFish);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements (i.e. buttons) with a class of "fishClass"
      $(document).on("click", ".fishClass", displayGifs);
      

// ---------------------------------------------------------------//

      // displayGifs function re-renders the HTML to display the appropriate content
      function displayGifs() {
      //  console.log("function displayGifs is called.");
        var gifClip = $(this).attr("data-name"); // "data" is the name of the object from GIPHY API
        var fishClip = "fishing+"+gifClip; //Sets the context of the search to fishing
        console.log("fishClip = " + fishClip);
        var apiKey = "72d9ab225f604dd886525d7f63eb5f65"; //my personal API key
        var gifLimit = 10; //number of gif files to retrieve
        var gifRating = "g"; //filters results by the specified rating.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+fishClip+"&apikey="+apiKey+"&limit="+gifLimit;
      console.log("URL is: " + queryURL);

      //Clear any images currently displayed
      $("#gifView").html("");


        // Creating an AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
           console.log(response);
          // Storing the rating data from the API

          //Write out all the contents of the response object.
          gifPlace.prepend("<p>");
          for (var i=0; i<gifLimit; i++) {
            //get the rating from the API
            var rating = response.data[i].rating;
            //get the URL for the image from the API
            var gifImg = response.data[i].images.fixed_height_small_still.url;
            //write output to the div            
            $("#gifView").append("Rating = " + rating + "<br>" + "<img src=" + gifImg + "><br>");
            
          } //end for loop
          gifPlace.append("</p>");
          $("#container").append(gifPlace);


        });

      }

 // Calling the renderButtons function to display the intial buttons
      renderButtons();


});  //end document ready
