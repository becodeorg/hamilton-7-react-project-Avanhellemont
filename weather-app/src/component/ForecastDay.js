import React, { useEffect } from "react";
import axios from "axios";
// import Search from "./component/Search";

const ForecastDay = ({
  forecast,
  setForecast,
  city,
  apiKey,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) => {
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
    <div>
      <p>{forecast.city.name} </p>
      
      <div>{forecast.list[0].dt_txt.slice(0, 10)}</div>
          <div>{Math.round(forecast.list[0].main.temp)}°C</div>
          <div>{forecast.list[0].dt_txt.slice(0, 10)}</div>
          <div>{Math.round(forecast.list[8].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[16].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[24].main.temp)}°C</div>
          <div></div>
          <div>{Math.round(forecast.list[32].main.temp)}°C</div>
    </div>

    
  );
};

export default ForecastDay;
