import React, { useState } from "react";
import "./App.css";

function App() {
  //sommary
  const apiKey = "0bf534a63860937de43a4b275fd04a61"; //clé site
  const [weatherData, setWeatherData] = useState([{}]); // variable données météo + obtenir la météo
  //useState = état
  const [city, setCity] = useState(""); //variable ville et récupération de la ville
  const[latitude, setLatitude] = useState(0);
  const[longitude, setLongitude] = useState(0);


  //Fonction obtention météo , événement enter.
  const getWeather = (event) => {
    if (event.key == "Enter") {
      fetch(
        //récupère des données, requêtes
        `https://api.openweathermap.org/data/2.5/weather?exclude=hourly,daily&q=${city}&units=metric&APPID=${apiKey}&lat={lat}&lon={lon}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCity("");
        }); // récupération des données de l'api
    }
  };
  const dateBuilder = (d) => { //Paramètre New Date :d
    let months = [
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
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const currentPosition = (position)=> {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  }

  return (
    <div className="container">
      <input
        className="input"
        placeholder="Enter City..."
        type="text"
        onChange={(e) => setCity(e.target.value)} //=> changement de la valeur de la ville, événement, récupère la valeur
        value={city} // récupère la valeur : city
        onKeyPress={getWeather} //affiche le calcul refait + haut dans le code
      />

      {typeof weatherData.main === "undefined" ? (
        <div>
          <p>Welcome to weather app! Enter in a city to get the weather of.</p>
        </div>
      ) : (
        <div className="weather-data">
          
          <p className="city">{weatherData.name}</p>
          <p>{dateBuilder(new Date())}</p>
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



<div v-if=""></div>