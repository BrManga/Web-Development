//Showing day/month/year data on the right top of the page
var day = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
document.getElementById("time").innerHTML = `${day} ${months[month]} ${year}`;

//Adding button click event listener
var btn = document.getElementById("btn");
btn.addEventListener("click", urlfun);

//Adding input event listener to triger by enter
var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    urlfun();
  }
});

//Variables
var bodybg;
var backgroundSource = "";
var icon = "";
var urlicon = "";

//Main function
function urlfun() {
  //Defining URL by using input for the connection to the API at openweather.org
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${
    document.getElementById("input").value
  }&APPID=620ee7c91e8d3031b33179f3c9474605&units=metric`;
  execute(url);
}

//Function for fetching data and changing inner HTML regarding these values
function execute(urladdress) {
  document.getElementById("warning").innerHTML = "";
  //Fetching Part
  fetch(urladdress)
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      //Condition to check if the correct data fetched
      if (res.cod === 200) {
        //Fetching sunrise sunset
        var sunrise = res.sys.sunrise;
        var sunset = res.sys.sunset;
        var timezone = res.timezone;
        timeConvert(sunrise, sunset, timezone);
        //Sending data to iconSelect function to get the icon url and to decide background images
        icon = res.weather[0].id;
        iconSelect(icon);
        //Changing inner HTML with weather data
        document.body.style.backgroundImage = `url(${bodybg})`;
        document.getElementById("city").innerHTML = res.name;
        var temp = res.main.temp.toFixed(1);
        document.getElementById(
          "degree"
        ).innerHTML = `<i class="fas fa-temperature-high"></i>  ${temp} °C`;
        document.getElementById("wind").innerHTML = `${res.wind.speed} m/s`;
        document.getElementById(
          "humidity"
        ).innerHTML = `${res.main.humidity} %`;
        document.getElementById(
          "situation"
        ).innerHTML = `${res.weather[0].main}`;
        document.getElementById(
          "situationWord"
        ).innerHTML = `<img src=${urlicon}>`;
        document.getElementById(
          "windWord"
        ).innerHTML = `<i class="fas fa-wind"></i>  Wind`;
        document.getElementById(
          "humidityWord"
        ).innerHTML = `<i class="fas fa-tint"></i>  Humidity`;
      } else {
        //Condition else part, if does not take 200 code makes all information empty and gives a warning to user
        document.getElementById(
          "warning"
        ).innerHTML = `Please enter a valid city name...`;
        document.getElementById("wind").innerHTML = "";
        document.getElementById("humidity").innerHTML = "";
        document.getElementById("situation").innerHTML = "";
        document.getElementById("situationWord").innerHTML = "";
        document.getElementById("windWord").innerHTML = "";
        document.getElementById("humidityWord").innerHTML = "";
        document.getElementById("degree").innerHTML = "";
        document.getElementById("city").innerHTML = "";
        document.getElementById("citytime").innerText = "";
      }
    });
  //Clean the input value after taking data
  document.getElementById("input").value = "";
}

//Commparing weather condition according to codes written in following link: https://openweathermap.org/weather-conditions
//According to weather code background image and icon shown will be changed
function iconSelect(icon) {
  if ((icon >= 200) & (icon <= 232)) {
    urlicon = `http://openweathermap.org/img/wn/11d@2x.png`;
    bodybg = `weather_conditions/thunderstorm${night}.jpg`;
  } else if ((icon >= 300) & (icon <= 321)) {
    urlicon = `http://openweathermap.org/img/wn/09d@2x.png`;
    bodybg = `weather_conditions/drizzle${night}.jpg`;
  } else if ((icon >= 500) & (icon <= 531)) {
    urlicon = `http://openweathermap.org/img/wn/10d@2x.png`;
    bodybg = `weather_conditions/rain${night}.jpg`;
  } else if ((icon >= 600) & (icon <= 622)) {
    urlicon = `http://openweathermap.org/img/wn/13d@2x.png`;
    bodybg = `weather_conditions/snow${night}.jpg`;
  } else if ((icon >= 701) & (icon <= 781)) {
    urlicon = `http://openweathermap.org/img/wn/50d@2x.png`;
    bodybg = `weather_conditions/mist${night}.jpg`;
  } else if (icon == 800) {
    urlicon = `http://openweathermap.org/img/wn/01d@2x.png`;
    bodybg = `weather_conditions/clear${night}.jpg`;
  } else if ((icon >= 801) & (icon <= 804)) {
    urlicon = `http://openweathermap.org/img/wn/04d@2x.png`;
    bodybg = `weather_conditions/clouds${night}.jpg`;
  } else {
    urlicon = "";
  }
}
// Function for deciding night or day situation according to targeted city's time and showing the local time in targeted city
var night;
function timeConvert(sunrise, sunset, timezone) {
  // Changing date format, taking hour, minute, time zone information
  var date1 = new Date((sunrise + timezone) * 1000);
  var date2 = new Date((sunset + timezone) * 1000);
  var destTime = timezone / 3600;
  var hours1 = date1.getHours();
  var hours2 = date2.getHours();
  // Taking current time
  var currenttime = new Date();
  var myZone = currenttime.getTimezoneOffset() / 60;
  var destMinute = currenttime.getMinutes();
  var destHour = (currenttime.getHours() + myZone + destTime + 24) % 24;
  // Condition to check 00:00 time format
  destHour < 10 ? (destHour = `0${destHour}`) : destHour;
  destMinute < 10 ? (destMinute = `0${destMinute}`) : destHour;
  // Adding 00:00 local time format to document
  var destTime = `${destHour}:${destMinute}`;
  document.getElementById("citytime").innerText = `${destTime}`;
  //Condition checking day time
  (destHour >= hours1) & (destHour < hours2) ? (night = "") : (night = "1");
}
