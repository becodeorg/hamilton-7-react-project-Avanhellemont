import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  //sommary
  const apiKey = "0bf534a63860937de43a4b275fd04a61"; //clé site
  const [weatherData, setWeatherData] = useState([{}]); // variable données météo + obtenir la météo
  //useState = état
  const [city, setCity] = useState("Liege"); //variable ville et récupération de la ville
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState({});

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

  useEffect(() => {
    const fetchGeo = async () => {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
    };
    fetchGeo();
  }, []);

  useEffect(() => {
    const fetchFiveDays = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        console.log(response.data);
        setForecast(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFiveDays();
  }, [latitude, longitude]);

  const dateBuilder = (d) => {
    //Paramètre New Date :d
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

  const currentPosition = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

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

          <div>{Math.round(forecast.list[0].main.temp)}°C</div>
          <div>{Math.round(forecast.list[8].main.temp)}°C</div>
          <div>{Math.round(forecast.list[16].main.temp)}°C</div>
          <div>{Math.round(forecast.list[24].main.temp)}°C</div>
          <div>{Math.round(forecast.list[32].main.temp)}°C</div>
        </div>
      )}

      {weatherData.cod === "404" ? <p>City not found.</p> : <></>}
    </div>
  );
}

export default App;
