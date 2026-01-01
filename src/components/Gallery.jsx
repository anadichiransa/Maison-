import React from "react";
import ImageCard from './ImageCard';

const Gallery = ({properties,favorites, onAddToFavorites,onRemoveFromFavorites, onClearFavorites }) => {
    

    //Darg in to the favourites
    const handleDropIntoFavs =(e) => {
        e.preventDefault();
        const propertyId = e.dataTransfer.getData("propertyId");
        const popertyToAdd = properties.find(p => p.id == propertyId);
        if (popertyToAdd) onAddToFavorites(popertyToAdd);
    };

    //Drag out of favorites 
    const handleDropOutOfFavs = (e) => {
        e.preventDefault();
        const propertyId = e.dataTransfer.getData("propertyId");
        onRemoveFromFavorites(propertyId);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div className="container">

            {/*Drag zone to remove favorites*/}
            <div className="all-items" onDrop={handleDropOutOfFavs} onDragOver={handleDragOver}>
                <h2> Available Properties ({properties.length}) </h2>

                {/* When no property available */}
                {properties.length === 0 && <p> No properties found.</p>}

                {/* Gallerycards */}
                <div className="gallery">
                    {properties.map((product) => (
                        <ImageCard key={product.id} 
                        product={product}
                        onAddToFavorites={onAddToFavorites} 
                        />
                    ))}

                </div>
            </div>

            {/* Favourites section */}
            <div className="favorites" onDrop={handleDropIntoFavs} onDragOver={handleDragOver}>
                <div className="fav-header">
                    <h2>Favorites</h2>
                    {favorites.length > 0 && (
                        <button onClick={onClearFavorites} className="clear-btn"> Clear All</button>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <p>Drag properties here to save them!</p>
                ) : (
                    favorites.map((fav) => (
                    <div key={fav.id} className="fav-item"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("propertyId", fav.id)}>

                        <img src={fav.picture} alt ={fav.type} className="fav-thumbnail"/>

                        <div className="fav-info">
                            <h4>{fav.type}</h4>   
                            <p>${ fav.price.toLocaleString() }</p> 
                        </div>

                        <button className="delete-btn" onClick={() => onRemoveFromFavorites(fav.id)}>
                            &times;
                        </button>
                    </div>
                    ))
                )}
                </div>
        </div>
                
    );
};

export default Gallery;
