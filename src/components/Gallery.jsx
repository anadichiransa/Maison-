import React from 'react';
import ImageCard from './ImageCard';

const Gallery = ({ properties, favorites, onAddToFavorites, onRemoveFromFavorites, onClearFavorites }) => {
  
  // Drag INTO favorites
  const handleDropIntoFavs = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const propertyToAdd = properties.find(p => p.id === propertyId);
    if (propertyToAdd) onAddToFavorites(propertyToAdd);
  };

  // Drag OUT of favorites (Requirement: dragging it out of the list)
  const handleDropOutOfFavs = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    onRemoveFromFavorites(propertyId);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="container">
      {/* Main Area: Now acts as a drop zone to remove favorites */}
      <div className="all-items" onDrop={handleDropOutOfFavs} onDragOver={handleDragOver}>
        <h2>Available Properties ({properties.length})</h2>
        <div className="gallery">
          {properties.map((product) => (
            <ImageCard 
              key={product.id} 
              product={product} 
              onAddToFavorites={onAddToFavorites} 
            />
          ))}
        </div>
      </div>

      {/* Favorites Sidebar */}
      <div className="favorites" onDrop={handleDropIntoFavs} onDragOver={handleDragOver}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Favorites</h2>
          {favorites.length > 0 && (
            <button onClick={onClearFavorites} className="clear-btn">Clear All</button>
          )}
        </div>

        {favorites.length === 0 ? (
          <p>Drag properties here to save them!</p>
        ) : (
          <div className="fav-list">
            {favorites.map(fav => (
              <div 
                key={fav.id} 
                className="fav-item" 
                draggable 
                onDragStart={(e) => e.dataTransfer.setData("propertyId", fav.id)}
              >
                <img src={fav.picture} alt="" style={{width: '50px', borderRadius: '5px'}} />
                <div className="fav-info">
                  <h4>{fav.type}</h4>
                  <p>£{fav.price.toLocaleString()}</p>
                </div>
                {/* Delete Button (Requirement: pressing a delete button) */}
                <button 
                  className="delete-btn" 
                  onClick={() => onRemoveFromFavorites(fav.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;


/*import React from 'react';
import ImageCard from './ImageCard';

const Gallery = ({ properties }) => {
  return (
    <div className="container">
      <div className="all-items">
        <h2>Available Properties</h2>

        {properties.length === 0 && <p>No properties found</p>}

        <div className="gallery">
          {properties.map((product) => (
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
*/