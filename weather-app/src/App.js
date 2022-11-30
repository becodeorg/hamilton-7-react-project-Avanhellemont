import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import Banner from "./component/Banner";
import Search from "./component/Search";
import City from "./component/City";
import Forecast from "./component/Forecast";

function App() {
  const apiKey = "0bf534a63860937de43a4b275fd04a61";
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState({});

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

  return (
    <div className="WeatherApp">
      <Banner />
      <Search city={city} setCity={setCity} />

      {Object.keys(forecast).length === 0 || forecast.city.name == "Globe" ? ( // si l'objet forecast est vide
        <></>
      ) : (
        <div className="weather-data">
          <City forecast={forecast} />
          <Forecast forecast={forecast} />
          

        </div>
      )}

      {/* {weatherData.cod === "404" ? <p>City not found.</p> : <></>} */}
    </div>
  );
}

export default App;
