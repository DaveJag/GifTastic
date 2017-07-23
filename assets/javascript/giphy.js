// Dave Jagodowski - HW06 - Giphy Project

$(document).ready(function(){
   
  //Create an initial array of fish
  var fishArray = ["Trout", "Salmon", "Bass", "Catfish"];
  

  //Create a new div "buttonsView" to contain the buttons
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





  // Function for displaying new buttons
  function renderButtons() {
    // Deleting the existing fish from the div prior to adding new one
    // (otherwise you will have repeat buttons)
    $("#buttonsView").empty(); 

  // Loop through the array of fish species.
      for (var i = 0; i < fishArray.length; i++) {
        console.log(fishArray[i]);
       // Then dynamicaly generate buttons for each fish in the array
       // and give it the class ".gif"
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

      // Adding a click event listener to all button elements with a class of "fishClass"
      $(document).on("click", ".fishClass", displayGifs);
      

// ---------------------------------------------------------------//

      // displayGifs function re-renders the HTML to display the appropriate content
      function displayGifs() {
      //  console.log("function displayGifs is called.");
        var gifClip = $(this).attr("data-name"); // "data" is the name of the object from GIPHY API
        var fishClip = "fishing+" + gifClip; //Adding "fishing" to all search strings to keep it in  context.
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
          //console.log(response);
          // Storing the rating data from the API
          //Write out all the contents of the response object.
   
          //Create another div to contain the gif images 
          var gifPlace = $("<div id='gifView'>");
          $("#container").append(gifPlace); // position gifView in the container Div
          // $("#container").append(gifPlace);
        
          for (var i=0; i<gifLimit; i++) {
            //get the rating from the API
            var rating = response.data[i].rating;
            //Create an element to display the rating
            var pRate = $("<p>").text("Rating: " + rating);
            //Add the rating to gifView div
            gifPlace.append(pRate);
            
            //get the URL for the image from the API
            var gifImg = response.data[i].images.fixed_height_small_still.url;
            //create an element to hold the image
            var image = $("<img>");
            image.addClass("gif");
            image.attr("src", gifImg);
            //Add the image to the gifView div
            gifPlace.append(image);
          } //end for loop
          //move the populated div to the DOM
          $("#gifView").prepend(gifPlace);
        }); //end AJAX function call
    } //end function displayGifs

    //************************************************************
    //Create an event handler for images when they are clicked on.
    
    $(".gif").click(function(){
      console.log("image was clicked on.");

//    $(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } 
    });

/*
$('.gif').click(function(){
  alert("image clicked");
    var image = new Image();
       image.src='http://rack.3.mshcdn.com/media/ZgkyMDEyLzEwLzE5LzExXzMzXzMzXzE3Nl9maWxlCnAJdGh1bWIJMTIwMHg    5NjAwPg/462b8072';
     $('#img').click(function(){
       $(this).attr('src',image.src);
     }); 
 });
*/

 // Calling the renderButtons function to display the intial buttons
      renderButtons();


});  //end document ready
