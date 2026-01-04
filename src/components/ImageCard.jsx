import React from "react";
import {Link} from "react-router-dom";

//Object Destructuring
const ImageCard =({product, onAddToFavorites }) => {

    const { type,location,added,price,picture,bedrooms } = product;

    const handleDragStart =(e) => {
        e.dataTransfer.setData("propertyId",product.id);
    };

    return (
        <section className="card" draggable="true" onDragStart={handleDragStart}>

            {/* Display the image */}
            <div className="image">
                <img src={picture} alt={type}/>
            </div>

            {/* Image description */}
            <div className="description">
                <h3>{type} - RS.{price.toLocaleString()}</h3>

                {/*View detail*/}
                <Link to= {`/property/${product.id}`}>
                    <button className="view-details-btn"> View Full Details</button>
                </Link>
                <div className="poperty-display">
                <p><strong>Bedrooms: </strong>{bedrooms} </p>
                <p><strong>Location: </strong>{location} ({product.postcode})</p>
                <p><strong>Added: </strong>{added.month} {added.day}, {added.year}</p>
                </div> 
                {/*Favourite section button*/}
                <button className="fav-btn" onClick={() => onAddToFavorites(product)}> Add to the Favorites </button>
            </div>
        </section>
    );
};

export default ImageCard;