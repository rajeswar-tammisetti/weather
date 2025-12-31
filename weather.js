const apiKey = "8ce6268382acb2c82d8070f889bd33b9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
let body = document.body;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = 'block';
        document.querySelector(".weather").style.display = 'none';
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "icons/clouds.png";
            setBackground("#6e7f9a","#b5bdc8");
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "icons/clear.png";
            setBackground("#ffcc33","#ff5733");
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "icons/rain.png";
            setBackground("#314755","#26a0da");
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "icons/drizzle.png";
            setBackground("#3a7bd5","#3a6073");
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "icons/mist.png";
            setBackground("#606c88","#3f4c6b");
        }

        document.querySelector(".error").style.display = 'none';
        document.querySelector(".weather").style.display = 'block';
    }
}

function setBackground(color1, color2) {
    body.style.background = `linear-gradient(-45deg, ${color1}, ${color2}, #2c3e50)`;
    body.style.backgroundSize = "400% 400%";
    body.style.animation = "bgMove 14s ease infinite";
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});
