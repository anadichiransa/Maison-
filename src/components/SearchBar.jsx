import React, {useState} from "react";

const SearchBar = ({onSearch}) => {
    const [formData, setFormData] = useState({
        term: " ",
        type: "any",
        minPrice: " ",
        maxPrice: " ",
        minBedrooms: " ",
        maxBedrooms:" "
    });

    const sanitizeInput = (text) => {
        return typeof text === "string" ? text.replace(/<[^>]*>?/gm, '') : text;
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        const safeValue = name === "term" ? sanitizeInput(value) : value;
        const updatedData = {...formData, [name]:safeValue};
        setFormData(updatedData);
        onSearch(updatedData);
    };

    return(
        <section className="search-container">
            <h1> Believe in Finding it </h1>
            <h3> Search for the property you are looking for </h3>

            <form className="search-form" onSubmit={(e) => e.preventDefault()}>

                {/*Search by location or postcode*/}
                <div className="filter-group">
                    <label>Search Location or Postcode</label><br/>
                    <input type="text" id="term" name="term" placeholder="e. g. Colombo" onChange={handleChange} /> <br/>
                </div>

                {/*Search by dropdown list Home or Flat*/}
                <div className="filter-group">
                    <label>Property Type</label>
                    <select name="type" onChange={handleChange}>
                        <option value="any">Any Type</option>
                        <option value="House">House</option>
                        <option value="Flat">Flat</option>
                    </select>
                </div>

                {/*Search by price range*/}
                <div className="filter-group">
                    <label>Price Range</label>
                    <div className="input-row">
                        <input type="number" name="minPrice" placeholder="Min Price" onChange={handleChange}/>
                        <input type="number" name="maxPrice" placeholder="Max Price" onChange={handleChange} />
                    </div>
                </div>

                {/*Search by amount of bedrooms*/}
                <div className="filter-group">
                    <label>Bedrooms</label>
                    <div className="input-row">
                        <input type="number" name="minBedrooms" placeholder="Min" onChange={handleChange}/>
                        <input type="number" name="maxBedrooms" placeholder="Max" onChange={handleChange}/>
                        </div>
                </div>
            </form>
        </section>
    );
};


export default SearchBar;