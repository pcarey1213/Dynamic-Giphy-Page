$(document).ready(function() { 

var topics = ["tiara", "candycane", "sugarplum", "snowflake", "nutcracker", "mouse", "marzipan", "coffee", "tea", "fairy","peppermint", "angel"];

var buttonKind = ["success", "danger", "light"];

for (i=0; i < topics.length; i++){

var topicButton = $("<button type='button' class='btn btn-"+buttonKind[Math.floor(Math.random() * buttonKind.length)]+" btn-sm m-1'>");

topicButton.text(topics[i]);

topicButton.attr("data-topic", topics[i]);

$("#topics").append(topicButton);

}

$("#add-topic").on("click", function addTopic (event) {

  event.preventDefault();

  var topic = $("#topic").val().trim();

  topics.push(topic);

  localStorage.clear();

  localStorage.setItem("topics", JSON.stringify(topics));

  console.log(topics)

  var topicButton = $("<button type='button' class='btn btn-"+buttonKind[Math.floor(Math.random() * buttonKind.length)]+" btn-sm m-1'>");

  topicButton.attr("data-topic", topic);

  topicButton.text(topic);

  $("#topics").append(topicButton);

  $("#topic").val("")
})


$(document).on("click", "button", function fireGifs() {

  var topic = $(this).attr("data-topic");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=JXQseS827pcEhE9svs961KkEbk4YDS0r";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      console.log(response);

      var results= response.data;

       for (var i = 0; i < 10; i++) {

      var topicDiv=$("<div class='d-flex align-items-center flex-column m-2'>");
      var rating=results[i].rating;
      var p=$("<p>").text("Rating: " + rating);

      var topicImage = $("<img class='rounded' alt='"+topic+"'>");

      topicImage.attr("src", results[i].images.fixed_height_still.url);
      topicImage.attr("id", "gif");
      topicImage.attr("data-still", results[i].images.fixed_height_still.url);
      topicImage.attr("data-animate", results[i].images.fixed_height.url );
      topicImage.attr("data-state", "still")

      topicDiv.append(topicImage)

      topicDiv.append(p);

      $("#gifs-appear-here").prepend(topicDiv)
    }

    });        
  });

$(document).on("click","#gif", function() {

  var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

  })
    
})