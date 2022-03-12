import React from "react";
import stl from "./Card.module.css";

export default function Card({ name, image, temperament, weight }) {
  return (
    <div className={stl.conteinerCard}>
      <div className={stl.card}>
        <img src={image} alt="img not found" />
        <div className={stl.content}>
          <div className={stl.contentBx}>
            <h3>{name}</h3>
            <h5>{weight} Kg</h5>
            <p>{temperament}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
