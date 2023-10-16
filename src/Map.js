import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-map-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: null,
    };
  }

  componentDidMount() {
    this.fetchMapCenter('New York'); // Replace with your desired city
  }

  fetchMapCenter = (city) => {
    const geocoder = new this.props.google.maps.Geocoder();

    geocoder.geocode({ address: city }, (results, status) => {
      if (status === 'OK') {
        const fetchedLat = results[0].geometry.location.lat();
        const fetchedLng = results[0].geometry.location.lng();
        this.setState({ mapCenter: { lat: fetchedLat, lng: fetchedLng } });
      } else {
        console.error('Error fetching map center:', status);
      }
    });
  };

  render() {
    const { mapCenter } = this.state;

    return (
      <div style={{ width: '100%', height: '500px' }}>
        {mapCenter && (
          <Map
            google={this.props.google}
            initialCenter={mapCenter}
            zoom={10}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAX0OjsvGZFaLvdaYyOvaWvRmSpnEqVNIo', // Replace with your actual Google Maps API key
})(MapContainer);
