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
  var buttonsDiv = $("<div id='buttonsView'>");
  var titleText = "Click a button to view... absolutely nothing!";
  //create an element to hold the new buttons.
  var p1 = $("<p>").text(titleText);
  buttonsDiv.append(p1);
  $("#container").prepend(buttonsDiv);


  // Function for displaying new buttons
  function renderButtons() {
    // Deleting the existing buttons from the div prior to adding new one
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
        fishArray.push(newFish);

        // Calling renderButtons which handles the processing of our new button
        renderButtons();
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

        $("#gifView").html("");

        // Create an AJAX call for the specific button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
  
          //Create another div to contain the gif images 
          var gifPlace = $("<div id='gifView'>");
          $("#container").append(gifPlace); 
        
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

      //This section populates the div from the imageObj
          for (var i=0; i<gifLimit; i++) {
            //assign attributes to display the rating, still, and animated data
            var rating = imageObj[i].rated;
            console.log ("rating is ")+ rating;
            var pRate = $("<span>").text("Rating: " + rating);
            gifPlace.append(pRate);
            
            var stillImg = imageObj[i].still;
            var image = $("<img id='still'>");
            image.addClass("gif");
            image.attr("src", stillImg);
            gifPlace.append(image);

            var animatedImg = imageObj[i].animated;
            var animated =  $("<img id='animated'>") ;
            animated.addClass("gif");
            animated.attr("src", animatedImg);
          } //end for loop
          $("#gifView").prepend(gifPlace);
        }); //end AJAX function call
     } //end function getGifs

    //Create an event handler for images when they are clicked on.
    
    $(document).on('click',[".gif"],function(){ 
      //test to see if images <img> id is "still" or "animated"  
      var source = $("img").attr("src"); // get image's file name.
      var index = stillArray.indexOf(source); //get pointer to array index

      var status = $(".gif").attr("id"); 
        if (status === "still") {
            var newURL = animatedArray[index];
            $("img").attr("src", newURL);
        } else {
            newURL = stillArray[index];
            $("img").attr("src", newURL);
        }
    });
/*So, let me tell you how wonderfully simple this was going to be.
When you click on an image, I grab the image's "src" property and
I search the stillArray for that URL to find its index. 

Now that I have the index, I can replace the image with the animated version
by referencing the same index in the animatedArray. 

But, it doesn't work because when you click on an image, you don't get
THAT image's URL -- You always get the first image (index =0) for some reason. 

The $(this). methods do not seem to work for dynamically rendered elements, along
with many other things. Would be nice to discuss this in class, since we mostly
use hard <divs> and code inside the .html page in the classroom. I spent 4 hours
trying to get an onClick event to work. Slacked it out, and was helped by 
someone who had the same problem, but found a new way to do the same thing that
should have worked in the first place!   

This is the 2nd week where I felt like I spent 15 of the 25 hours I invested
doing the equilavent of typing "2+2" in a calculator and having it come up = 3.
For a while, you play the "Is it me?" game, but at some point, you just give up
and conclude that the calculator is whacked and wonder if it isn't too late
in life to go raise sheep.   
*/


 // Calling the renderButtons function to display the intial buttons
      renderButtons();

});  //end document ready
