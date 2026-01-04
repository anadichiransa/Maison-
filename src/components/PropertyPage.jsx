
import {useParams, useNavigate} from "react-router-dom";
import {useState} from "react";


const PropertyPage = ({properties}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    //Sate for tabs
    const [activeTab, setActiveTab] = useState("description");

    //Finding specific property from the array
    const property = properties.find(p => p.id === id);

    //State for main images 
    const [mainImage,setMainImage] = useState(property?.picture);

    if(!property) return <h2> Property not found!!</h2>

    return(
        <div className="property-page">
            <button className="back-btn" onClick={() => navigate(-1)}> ← Back To Search </button>
            <h1> {property.type} in {property.location} </h1>

            {/*main gallert section*/}
            <div className="gallery-container">
                <div className="main-image-view">
                    <img src={`/${mainImage}`} alt= {property.type} className="detail-main-image"/>
                </div>

                {/*Thumbanails for extra images*/}
                <div className="thumbnail-grid">

                    {/*Main picture as first thumbnail*/}
                    <img src={`/${property.picture}`} 
                         className={mainImage === property.picture? "thumbnail active-thumb" : "thumbnail"}
                         onClick={() => setMainImage(property.picture)}
                         alt="main view"
                    />

                    {/*extra images thumbanails*/}
                    {property.images && property.images.map((img,index) =>(
                        <img key = {index}
                            src ={`/${img}`}
                            alt={`view${index}`}
                            className={mainImage === img ? "thumbnail active-thumb" : "thumbnail"}
                            onClick={() => setMainImage(img)}
                            />
                    ))}
                </div>
            </div>
            
            <p className="detail-price"> Price: Rs.{property.price.toLocaleString()}</p>

            {/*React tabs*/}
            <div className="tabs-container">
                <div className="tab-buttons">
                    <button className= {activeTab === "description" ? "tab-btn active" : "tab-btn"}
                            onClick={() => setActiveTab("description")} > Desccription</button>

                    <button className={activeTab === "floorplan" ? "tab-btn active" : "tab-btn"}
                            onClick={() => setActiveTab("floorplan")}>Floor Plan</button>

                    <button className={activeTab === "map" ? "tab-btn active" : "tab-btn"}
                            onClick={() => setActiveTab("map")}> Map </button>
                </div>

                <div className="tab-content">
                    {activeTab === "description" && (
                        <div className="description-content">
                            <p>{property.longDescription || property.description}</p>
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
                                title={`Map of ${property.location}`}
                                className="google-map-frame"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location + ", Sri Lanka")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                loading="lazy"
                                allowFullScreen
                                >
                            </iframe>

                            <div className="map-footer">
                                <p><strong>Address: </strong> {property.location}</p>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location + ", Sri Lanka")}`} 
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="map-link"
                                   >

                                   </a>
                        </div>
                    
                </div>
                    )}
            </div>
            </div>
                    
        </div>
    );
};

export default PropertyPage;