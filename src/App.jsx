import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import React,{ useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";

import PropertyPage from "./components/PropertyPage";


function App(){
  const [allProperties, setAllProperties ] = useState([]); // holds all the properties loaded from JSON
  const [filteredProperties, setFilteredProperties ] = useState([]); // holds filtered properties
  const [favorites, setFavorites] =useState([]);

  const addToFavorites =(property) => {


    //Adding fvourites and checking for duplications
    if(!favorites.find(fav => fav.id == property.id)){
      setFavorites([...favorites,property]);
    }
    else {
      alert("Property is already in your favorites!");
    }
  };

  //Removing single property from favorites 
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  //remove all the properties from favorites
  const clearFavorites = () => {
    if(window.confirm("Are you sure you want to clear all favorites?")){
      setFavorites([]);
    }
  };

  //Function to fetch data
  useEffect(() => {

    fetch("/properties.json")
      .then(res => res.json())
      .then(data => {
        setAllProperties(data.properties);
        setFilteredProperties(data.properties);
      })

      .catch(err => console.error("Error loading properties: " , err));
    },[]);

    //Fucntion to handle data input
    const handleSearch = (criteria) => {
      const filtered = allProperties.filter(prop => {

        //Search by Location
        const matchLocation = prop.location.toLowerCase().includes(criteria.term.toLowerCase());

        //Search by Type
        const matchType = criteria.type === "any" || prop.type.toLowerCase() === criteria.type.toLowerCase();

        //Search by Price
        const minP = parseFloat(criteria.minPrice) || 0 ;
        const maxP = parseFloat(criteria.maxPrice) || Number.MAX_VALUE;
        const matchPrice = prop.price >= minP && prop.price <= maxP;

        //Search By number of bedrooms
        const minB = parseInt(criteria.minBedrooms) || 0;
        const maxB = parseInt(criteria.maxBedrooms) || 100;
        const matchBedrooms = prop.bedrooms >= minB && prop.bedrooms <= maxB;

        //return the properties that match the conditions
        return matchLocation && matchType && matchPrice && matchBedrooms;

    });

    setFilteredProperties(filtered);
  };

    //Render the UI
    return (
      <Router>
      <main>
        <Routes>

          {/*Home Route*/}
          <Route path="/" element={
            <>
            <SearchBar onSearch={handleSearch}/>
            <Gallery properties ={filteredProperties} 
                    favorites={favorites}
                    onAddToFavorites={addToFavorites}
                    onRemoveFromFavorites={removeFromFavorites}
                    onClearFavorites={clearFavorites} 
            />
            </>
          }/>

          {/*Detailed route in single property page*/}
          <Route path="/property/:id" element={<PropertyPage properties={allProperties} />} />
        
        </Routes>
      </main>
      </Router>
    );
  }

export default App;




