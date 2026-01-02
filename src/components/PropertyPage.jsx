import React from "react";
import {useParams, useNavigate} from "react-router-dom";


const PropertyPage = ({properties}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    //Sate for tabs
    const [activeTab, setActiveTab] = useState("description");

    //Finding the property using the Id from the URL 
    const property = properties.find(p => p.id === id);

    if(!property) return <h2> Property not found!!</h2>

    return(
        <div className="property-page">
            <button className="back-btn" onClick={() => navigate(-1)}> ← Back To Search </button>
            <h1> {property.type} in {property.location} </h1>

            {/*main gallert section*/}
            <div className="gallery-container">
                <div className="main-image-view">
                    <img src={`/${property.picture}`} alt= {property.type} className="detail-main-image"/>
                </div>

                {/*Thumbanails for extra images*/}
                <div className="thumbnail-grid">
                    {property.images && property.images.map((img,index) =>(
                        <img key = {index}
                            src ={`/${img}`}
                            alt={`view${index}`}
                            className="thumbnail"
                            />
                    ))}
                </div>
            </div>
            
            <p className="detail-price"> Price: ${property.price.toLocaleString()}</p>
        </div>
    );
};

export default PropertyPage;