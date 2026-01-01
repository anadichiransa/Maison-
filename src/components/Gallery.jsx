import React from "react";

const Gallery = ({properties }) => {
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
