import React from "react";

export default function Card({name, image, temperament, weight}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{weight}</h5>
            <p>{temperament}</p>
            <img src={image} alt="img not found" width="200px" height="250px" />
        </div>
    )
}