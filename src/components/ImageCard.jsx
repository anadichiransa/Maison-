import React from 'react';

const ImageCard = ({ product, onAddToFavorites }) => {
  const { type, price, location, added, picture } = product;

  // MARK REQUIREMENT: Drag and Drop setup [cite: 324]
  const handleDragStart = (e) => {
    e.dataTransfer.setData("propertyId", product.id);
  };

  return (
    <section 
      className="card" 
      draggable="true" 
      onDragStart={handleDragStart}
    >
      <div className="image">
        <img src={picture} alt={type} />
      </div>
      <div className="description">
        <h3>{type} - £{price.toLocaleString()}</h3>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Added:</strong> {added.month} {added.day}, {added.year}</p>
        
        {/* MARK REQUIREMENT: Favorite Button [cite: 324, 404] */}
        <button 
          className="fav-btn" 
          onClick={() => onAddToFavorites(product)}
        >
          Add to Favorites
        </button>
      </div>
    </section>
  );
};

export default ImageCard;




/*import React from 'react';

const ImageCard = ({ product }) => {
  
  const { type, brand, location, added, price, picture, bedrooms } = product;

  return (
    <section className="card">
      <div className="image">
        
        <img src={picture} alt={`${type} in ${location}`} />
      </div>
      <div className="description">
        <h3>{type} - £{price.toLocaleString()}</h3>
        <p><strong>Bedrooms:</strong> {bedrooms}</p>
        <p><strong>Location:</strong> {location}</p>
        <p><strong>Added:</strong> {added.month} {added.day}, {added.year}</p>
        <button className="fav-btn">Add to Favorites</button>
      </div>
    </section>
  );
};

export default ImageCard;*/