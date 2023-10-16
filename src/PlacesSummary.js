import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesSummary = ({ city }) => {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
            city
          )}&origin=*`
        );

        const pageId = Object.keys(response.data.query.pages)[0];
        setSummary(response.data.query.pages[pageId].extract);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };

    fetchSummary();
  }, [city]);

  return (
    <div className="places-summary">
      <h2>Places Summary</h2>
      <p>{summary}</p>
    </div>
  );
};

export default PlacesSummary;
