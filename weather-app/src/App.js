import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Banner from "./component/Banner";
import Search from "./component/Search";

function App() {
  const apiKey = "0bf534a63860937de43a4b275fd04a61";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState({});

  // const getWeather = (event) => {
  //   if (event.key == "Enter") {
  //     // fetch(
  //     //   `https://api.openweathermap.org/data/2.5/weather?exclude=hourly,daily&q=${city}&units=metric&APPID=${apiKey}&lat={lat}&lon={lon}`
  //     // )
  //     //   .then((response) => response.json())
  //     //   .then((data) => {
  //     //     setWeatherData(data);
  //     let inputCity = cityRef.current.value;
  //     console.log("city" + inputCity);
  //     setCity(inputCity);
  //   }
  // };
  useEffect(() => {
    const fetchGeo = async () => {
      console.log("GEO" + city);
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );

      console.log("iciiii");
      setLatitude(response.data[0].lat);
      setLongitude(response.data[0].lon);
    };
    fetchGeo();
  }, [city]);

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
    console.log(longitude + " " + latitude);
    console.log("làààbass");

    fetchFiveDays();
  }, [latitude, longitude]);

  // const dateBuilder = (d) => {
  //   let months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   let days = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   let day = days[d.getDay()];
  //   let date = d.getDate();
  //   let month = months[d.getMonth()];
  //   let year = d.getFullYear();

  //   return `${day} ${date} ${month} ${year}`;
  // };

  // const currentPosition = (position) => {
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.longitude);
  // };
  // const cityRef = useRef(null);
  return (
    <div className="WeatherApp">
      <Banner />
      <Search city={city} setCity={setCity} />


      {Object.keys(forecast).length === 0 || forecast.city.name == "Globe" ? ( // si l'objet forecast est vide
        <>
        </>
      ) : (
        <div className="weather-data">
          <div>{forecast.city.name} </div>
          {/* <p className="city">{weatherData.name}</p> */}
          {/* <p>{dateBuilder(new Date())}</p> */}
          {/* <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
          <p className="weather">{weatherData.weather[0].main}</p> */}

          <div>{forecast.list[0].dt_txt.slice(0, 10)}</div>
          <div>{Math.round(forecast.list[0].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[8].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[16].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[24].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[32].main.temp)}°C</div>
        </div>
      )}

      {/* {weatherData.cod === "404" ? <p>City not found.</p> : <></>} */}
    </div>
  );
}

export default App;
