import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    term: '',
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onSearch(updatedData); // Real-time filtering as you type
  };

  return (
    <section className='search-container'>
      <h1>Believe in Finding it</h1>
      <h3>Search by Location, Price, or Bedrooms</h3>
      
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        {/* Postcode/Location Search */}
        <div className="filter-group">
          <label>Location/Postcode</label>
          <input type="text" name="term" placeholder="e.g. BR5 or London" onChange={handleChange} />
        </div>

        {/* Property Type Dropdown - UI Widget */}
        <div className="filter-group">
          <label>Property Type</label>
          <select name="type" onChange={handleChange}>
            <option value="any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price Range - UI Widgets */}
        <div className="filter-group">
          <label>Price Range</label>
          <div className="input-row">
            <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
          </div>
        </div>

        {/* Bedroom Range - UI Widgets */}
        <div className="filter-group">
          <label>Bedrooms</label>
          <div className="input-row">
            <input type="number" name="minBedrooms" placeholder="Min" onChange={handleChange} />
            <input type="number" name="maxBedrooms" placeholder="Max" onChange={handleChange} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;

/*
import React, { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    term: '',
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: ''
  });

  // Debounce search to avoid too many calls
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(formData);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [formData, onSearch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      term: '',
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: ''
    });
  };

  return (
    <section className='search-container'>
      <h1>Believe in Finding it</h1>
      <h3>Search for the property you are looking for</h3>
      
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="filter-group">
          <label htmlFor="term">Location/Postcode</label>
          <input 
            type="text" 
            id="term" 
            name="term" 
            value={formData.term} 
            placeholder="e.g. BR5 or London" 
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="type">Property Type</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range (£)</label>
          <div className="input-row">
            <input 
              type="number" 
              name="minPrice" 
              value={formData.minPrice} 
              placeholder="Min Price" 
              onChange={handleChange}
              min="0"
              step="1000"
            />
            <input 
              type="number" 
              name="maxPrice" 
              value={formData.maxPrice} 
              placeholder="Max Price" 
              onChange={handleChange}
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Bedrooms</label>
          <div className="input-row">
            <input 
              type="number" 
              name="minBedrooms" 
              value={formData.minBedrooms} 
              placeholder="Min" 
              onChange={handleChange}
              min="0"
              step="1"
            />
            <input 
              type="number" 
              name="maxBedrooms" 
              value={formData.maxBedrooms} 
              placeholder="Max" 
              onChange={handleChange}
              min="0"
              step="1"
            />
          </div>
        </div>
        
        <button 
          type="button" 
          onClick={handleClear} 
          className="clear-btn"
        >
          Clear Filters
        </button>
      </form>
    </section>
  );
};

export default SearchBar;-----------------------------

/*import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    term: '',
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    onSearch(updatedData); // Real-time filtering as you type
  };

  return (
    <section className='search-container'>
      <h1>Believe in Finding it</h1>
      <h3>Search by Location, Price, or Bedrooms</h3>
      
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        {/* Postcode/Location Search }
        <div className="filter-group">
          <label>Location/Postcode</label>
          <input type="text" name="term" placeholder="e.g. BR5 or London" onChange={handleChange} />
        </div>

        {/* Property Type Dropdown - UI Widget }
        <div className="filter-group">
          <label>Property Type</label>
          <select name="type" onChange={handleChange}>
            <option value="any">Any Type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>

        {/* Price Range - UI Widgets }
        <div className="filter-group">
          <label>Price Range</label>
          <div className="input-row">
            <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange} />
            <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
          </div>
        </div>

        {/* Bedroom Range - UI Widgets }
        <div className="filter-group">
          <label>Bedrooms</label>
          <div className="input-row">
            <input type="number" name="minBedrooms" placeholder="Min" onChange={handleChange} />
            <input type="number" name="maxBedrooms" placeholder="Max" onChange={handleChange} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;
*/


/*import React from 'react';

function SearchBar() {
  return (
    <section className="search-container">
      <h1>Believe in Finding it</h1>
      <h3>Search for the property you are looking for</h3>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="term">Search Location or Postcode</label><br/>
        <input type="text" id="term" name="term" placeholder="e.g. BR5 or London" /><br/>
        
        {/* We will add more React Widgets here later to meet the 8% mark [cite: 313] }
        <div className="filter-buttons">
          <button type="button">For Sale</button>
          <button type="button">For Rent</button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;*/