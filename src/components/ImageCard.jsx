import React from 'react';

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

export default ImageCard;