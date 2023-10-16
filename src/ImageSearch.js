import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSearch = ({ searchTerm }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (searchTerm) {
        const apiKey = 'AIzaSyDvYUVFf4fbgg1l8Rs467qZCz79VbRqNQc'; // Replace with your Google API key
        const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=e37c531b9bea24f3d&q=${searchTerm}&searchType=image`;

        try {
          const response = await axios.get(searchUrl);
          const data = response.data;

          if (data.items) {
            setImages(data.items.map(item => item.link));
          } else {
            setImages([]); // Clear existing images if there are no results
          }
          setError(null); // Clear any previous errors
        } catch (error) {
          console.error('Error fetching images:', error);
          setImages([]); // Clear existing images in case of an error
          setError('An error occurred while fetching images.'); // Set an error message
        }
      } else {
        // Clear images when searchTerm is empty
        setImages([]);
      }
    };

    fetchImages();
  }, [searchTerm]);

  return (
    <div>
       <h1>Google Image Search</h1>
      {error && <p>{error}</p>}
      <div className="image-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            style={{ maxWidth: '30%', height: 'auto' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
