   document.getElementById("city").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                getWeather();
            }
        });
 
        function getWeather() {
            var cityValue = document.getElementById("city").value;
 
            if (cityValue == "") {
                alert("Please enter a city name!");
                return;
            }
 
            document.getElementById("loading").style.display = "block";
            document.getElementById("error").style.display = "none";
            document.getElementById("weather-card").style.display = "none";
 
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&appid=392fc470c1ac8b42b2f40951a9a96cc4&units=metric")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    document.getElementById("loading").style.display = "none";
 
                    if (data.cod == "404") {
                        document.getElementById("error").style.display = "block";
                        return;
                    }
 
                    document.getElementById("city-name").innerText = data.name;
                    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
                    document.getElementById("condition").innerText = data.weather[0].description;
                    document.getElementById("humidity").innerText = data.main.humidity;
                    document.getElementById("wind").innerText = Math.round(data.wind.speed * 3.6);
                    document.getElementById("weather-icon").src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
 
                    document.getElementById("weather-card").style.display = "block";
                })
                .catch(function(err) {
                    document.getElementById("loading").style.display = "none";
                    document.getElementById("error").style.display = "block";
                });
 
            document.getElementById("city").value = "";
        }