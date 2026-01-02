import React from "react";
import {useParams, useNavigate} from "react-router-dom";

const PropertyPage = ({properties}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    //Finding the property using the Id from the URL 
    const property = properties.find(p => p.id === id);

    if(!property) return <h2> Property not found!!</h2>

    return(
        <div className="property-page">
            <button className="back-btn" onClick={() => navigate(-1)}> ← Back To Search </button>
            <h1> {property.type} in {property.location} </h1>
            <img src={`/${property.picture}`} alt= {property.type} className="detail-main-image"/>
            <p className="detail-price"> Price: ${property.price.toLocaleString()}</p>
        </div>
    );
};

export default PropertyPage;