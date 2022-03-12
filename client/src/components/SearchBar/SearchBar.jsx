import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../actions";
import stl from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function HandleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
    setName("");
  }

  return (
    <div className={stl.searchBox}>
      <input
        className={stl.sbinput}
        type="text"
        placeholder="Look for a dog.."
        onChange={(e) => HandleInputChange(e)}
        value={name}
      />
      <button
        className={stl.sbbot}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
