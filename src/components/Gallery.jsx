import React from "react";

const Gallery = ({properties,favorites, onAddToFavorites,onRemoveFromFavorites, onClearFavorites }) => {
    

    //Darg in to the favourites
    const handleDropIntoFavs =(e) => {
        e.preventDefault();
        const propertyId = e.dataTransfer.getData("propertyId");
        const popertyToAdd = properties.find(p => p.id == propertyId.id);
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
            <div className="all-items">
                <h2> Available Properties </h2>

                {/* When no property available */}
                {properties.length === 0 && <p> No properties found.</p>}

                {/* Gallerycards */}
                <div className="gallery">
                    {properties.map((product) => (
                        <ImageCard key={product.id} product={product}/>
                    ))}

                </div>
            </div>

            {/* Favourites section */}
            <div className="favourites">
                <h2>Favorites</h2>
                <p>Drag properties here to save them!</p>
            </div>
        </div>
    );
};

export default Gallery;
