import React, { useState, useRef } from "react";

const Search = ({ city, setCity }) => {
  const getWeather = (event) => {
    if (event.key == "Enter") {
      let inputCity = cityRef.current.value;
      console.log("bjjrrr");
      setCity(inputCity);
    }
  };

  const cityRef = useRef(null);

  return (
    <div className="flex justify-center mt-3 mr-3 ml-3 ">
      <input
        className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        max-w-screen-md"
        placeholder="Enter City..."
        type="text"
        defaultValue={city} // récupère la valeur : city
        onKeyPress={getWeather}
        ref={cityRef}
      />
    </div>
  );
};

export default Search;
