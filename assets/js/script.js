
$(document).ready(function () { 
  console.log("Why aren't you running?");
  $('select').formSelect();
  $(".icon").hide;
  // API key
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var weatherloc = "";
  $(".btn").on("click", function (select) {    
    event.preventDefault();  
    weatherloc = $(".form-control").val();
    console.log("You clicked");
    console.log("City Name is :" + weatherloc);


    // Quert URL to build database
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "q=" + weatherloc + "&appid=" + APIKey;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ $(".form-control").val() + "&appid=" + APIKey;
    console.log(queryURL);
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET", 
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
      var icon = "http://openweathermap.org/img/wn/"+ response.weather[0].icon +"@2x.png";
      var queryuvi = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat="+ 
      response.coord.lat + "&lon=" + response.coord.lon;
      console.log(queryuvi);
      //api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37
      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + "</h1>");
      console.log(response.dt);
      $(".date").text(new Date());
      $(".icon").html("<image src=" + icon + "/>");
      // $(".icon").src(icon);
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".temp").text("Temperature (F) " + tempF.toFixed(2));
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $.ajax({
        url: queryuvi,
        method: "GET", 
      })
      .then(function(response) {
        // var span = "<span>";
        var spancolor;
        if (response.value < 3){
          spancolor = "green";
        } else if (response.value > 2 && response.value <6){
          spancolor = "yellow";
        } else if (response.value > 5 && response.value <8){
          spancolor = "orange";
        } else if (response.value > 7 && response.value <11){
          spancolor = "red";
        } else {
          spancolor = "purple";
        }
        
        console.log(spancolor);
        $(".uvindex").html("UV Index: <span style='color : white'; background-color:'" + spancolor + "'>"+ response.value + "</span>");
        console.log(response);
      });
      
      // $(".wind").text("Wind Speed: " + response.wind.speed);
      // $(".humidity").text("Humidity: " + response.main.humidity);
    
    });
  });
});