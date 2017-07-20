// Dave Jagodowski - HW06 - Giphy Project

$(document).ready(function(){
   
  //Initial Array of fish
  var fishArray = ["Rainbow Trout", "Brook Trout", "Brown Trout", "Smallmouth Bass"];
 // var fishDiv = $('<div id = "buttons-view">'); //create a new div
 
 /*   function createDiv() {
    	var myDiv = $("<div class='newDiv'>");
    	var sampleText = "<p>I am writing this into my new Div</p>";
    	myDiv.append(sampleText);

    createDiv();
  }
*/    
  
    // Function for displaying movie data
    function renderButtons() {
      //var newDiv = $("<div class='buttons-view'>"); //create a new div
      // Deleting the existing fish prior to adding new one
      // (otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Creating a div to hold the new fish buttons.
      
      // Looping through the array of fish species.
      for (var i = 0; i < fishArray.length; i++) {
        console.log(fishArray[i]);
       // Then dynamicaly generating buttons for each fish in the array
       // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        console.log(a);
        // Adding a class of fishClass to our button
        a.addClass("fishClass");
        // Adding an attribute called "data-name" 
        a.attr("data-name", fishArray[i]);
        // Providing the initial button text
        a.text(fishArray[i]);
        // Adding the button to the fishButtons div
        $("#buttons-view").append(a);
      } // end for loop
    }

    // Create an event handler for when the fish button is clicked
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

 // Calling the renderButtons function to display the intial buttons
      renderButtons();
//javascript, jQuery
/*
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
xhr.done(function(data) { console.log("success got data", data); }); 

$.ajax({
  url: "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=72d9ab225f604dd886525d7f63eb5f65&limit=5"
  method: "GET"
}).done(function(response) {
	console.log(response);
}); 
*/




});  //end document ready
