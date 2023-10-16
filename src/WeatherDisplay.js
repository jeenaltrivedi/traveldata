import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) {
    return <div>Loading...</div>;
  }

  const { name, main, weather: weatherDetails } = weather;
  const temperature = main.temp;
  const description = weatherDetails[0].description;
  const icon = weatherDetails[0].icon;

  return (
    <div className="weather-display">
      <h2>Weather in {name}</h2>
      <div className="weather-info">
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={description}
          />
        </div>
        <div className="weather-details">
          <p>Temperature: {temperature}°C</p>
          <p>Description: {description}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
