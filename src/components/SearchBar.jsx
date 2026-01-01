import React, {useState} from "react";

function SearchBar(){
    return(
        <section className="search-container">
            <h1> Believe in Finding it </h1>
            <h3> Search for the property you are looking for </h3>

            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="term">Search Location or Postcode</label><br/>
                <input type="text" id="term" name="term" placeholder="e. g. BR5 or London" /> <br/>

                <div className="filter-button">
                    <button type="button">For Sale</button>
                    <button type="button">For rent</button>
                </div>
            </form>
        </section>
    );
};


export default SearchBar();