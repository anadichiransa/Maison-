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
                    <h2>Select - Secure - Settle</h2>
                    {favorites.length > 0 && (
                        <button onClick={onClearFavorites} className="clear-btn"> Clear All</button>
                    )}
                </div>

                {favorites.length === 0 ? (
                    <p>Saw something you like? Drag properties here to save them!</p>
                ) : (
                    favorites.map((fav) => (
                    <div key={fav.id} className="fav-item"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("propertyId", fav.id)}>

                        <img src={fav.picture} alt ={fav.type} className="fav-thumbnail"/>

                        <div className="fav-info">
                            <h4>{fav.type}</h4>   
                            <p>Rs.{ fav.price.toLocaleString() }</p> 
                        </div>

                        <button className="delete-btn" onClick={() => onRemoveFromFavorites(fav.id)}>
                            &times;
                        </button>
                    </div>
                    ))
                )}

                <div className="sidebar-info-block">
                     
                     {/*Contact us*/}
                     <div className="section-title">
                        Contact Us
                     </div>
                     <div className="info-items">
                        <div className="branch-detail">
                            <p className="branch-name">Colombo Corporate Headquarters</p>
                            <p>75 Galle Road,Colombo 03</p>
                            <p className="branch-contact"> +94 11 111 1111</p>
                        </div>
                     </div>

                     <div className="info-items">
                        <div className="branch-detail">
                            <p className="branch-name">Central Province Regional Office</p>
                            <p>12,Peradeniya Road,Kandy</p>
                            <p className="branch-contact"> +94 81 222 2222</p>
                        </div>
                     </div>

                     <div className="info-items">
                        <div className="branch-detail">
                            <p className="branch-name">Souther Coast Branch</p>
                            <p>42 Dutch Hospital,Galle Fort</p>
                            <p className="branch-contact"> +94 91 111 1111</p>
                        </div>
                     </div>

                     {/*Clinet's Feedback*/}
                     <div className="testimonal-block">
                        <h4 className="section-title">Client Feedback</h4>
                        <div className="testimonal-item">
                            <p className="quote">"Maison made finding our villa in Kandy effortless. The secure portal gave us total peace of mind."</p>
                            <p className="client-name"> -Aruni & Sunil Perera</p>
                        </div>
                     </div>

                     <div className="testimonal-block">
                        <h4 className="section-title">Client Feedback</h4>
                        <div className="testimonal-item">
                            <p className="quote">"Exceptional service and the most curated collection of apartments in Colombo. Highly recommended!"</p>
                            <p className="client-name"> -Dr.James Karunarathne</p>
                        </div>
                     </div>

                     <div className="testimonal-block">
                        <h4 className="section-title">Client Feedback</h4>
                        <div className="testimonal-item">
                            <p className="quote">"The drag-and-drop favorites feature made our house hunting so organized. Truly a professional experience."</p>
                            <p className="client-name"> -Nilanthi & Karuna Silva</p>
                        </div>
                     </div>

                     <div className="testimonal-block">
                        <h4 className="section-title">Client Feedback</h4>
                        <div className="testimonal-item">
                            <p className="quote">"Found a beach-front property in Galle within a week. The detailed maps and floorplans were incredibly helpful."</p>
                            <p className="client-name"> -Shel & Sara Thomas</p>
                        </div>
                     </div>


                </div>

            </div>

        </div>
                
    );
};

export default Gallery;
