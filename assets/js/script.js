var cityInputEl = document.querySelector('#city-input');
var searchForm = document.querySelector('#search-form');
var clearBtn = document.querySelector('#clear-history-button');
var pastSearchedCitiesEl = document.querySelector('#search-history');
var presentDayWeather = document.querySelector('#present-day-weather');
var fiveDayForecast = document.querySelector('#five-day-forecast');


// Display function for the dashboard

function dashboard(event) {
    event.preventDefault();
    var cityName = cityInputEl.value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`
    fetch (url) 
    .then(function(response){
        return response.json()
    })
    .then(function(currentData){
        console.log(currentData)
        var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&appid=9dd332c2cdf5ad3eee158912aa75b747&units=imperial`
        fetch (oneCallUrl)
        .then(function(response){
            return response.json()
        })
        .then(function(fiveDayData){
            console.log(fiveDayData);
        presentDayWeather.innerHTML=`<ul>
        <li class="title">${currentData.name} /<span> ${moment(currentData.dt, "X").format(" MM/DD/YYYY")} </span></li>
        <li><img src ="http://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png" /></li>
        <li>Temp: ${currentData.main.temp}</li>
        <li>Wind: ${currentData.wind.speed}</li>
        <li>Humidity: ${currentData.main.humidity}</li>
        <li>UV: <span style="background-color: green; color: white;"> ${fiveDayData.current.uvi}</span></li>
    </ul>
        `
        var cards = "";
        for (var i = 1; i < 6; i++) { 
        cards=cards+`<ul class="col-2 day">
        <li>${moment(fiveDayData.daily[i].dt, "X").format(" MM/DD/YYYY")}</li>
        <li><img src ="http://openweathermap.org/img/wn/${fiveDayData.daily[i].weather[0].icon}@2x.png" /></li>
        <li>Temp: ${fiveDayData.daily[i].temp.day}</li>
        <li>Wind: ${fiveDayData.daily[i].wind_speed}</li>
        <li>Humidity: ${fiveDayData.daily[i].humidity}</li>
    </ul>`
        }
        fiveDayForecast.innerHTML=cards;
    });
    })
} 
searchForm.addEventListener("submit", dashboard); // template literal


