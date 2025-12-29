import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';

function App() {
  const [allProperties, setAllProperties] = useState([]); 
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {

    fetch('/properties.json')
      .then(res => res.json())
      .then(data => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch(err => console.error("Error loading properties:", err));
  }, []);

  const handleSearch = (criteria) => {
  
    console.log("Searching for:", criteria);
  };

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
      <Gallery properties={filteredProperties} />
    </main>
  );
}

export default App;