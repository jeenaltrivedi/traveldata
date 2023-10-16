import React, { useState } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./WeatherApp.css"; 
const WeatherApp = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Function to fetch weather data
  const fetchWeatherData = (lat, lng) => {
    const apiKey = "6eb1180161eccb06843669dbee0f87b3";
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    axios
      .get(weatherApiUrl)
      .then((response) => {
        setWeatherInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  // Function to handle place selection from autocomplete
  const handlePlaceSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setSelectedPlace({
          address,
          latLng,
        });
        fetchWeatherData(latLng.lat, latLng.lng);
      })
      .catch((error) => {
        console.error("Error fetching geolocation data:", error);
      });
  };

  return (
    <div>
      {/* Input field for place with autocomplete */}
      <PlacesAutocomplete
        value={selectedPlace ? selectedPlace.address : ""}
        onChange={(address) => setSelectedPlace({ address })}
        onSelect={handlePlaceSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <h1>Travel</h1>
            <input
              {...getInputProps({
                placeholder: "Enter a place",
              })}
            />
            <div>
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {/* Div to display the weather information */}
      {weatherInfo && (
        <div className="weather-container">
          <h2>Weather in {selectedPlace && selectedPlace.address}</h2>
          <p>Temperature: {weatherInfo.main.temp} °C</p>
          <p>Condition: {weatherInfo.weather[0].main}</p>
          <p>Location: {weatherInfo.name}</p>
          <p>Weather Description: {weatherInfo.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;