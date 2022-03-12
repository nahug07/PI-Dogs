import React from "react";
import stl from "./Paging.module.css";

export default function Paging({ dogsPage, allDogs, paging, currentPage }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className={stl.paginado}>
        {pageNumber?.map((number) => (
          <li key={number} className={stl.number}>
            {<button onClick={() => paging(number)}>{number}</button>}
          </li>
        ))}
        <br />
        <h3>{`Current page ${currentPage}`}</h3>
      </ul>
    </div>
  );
}
