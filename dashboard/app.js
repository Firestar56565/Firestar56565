function loadDate() {
  var currentDate = new Date();
  var dateString = currentDate.toString()
                     .split(" ")
                     .splice(0, 4)
                     .join(" ");

  $("#date").text(dateString);
}

function loadWeather() {
  var weather = $("#weather");
  var url = "https://api.forecast.io/forecast/";
  var apiKey = "e2dcf923215d0dc9a2723b36a8ff1b7b";

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
      weather.text("Based on your current location, it is " + data.currently.temperature + "° F right now");
    });
  }

  function error() {
    alert("Unable to retrieve your location for weather");
  }

  navigator.geolocation.getCurrentPosition(success, error);

  weather.text("fetching weather...");
}

function loadNews() {
  var news = $("#news");
  var url = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=";
  var apiKey = "9f7815e91f8044ea9400f9536a8cfb31";

  $.getJSON(url + apiKey, function(data) {
    var titles = data.articles.map(function(articles) {
      return "<a href='" + articles.url + "'>" + articles.title + "</a>";
    });

    news.html(titles.join("<br><br>"));
  });

  news.text("fetching news...");
}

loadDate();
loadWeather();
loadNews();