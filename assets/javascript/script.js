   //------------Declare global variables-------------------------------
   var buttonArray = ["winter", "dogs", "horses", "rain", "anime", "math", "beer", "atlanta", "okonomiyaki"];
   var currentGifSearch;
   var imageArray = [];

   //------------Define functions--------------------------------------

   //Function to generate each of the buttons that may be clicked to display gifs
   function displayGifButtons() {

       //First empty the buttons area
       $("#gif-buttons").empty();

       //For each element in the array, display a button
       buttonArray.forEach(element => {
           var newButton = $("<button>");
           newButton.addClass("gif-button btn btn-light my-2 mx-1");
           newButton.text(element);
           $("#gif-buttons").append(newButton);
       });
   }

   //Function to query to giphy api and generate new gif images
   function getGifs(gifName) {

       var q = gifName;
       var apiKey = "dc6zaTOxFJmzC";
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey;

       $.ajax({
           url: queryURL,
           method: "GET"
       }).then(function (response) {

           //Place the response data into the global array
           imageArray = response.data;

           console.log(imageArray);

           //Display the first 10 gifs
           for (var i = 0; i < 10; i++) {
               displayGif(i);
           }

           //Display the See More Button
           displaySeeMoreButton();
       });
   };

   //Function that appends one gif to the page
   function displayGif(index) {

       var element = imageArray[index];

       //Place the image attributes in variables
       var imageUrlAnimated = element.images.original.url;
       var imageUrlStill = element.images.original_still.url;
       var imageRating = element.rating;

       //Create a figure tag for the image and the caption
       var figure = $("<figure>");
       figure.addClass("figure");

       //Create an image tag
       var image = $("<img>");
       image.attr("src", imageUrlStill);
       image.addClass("figure-img img-fluid rounded m-1");
       image.attr("alt", currentGifSearch + " gif");
       image.attr("url-animated", imageUrlAnimated);
       image.attr("url-still", imageUrlStill);
       image.attr("animation-state", "still");

       //Create a caption with the title and rating
       var title = $("<figcaption>");
       title.addClass("figure-caption");
       title.text("Title: " + element.title.toUpperCase());
       var rating = $("<figcaption>");
       rating.addClass("figure-caption");
       rating.text("Rating: " + imageRating.toUpperCase());

       //Append the image and caption to the figure
       figure.append(image, title, rating);

       //Append the figure to the page
       $("#gif-display-area").append(figure);
   }

   function displaySeeMoreButton() {
       //Create a "See More" button
       var seeMoreButton = $("<button>");
       seeMoreButton.addClass("btn btn-primary btn-block see-more-button");
       seeMoreButton.text("See More");

       //Append the "Add More Gifs" button to the page
       $("#see-more-button").append(seeMoreButton);
   }

   //------------Start these scripts once the document is ready--------------
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
               buttonArray.unshift(userInput);
           }

           //Generate the buttons
           displayGifButtons();

           //Clear the text input box
           $("#searchInput").val("");

       })

       //When the user clicks a gif button, clear the current gifs and display the desired gifs
       $(document).on("click", ".gif-button", function (event) {
           //Save this as the current search term
           currentGifSearch = $(this).text();

           //Clear the currently displayed gifs
           $("#gif-display-area").empty();

           //Query the API for the desired term and display the first 10 gifs
           getGifs($(this).text());

       });

       //When the user clicks on a gif
       $(document).on("click", ".figure-img", function (event) {

           //Toggle whether the gif is animated or not
           if ($(this).attr("animation-state") === "still") {
               $(this).attr("src", $(this).attr("url-animated"));
               $(this).attr("animation-state", "animated");
           } else {
               $(this).attr("src", $(this).attr("url-still"));
               $(this).attr("animation-state", "still");
           }
       });

       //When the user clicks on the "See More" button
       $(document).on("click", ".see-more-button", function (event) {

           //Display gifs 10 through 25
           for (var i = 10; i < imageArray.length; i++) {
               displayGif(i);
           }

           //Remove the See More Button
           $("#see-more-button").empty();
       });
   });