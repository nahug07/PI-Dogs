import React from "react";
import stl from "./Loading.module.css";

export default function LoadingScreen({ setLoading }) {
  return (
    <>
      <div className={stl.woorupape}>
        <div className={stl.fouGif}>
          <div className={stl.spinner}></div>
        </div>
        <div className={stl.time}>
          {setTimeout(() => {
            setLoading(false);
          }, 2500)}
        </div>
      </div>
    </>
  );
}
