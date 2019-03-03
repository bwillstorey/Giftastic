// Add new superhero button
$(".submit").on("click", function(){

    // create new button
    var newBtn = $("<button type='button' class='btn btn-success' data-hero=''></button>");
    var newHero = $("textarea").val();
    var addHero = newBtn.text(newHero).attr("data-hero", newHero);

    // append btn to hero-btns div
    $(".hero-btns").append(addHero);

})

// Adding click event listen listener to all superhero buttons
$(".btn-success").on("click", function() {
  // Grabbing and storing the data-hero property value from the button
  var hero = $(this).attr("data-hero");
    console.log(hero);
  // Constructing a queryURL using the hero name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    hero + "&api_key=vM2sCUJc09QSdYH3QRcMRoso1s9zwtH0&limit=10";
    
  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating and storing a div tag
        var heroDiv = $("<div class='hero-div'>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var heroImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        heroImage.attr("src", results[i].images.fixed_height_still.url);
        heroImage.attr("data-still", results[i].images.fixed_height_still.url);
        heroImage.attr("data-animate", results[i].images.fixed_height.url);
        heroImage.attr("data-state", "still");
        heroImage.attr("class", "gif");

        // Appending the paragraph and image tag to the heroDiv
        heroDiv.append(p);
        heroDiv.append(heroImage);

        // Prependng the heroDiv to the HTML page in the "#gifs-appear-here" div
        $("#gifs-appear-here").prepend(heroDiv);
      }



$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    console.log(this);
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

    });
});