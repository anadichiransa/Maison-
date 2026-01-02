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

            {/*React tabs*/}
            <div className="tabs-container">
                <div className="tab-buttons">
                    <button className= {activeTab === "description" ? "tab-btn active" : "tab-btn"}
                            onClick={() => setActiveTab("description")} > Desccription</button>

                    <button className={activeTab === "floorplan" ? "tab-btn-active" : "tab-btn"}
                            onClick={() => setActiveTab("floorplan")}>Floor Plan</button>

                    <button className={activeTab === "map" ? "tab-btn-active" : "tab-btn"}
                            onClick={() => setActiveTab("map")}> Map </button>
                </div>

                <div className="tab-content">
                    {activeTab === "description" && (
                        <div className="description-content">
                            <p>{properties.longDescription || property.description}</p>
                            <ul>
                                <li> Bedrooms: {property.bedrooms}</li>
                                <li>Tenure: {property.tenure}</li>
                            </ul>
                        </div>
                    )}

                    {activeTab === "floorplan" && (
                        <div className ="floorplan-content">
                            <img src={`/${property.floorplan}`} alt="Floor plan" className ="floorplan-img"/>
                        </div>
                    )}

                    {activeTab === "map" && (
                        <div className="map-content">
                            <iframe
                                title="Google Map"
                                width="100%"
                                height="300"
                                src={`https://www.google.com/maps?q=${property.location}&output=embed`}>
                            </iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyPage;