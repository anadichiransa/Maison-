import React from "react";
import {useParams, useNavigate} from "react-router-dom";

const PropertyPage = ({properties}) => {
    const {id} = useParams();
    const navigate = useNavigate();

    //Finding the property using the Id from the URL 
    const property = properties.find(p => p.id === id);

    if(!property) return <h2> Property not found!!</h2>

    
};