import React, { useState, useEffect } from 'react';
import ImageCard from './ImageCard';

const Gallery = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/properties.json'); 
        const data = await response.json();
        setProducts(data.properties); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="all-items">
        <h2>Available Properties</h2>
        <div className="gallery">
          {products.map((product) => (
            <ImageCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="favorites">
        <h2>Favorites</h2>
        <p>Drag properties here to save them!</p>
  
      </div>
    </div>
  );
};

export default Gallery;