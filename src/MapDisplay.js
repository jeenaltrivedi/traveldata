import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapDisplay = ({ center, shouldLoadMap }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px', // Adjust the height as needed
  };

  if (!shouldLoadMap) {
    return null; // Don't load the map if shouldLoadMap is false
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyAX0OjsvGZFaLvdaYyOvaWvRmSpnEqVNIo">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} />
        <h1>Google Map</h1>
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
