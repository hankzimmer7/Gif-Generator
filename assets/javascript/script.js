   //------------Declare global variables-------------------------------
   var buttonArray = ["winter", "dogs", "horses", "rain", "anime", "math", "beer", "atlanta", "okonomiyaki"];

   //------------Define functions--------------------------------------

   //Function to generate each of the buttons that may be clicked to display gifs
   function displayGifButtons() {

       $("#gif-buttons").empty();

       buttonArray.forEach(element => {
           var newButton = $("<button>");
           newButton.addClass("gif-button btn btn-light my-2 mx-1");
           newButton.text(element);
           $("#gif-buttons").append(newButton);
       });
   }

   //Function to query to giphy api and generate new gif images
   function getGifs(gifName) {

       var q = gifName
       var apiKey = "dc6zaTOxFJmzC";
       var limit = 10;
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey + "&limit=" + limit;

       console.log(queryURL);
       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function (response) {

           console.log(response);
           var imageArray = response.data;

           console.log(imageArray);

           imageArray.forEach(function (element, index) {
               console.log(element.images.original.url);
               console.log(element.images.fixed_width.url);
               var imageUrl = element.images.downsized_medium.url;
               var image = $("<img>");
               image.attr("src", imageUrl);
               //   image.attr("class", "img-fluid d-block mx-auto mt-4");
                 image.attr("class", "img-fluid m-1");
               //    image.attr("class", "gif-image");
               image.attr("alt", gifName + " gif");
               $("#gif-display-area").append(image);
           });
       });
   };

   //------------Start the scripts once the document is ready--------------
   $(document).ready(function () {

       //Initially display the Gif buttons
       displayGifButtons();

       //When the user clicks the button to add a new gif button, execute the following:
       $(document).on("click", "button[type='submit']", function (event) {

           //Prevent the page from automaticlaly refreshing when the submit button is pressed
           event.preventDefault();

           //Save the user's input and put it into the array of buttons
           var userInput = $("#searchInput").val();

           //Only add the input if it is not blank
           if (userInput != "") {
               buttonArray.push(userInput);
           }

           //Generate the buttons
           displayGifButtons();

           //Clear the text input box
           $("#searchInput").val("");

       })

       $(document).on("click", ".gif-button", function (event) {
           //Clear the currently displayed gifs
           $("#gif-display-area").empty();

           //Display the desired gifs
           getGifs($(this).text());
       });
   });