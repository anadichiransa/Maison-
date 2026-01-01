import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';

function App() {
  const [allProperties, setAllProperties] = useState([]); 
  const [filteredProperties, setFilteredProperties] = useState([]);

  
  const [favorites, setFavorites] = useState([]);

const addToFavorites = (property) => {
  // Check if already in favorites to prevent duplicates (Mark requirement!)
  if (!favorites.find(fav => fav.id === property.id)) {
    setFavorites([...favorites, property]);
  } else {
    alert("Property is already in your favorites!");
  }
}; 

// Function to remove a single property
const removeFromFavorites = (id) => {
  setFavorites(favorites.filter(fav => fav.id !== id));
};

// Function to clear the entire list
const clearFavorites = () => {
  if (window.confirm("Are you sure you want to clear all favorites?")) {
    setFavorites([]);
  }
};

  useEffect(() => {
    fetch('/properties.json')
      .then(res => res.json())
      .then(data => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      })
      .catch(err => console.error("Error loading properties:", err));
  }, []);

  // UPDATE THIS PART:
  const handleSearch = (criteria) => {
    const filtered = allProperties.filter(prop => {
      // 1. Location Search
      const matchLocation = prop.location.toLowerCase().includes(criteria.term.toLowerCase());

      // 2. Type Match (House/Flat/Any)
      const matchType = criteria.type === 'any' || prop.type === criteria.type;

      // 3. Price Range Logic
      const minP = parseFloat(criteria.minPrice) || 0;
      const maxP = parseFloat(criteria.maxPrice) || Number.MAX_VALUE;
      const matchPrice = prop.price >= minP && prop.price <= maxP;

      // 4. Bedroom Range Logic
      const minB = parseInt(criteria.minBedrooms) || 0;
      const maxB = parseInt(criteria.maxBedrooms) || 100;
      const matchBedrooms = prop.bedrooms >= minB && prop.bedrooms <= maxB;

      // Only return properties that meet ALL conditions
      return matchLocation && matchType && matchPrice && matchBedrooms;
    });

    setFilteredProperties(filtered);
  };

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
      
    <Gallery 
  properties={filteredProperties} 
  favorites={favorites} 
  onAddToFavorites={addToFavorites}
  onRemoveFromFavorites={removeFromFavorites} // NEW
  onClearFavorites={clearFavorites}           // NEW
/>
    </main>
  );
}

export default App;


/*
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';

function App() {
  const [allProperties, setAllProperties] = useState([]); 
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/properties.json')
      .then(res => res.json())
      .then(data => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
        setIsLoading(false);
        console.log('Loaded properties:', data.properties.length);
      })
      .catch(err => {
        console.error("Error loading properties:", err);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (criteria) => {
    console.log('Search criteria received:', criteria);
    
    if (allProperties.length === 0) {
      console.log('No properties to filter');
      return;
    }

    const filtered = allProperties.filter(prop => {
      // 1. Location Search
      const matchLocation = criteria.term === '' || 
                           criteria.term.toLowerCase() === 'any' ||
                           prop.location.toLowerCase().includes(criteria.term.toLowerCase());

      // 2. Type Match
      const matchType = criteria.type === 'any' || prop.type === criteria.type;

      // 3. Price Range
      const minPrice = criteria.minPrice ? parseFloat(criteria.minPrice) : null;
      const maxPrice = criteria.maxPrice ? parseFloat(criteria.maxPrice) : null;
      
      let matchPrice = true;
      if (minPrice !== null && maxPrice !== null) {
        matchPrice = prop.price >= minPrice && prop.price <= maxPrice;
      } else if (minPrice !== null) {
        matchPrice = prop.price >= minPrice;
      } else if (maxPrice !== null) {
        matchPrice = prop.price <= maxPrice;
      }

      // 4. Bedroom Range
      const minBedrooms = criteria.minBedrooms ? parseInt(criteria.minBedrooms) : null;
      const maxBedrooms = criteria.maxBedrooms ? parseInt(criteria.maxBedrooms) : null;
      
      let matchBedrooms = true;
      if (minBedrooms !== null && maxBedrooms !== null) {
        matchBedrooms = prop.bedrooms >= minBedrooms && prop.bedrooms <= maxBedrooms;
      } else if (minBedrooms !== null) {
        matchBedrooms = prop.bedrooms >= minBedrooms;
      } else if (maxBedrooms !== null) {
        matchBedrooms = prop.bedrooms <= maxBedrooms;
      }

      const matchesAll = matchLocation && matchType && matchPrice && matchBedrooms;
      
      if (matchesAll) {
        console.log('Property matched:', prop.id, prop.location, prop.price, prop.bedrooms);
      }
      
      return matchesAll;
    });

    console.log('Filtered results:', filtered.length, 'properties');
    setFilteredProperties(filtered);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading properties...</h2>
      </div>
    );
  }

  return (
    <main>
      <SearchBar onSearch={handleSearch} />
      <Gallery properties={filteredProperties} />
    </main>
  );
}

export default App;---------------


/*import React, { useState, useEffect } from 'react';
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

export default App;*/