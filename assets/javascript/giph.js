$(document).ready(function() { 

var topics = ["tiara", "candycane", "sugarplum", "snowflake", "nutcracker", "mouse", "marzipan", "coffee", "tea" ];

for (i=0; i < topics.length; i++){

var topicButton = $("<button>");

topicButton.text(topics[i]);

topicButton.attr("data-topic", topics[i])

$("#topics").append(topicButton);

}

$("#add-topic").on("click", function addTopic (event) {
  event.preventDefault();

  var topic = $("#topic").val().trim();

  topics.push(topic);

  localStorage.clear();

  localStorage.setItem("topics", JSON.stringify(topics));

  console.log(topics)

  var topicButton = $("<button>");

  topicButton.attr("data-topic", topic);

  topicButton.text(topic);

  $("#topics").append(topicButton);

  $("#topic").val("")
})


$(document).on("click", "button", function() {
    var topic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topic + "&api_key=JXQseS827pcEhE9svs961KkEbk4YDS0r";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      var results= response.data;

       for (var i = 0; i < results.length; i++) {

      var topicDiv=$("<div>");
      var rating=results[i].rating;
      var p=$("<p>").text("Rating:" + rating);

      var topicImage = $("<img>");

      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("class", "gif");
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url );
      topicImage.attr("data-state", "still")

      topicDiv.append(p);

      topicDiv.append(topicImage)

      $("#gifs-appear-here").prepend(topicDiv)
    }

    });        
  });

$(document).on("click",".gif", function() {

  var state = $(this).attr("data-state");
  console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  })
    
})