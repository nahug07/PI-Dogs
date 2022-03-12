import React from "react";
import { Link } from "react-router-dom";
import stl from "./Landing.module.css";

export default function LandingPage() {
  return (
    <div className={stl.cLanding}>
      <div className={stl.conteiner1}>
        <h1>DOG APP</h1>
      </div>
      <Link to="/home">
        <button className={stl.btnLanding}>Start</button>
      </Link>
    </div>
  );
}
