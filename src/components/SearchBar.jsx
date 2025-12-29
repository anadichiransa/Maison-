import React from 'react';

const SearchBar = () => {
  return (
    <section className="search-container">
      <h1>Believe in Finding it</h1>
      <h3>Search for the property you are looking for</h3>
      
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="term">Search Location or Postcode</label><br/>
        <input type="text" id="term" name="term" placeholder="e.g. BR5 or London" /><br/>
        
        {/* We will add more React Widgets here later to meet the 8% mark [cite: 313] */}
        <div className="filter-buttons">
          <button type="button">For Sale</button>
          <button type="button">For Rent</button>
        </div>
      </form>
    </section>
  );
};

export default SearchBar;