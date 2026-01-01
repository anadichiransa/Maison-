import React,{ useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";

function App(){
  const [allProperties, setAllProperties ] = useState([]); // holds all the properties loaded from JSON
  const [filteredProperties, setFilteredProperties ] = useState([]); // holds filtered properties

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
      console.logO("Searching for: " , criteria);
    };

    //Render the UI
    return (
      <main>
        <SearchBar onsearch={handleSearch}/>
        <Gallery properties ={filteredProperties} />
      </main>
    );
  }

export default App;




