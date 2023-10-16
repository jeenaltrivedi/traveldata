import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import axios from 'axios';

const WikipediaPlaceSearch = () => {
  const [address, setAddress] = useState('');
  const [placeDetails, setPlaceDetails] = useState(null);

  const fetchPlaceDetails = async () => {
    try {
      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
          placeDetails
        )}&origin=*`
      );

      const pageId = Object.keys(response.data.query.pages)[0];
      setPlaceDetails(response.data.query.pages[pageId]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleSelect = async (selectedAddress) => {
    try {
      setAddress(selectedAddress);
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      // Use latLng to fetch Wikipedia data
      setPlaceDetails(selectedAddress);
      fetchPlaceDetails();
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({ placeholder: 'Enter a place name' })}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div>
              {loading ? <div>Loading...</div> : null}
              {suggestions.map((suggestion) => {
                const style = suggestion.active ? { backgroundColor: '#e0e0e0', cursor: 'pointer' } : {};
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.placeId}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {placeDetails && (
        <div>
          <h2>{placeDetails.title}</h2>
          <p>{placeDetails.extract}</p>
        </div>
      )}
    </div>
  );
};

export default WikipediaPlaceSearch;
