// array with starter buttons
var topics = ["ironman", "batman", "hulk", "spiderman", "superman", "wonder woman", "aquaman", "wolverine", "dr strange", "black panther", "cyclops", "ant man", "captain america", "green lantern", "deadpool"];

for (var i = 0; i < topics.length; i++) {
  var newBtn = $("<button type='button' class='btn btn-success' data-hero=''></button>");
  var addHero = newBtn.text(topics[i]).attr("data-hero", topics[i]);

  $(".hero-btns").append(addHero);
}

// Add new superhero button
$(".submit").on("click", function(){

    // create new button
    var newBtn = $("<button type='button' class='btn btn-success' data-hero=''></button>");
    var newHero = $("textarea").val();
    var addHero = newBtn.text(newHero).attr("data-hero", newHero);

    // append btn to hero-btns div
    function appendHero () {
        $(".hero-btns").append(addHero);
    }

    appendHero();
})

// Adding click event listen listener to all superhero buttons
$(".hero-btns").on("click", ".btn-success", function() {
  // Grabbing and storing the data-hero property value from the button
  var hero = $(this).attr("data-hero");
    console.log(hero);
  // Constructing a queryURL using the hero name
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    hero + "&api_key=vM2sCUJc09QSdYH3QRcMRoso1s9zwtH0&limit=10";
    
  //AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

      console.log(queryURL);
      console.log(response);
      
      var results = response.data;

      // Loop through each result
      for (var i = 0; i < results.length; i++) {

        var heroDiv = $("<div class='hero-div'>");
        var p = $("<p>").text("Rating: " + results[i].rating);
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
      

// allows user click to start/stop a gif animation
$("img").on("click", function() {
    var state = $(this).attr("data-state");
    console.log(this);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
    console.log(state)
  });

});
});