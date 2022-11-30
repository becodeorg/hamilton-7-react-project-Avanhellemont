import React from "react";

const Forecast = ({ forecast }) => {
  return (
    <div>
      <div className="bg-blue-200 ">
        <h3 class="text-center font-bold">Today</h3>
        <p class="text-center">{Math.round(forecast.list[0].main.temp)}°C</p>
      </div>

      <div className="bg-blue-50">
        <h3 class="text-center font-bold">{forecast.list[8].dt_txt.slice(0, 10)}</h3>
        <p class="text-center">{Math.round(forecast.list[8].main.temp)}°C</p>
      </div>

      <div className="bg-blue-50">
        <h3 class="text-center font-bold">{forecast.list[16].dt_txt.slice(0, 10)}</h3>
        <p class="text-center">{Math.round(forecast.list[16].main.temp)}°C</p>
      </div>

      <div className="bg-blue-50">
        <h3 class="text-center font-bold">{forecast.list[24].dt_txt.slice(0, 10)}</h3>
        <p class="text-center">{Math.round(forecast.list[24].main.temp)}°C</p>
      </div>

      <div className="bg-blue-50">
        <h3 class="text-center font-bold">{forecast.list[32].dt_txt.slice(0, 10)}</h3>
        <p class="text-center">{Math.round(forecast.list[32].main.temp)}°C</p>
      </div>
    </div>
  );
};

export default Forecast;
