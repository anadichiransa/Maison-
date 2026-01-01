import React from "react";

//Object Destructuring
const ImageCard =({product}) => {

    const { type,brand,location,added,price,picture,bedrooms } = product;

    return (
        <section className="card">

            {/* Display the image */}
            <div className="image">
                <img src={picture} alt={`${type} in ${location}`}/>
            </div>

            {/* Image description */}
            <div className="description">
                <h3>{type} - ${price.toLocalString()}</h3>
                <p><strong>Bedrooms: </strong>{bedrooms} </p>
                <p><string>Location: </string>{location}</p>
                <p><strong>Added: </strong>{added.month} {added.day}, {added.year}</p>
                <button className="fav-btn"> Add to the Favourites </button>
            </div>
        </section>
    );
};

export default ImageCard;