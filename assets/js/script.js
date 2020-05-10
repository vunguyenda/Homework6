
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
      var icon = "https://openweathermap.org/img/wn/"+ response.weather[0].icon +"@2x.png";
      var queryuvi = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat="+ 
      response.coord.lat + "&lon=" + response.coord.lon;
      console.log(queryuvi);      
      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + "</h1>");
      console.log(response.dt);
      $(".date").text(new Date());
      $(".icon").html("<image src=" + icon + "/>");      
      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      $(".temp").text("Temperature (F) " + tempF.toFixed(2));
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      //Call a new ajax to color UVindex
      $.ajax({
        url: queryuvi,
        method: "GET", 
      })
      .then(function(response) {
        // var span = "<span>";
        console.log("Where is my UVIndex");
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
        $(".uvindex").html("UV Index: <span style='color:white; background-color:" + spancolor + ";'>" + response.value + "</span>");
        //End UVIndex
      //Sample of 5 days forecast
      // api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml
      var queryforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+ $(".form-control").val() + "&appid=" + APIKey;
        $.ajax({
          url: queryforecast,
          method: "GET",
        })
        .then(function(response){
          console.log("Let's do weather forecast");
          console.log(response);
          var weatherlist = response.list;
          console.log("Let's print weatherlist");
          console.log(weatherlist);          
          console.log("Now do a for loop");
          var day = 1;
          for (i=0;i< weatherlist.length;i+=8){              
            console.log("List number " + i);
            var icon5 = "https://openweathermap.org/img/wn/"+ weatherlist[i].weather[0].icon +"@2x.png";
            $(".day"+day).html(
              "<div ='col s12 m12'><h3>Time: </h3>"+
              "<div ='col s12 m12'>" + weatherlist[i].dt_txt + "</div>" +
              "<div ='col s12 m12'> Temperature: " + weatherlist[i].main.temp + "</div>" +
              "<div ='col s12 m12'> Humidity: " + weatherlist[i].main.humidity + "</div>" +
              "<div ='col s12 m12'><img src='" + icon5 + "'/></div>"
            );
            day++;
          };
        })
        console.log(response);
      });     
    });
  });
});