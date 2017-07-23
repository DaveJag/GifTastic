// Dave Jagodowski - HW06 - Giphy Project

$(document).ready(function(){
   
  //Create an initial array of fish
  var fishArray = ["Trout", "Salmon", "Bass", "Catfish"];
  var ratingArray = [];
  var stillArray = [];
  var animatedArray = [];
  var imageObj = new Object;
  var gifLimit = 10; //number of gif files to retrieve

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
//        renderButtons();
      });

      // Adding a click event listener to all button elements with a class of "fishClass"
      $(document).on("click", ".fishClass", getGifs);
      

// ---------------------------------------------------------------//

      // getGifs function peforms the AJAX call to retrieve the content
      function getGifs() {
        var gifClip = $(this).attr("data-name"); // "data" is the name of the object from GIPHY API
        var fishClip = "fishing+" + gifClip; //Adding "fishing" to all search strings to keep it in  context.
        var apiKey = "72d9ab225f604dd886525d7f63eb5f65"; //my personal API key
        var gifRating = "g"; //filters results by the specified rating.
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+fishClip+"&apikey="+apiKey+"&limit="+gifLimit;

        //Clear any images currently displayed before repopulating
        $("#gifView").html("");

        // Creating an AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
  
          //Create another div to contain the gif images 
          var gifPlace = $("<div id='gifView'>");
          // position gifView in the container Div
          $("#container").append(gifPlace); 
          // $("#container").append(gifPlace);
        
          for (var i=0; i<gifLimit; i++) {
            //get the rating from the API and write it to an array.
            var getRating = response.data[i].rating;
            ratingArray[i] = getRating;
          
            //get the URLs for the still image from the API and write it to an array.
            var getStillImg = response.data[i].images.fixed_height_small_still.url;
            stillArray[i] = getStillImg;
            
            //get the URLs for the animated images from the API and write it to an array.
            var getAnimatedImg = response.data[i].images.fixed_height_small.url;
            animatedArray[i] = getAnimatedImg;

            //Define an array object to contain all the image information
            imageObj[i] = {    
              rated: ratingArray[i],
              still: stillArray[i],
              animated: animatedArray[i]
            }            
          } //end for loop

      //This section populate the div from the imageObj
          for (var i=0; i<gifLimit; i++) {
            console.log("imageObj.rated = " + imageObj[i].rated);
            console.log("imageObj.still = " + imageObj[i].still); 
            console.log("imageObj.animated = " + imageObj[i].animated); 

            var rating = imageObj[i].rated;
            console.log ("rating is ")+ rating;
            var pRate = $("<span>").text("Rating: " + rating);
            var stillImg = imageObj[i].still;
            var image = $("<img id='still'>");
            image.addClass("gif");
            image.attr("src", stillImg);
            gifPlace.append(pRate, image);
          } //end for loop
          $("#gifView").prepend(gifPlace);
        }); //end AJAX function call
     } //end function getGifs


    //************************************************************
    //Create an event handler for images when they are clicked on.
    
  //  $(".gif").click(function(){  //Note: This does not work with dynamically generated objects.
      $(document).on('click',[".gif"],function(){  //$(document).on('click',[class],functionname/function(){})
        console.log("image was clicked on.");
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      //  var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
    

    /* if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      } */
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

      //define images object


});  //end document ready
