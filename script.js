$(function() {
    var inputEl = $("#city-input");
    var searchBtn = $("#search-btn");
    var cityForm = $("#city-form")

    function getWeather (event) {
        event.preventDefault();

        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputEl.val() + "&units=imperial&appid=8ce16c31984a2d2533ae32ca2f9a58d6")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            $("#current-city").text(data.name + " (" + dayjs().format("MM/DD/YYYY") + ")")
            $("#current-temp").text("Temp: " + data.main.temp)
            $("#current-wind").text("Wind: " + data.wind.speed)
            $("#current-humidity").text("Humidity: " + data.main.humidity)

            getForecast()
        })
    }


    cityForm.on("submit", getWeather);

    // <div class="card">
    //     <div class="card-header">
    //         Featured
    //     </div>
    //     <ul class="list-group list-group-flush">
    //         <li class="list-group-item">An item</li>
    //         <li class="list-group-item">A second item</li>
    //         <li class="list-group-item">A third item</li>
    //     </ul>
    // </div>

    function generateCards (data) {
        const cardDiv = $("<div>")
        cardDiv.addClass("card")

        const cardHeader = $("<div>")
        cardHeader.addClass("card-header")
        cardHeader.text(dayjs(data.dt * 1000).format("MM/DD/YYYY"))

        const cardUl = $("<ul>")
        cardUl.addClass("list-group list-group-flush")

        const li1 = $("<li>")
        li1.addClass("list-group-item")
        li1.text("Temp: " + data.main.temp)

        const li2 = $("<li>")
        li2.addClass("list-group-item")
        li2.text("Wind: " + data.wind.speed)

        const li3 = $("<li>")
        li3.addClass("list-group-item")
        li3.text("Humidity: " + data.main.humidity)

        cardUl.append(li1, li2, li3)

        cardDiv.append(cardHeader, cardUl)

        $(".forecast-weather").append(cardDiv)

    }

    function getForecast () {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + inputEl.val() + "&units=imperial&appid=8ce16c31984a2d2533ae32ca2f9a58d6")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const selection = [
                data.list[3],
                data.list[11],
                data.list[19],
                data.list[27],
                data.list[35],
            ]

            for(i=0; i < selection.length; i++) {
                generateCards(selection[i])
            }
        })
    }
    

})