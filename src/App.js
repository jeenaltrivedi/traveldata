import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import WeatherDisplay from './WeatherDisplay';
import MapDisplay from './MapDisplay';
import SearchBox from './SearchBox';
import PlacesSummary from './PlacesSummary';
import ImageSearch from './ImageSearch';

const App = () => {
  
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [searchTerm, setImages] = useState(null);

  // Function to fetch weather data using OpenWeatherMap API
  const fetchWeather = async (city) => {
    try {
      const apiKey = '6eb1180161eccb06843669dbee0f87b3'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&units=metric&appid=${apiKey}`;

      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Function to fetch map center coordinates using a map API
  const fetchMapCenter = async (city) => {
    try {
       // Replace with your Google Maps API key
      const geocoder = new window.google.maps.Geocoder();
  
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const fetchedLat = results[0].geometry.location.lat();
          const fetchedLng = results[0].geometry.location.lng();
          setMapCenter({ lat: fetchedLat, lng: fetchedLng });
        } else {
          console.error('Error fetching map center:', status);
        }
      });
    } catch (error) {
      console.error('Error fetching map center:', error);
    }
  };
  

  // Function to handle city search
  const handleCitySearch = (city) => {
    setCity(city);
    fetchWeather(city);
    fetchMapCenter(city);
    setImages(searchTerm);
    
  
    // You can also add any additional logic you need here
  };

  // ... (Any other functions you may have)

  // Render the component
  return (
    <div className="App">
      <Header />
      <SearchBox onSearch={handleCitySearch} />
 
      <WeatherDisplay weather={weatherData} />
      <MapDisplay center={mapCenter} />
      <PlacesSummary city={city} />
      <ImageSearch searchTerm={city} />
    

      {/* Additional components and content can be added here */}
    </div>
  );
};

export default App;
