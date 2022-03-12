import React from "react";
import { Link } from "react-router-dom";
import stl from "./PageError.module.css";

export default function PageError() {
  return (
    <div className={stl.divPageError}>
      <h1> ERROR 404 </h1>
      <h3> Page not found! </h3>
      <Link to="/home">
        <button className={stl.btnVolverr}>Back</button>
      </Link>
    </div>
  );
}
