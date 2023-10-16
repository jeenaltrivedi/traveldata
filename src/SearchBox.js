import React, { useState } from 'react';

const SearchBox = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for places..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit" >Search</button>
    </form>
  );
};

export default SearchBox;
