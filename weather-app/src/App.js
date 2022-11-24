import React, { useState } from "react";
import "./App.css";

function App() {
  const apiKey = "0bf534a63860937de43a4b275fd04a61";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const daysoftheweek = new Date //getDay()
  //console.log([weatherData, setWeatherData])

  //Fonction obtention météo à changer Enter ...
  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?exclude=hourly,daily&q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
          console.log(getWeather)
        });
    }
  };

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        type="text"
        onChange={(e) => setCity(e.target.value)} //=>ville
        value={city}
        onKeyPress={getWeather}
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>Welcome to weather app! Enter in a city to get the weather of.</p>
        </div>
      ) : (
        <div className="weather-data">
          <p className="city">{weatherData.name}</p>
          <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p>
        </div>
      )}

      {weatherData.cod === "404" ? <p>City not found.</p> : <></>}
    </div>
  );
}

export default App;



// temp_demain = jsonValeur.daily[11].temp
// weather_demain = jsonValeur.daily[11].weather[1].description

// -- Code pour afficher et convertir la date et l'heure de la prévision
// time_prevision = jsonValeur.daily[11].dt
// heure_prevision = (os.date("%x à %X", time_prevision))

// msg = 'Le '..heure_prevision..', il fera '..temp_demain..' degres et la météo prévoit '.. weather_demain..'.'
// daily
//https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}