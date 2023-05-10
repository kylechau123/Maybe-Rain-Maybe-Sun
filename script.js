$(function() {
    var inputEl = $("#city-input");
    var searchBtn = $("#search-btn");

    function getWeather () {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.val() + "&units=imperial&appid=8ce16c31984a2d2533ae32ca2f9a58d6")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            $("#current-temp").text("Temp: " + data.main.temp)
            $("#current-humidity").text("Humidity: " + data.main.humidity)
        })
    }


    searchBtn.on("click", getWeather);
})