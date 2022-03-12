import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../actions/index.js";
import stl from "./DogCreate.module.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.charAt(0) !== input.name.charAt(0).toUpperCase()) {
    errors.name = "The first letter must be uppercase";
  } else if (!input.min_height) {
    errors.min_height = "Min height is required";
  } else if (input.min_height <= 0) {
    errors.min_height = "Min height should be greater than zero";
  } else if (!input.max_height) {
    errors.max_height = "Max height is required";
  } else if (input.max_height <= 0) {
    errors.max_height = "Max height should be greater than zero";
  } else if (parseInt(input.min_height) >= parseInt(input.max_height)) {
    errors.max_height = "Max height must be greater than Min height";
  } else if (!input.min_weight) {
    errors.min_weight = "Min weight is required";
  } else if (input.min_weight <= 0) {
    errors.min_weight = "Min weight should be greater than zero";
  } else if (!input.max_weight) {
    errors.max_weight = "Max weight is required";
  } else if (input.max_weight <= 0) {
    errors.max_weight = "Max weight should be greater than zero";
  } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {
    errors.max_weight = "Max weight must be greater than Min weight";
  } else if (!input.life_span) {
    errors.life_span = "Life span is required";
  } else if (input.life_span <= 0) {
    errors.life_span = "Life span should be grater than zero";
  } else if (input.life_span > 20) {
    errors.life_span = "Life span should be smaller than 20";
  } else if (!input.image) {
    errors.image = "Please insert an image URL";
  } else if (
    !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
  ) {
    errors.image = "Please insert a valid image URL";
  }
  return errors;
}

export default function CreateDog() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const [temps, setTemps] = useState([]);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    if (!temps.includes(e.target.value)) {
      if (temps.length > 0) {
        setTemps([...temps, e.target.value]);
      } else {
        setTemps([e.target.value]);
      }
    }
    console.log(e.target.value);
  }
  function handleDelete(e) {
    e.preventDefault();
    setTemps(temps.filter((temp) => temp !== e.target.value));
    console.log(temps);
    console.log(e.target.value);
  }

  function handleSubmit(e) {
    if (
      errors.name !== undefined ||
      errors.min_height !== undefined ||
      errors.max_height !== undefined ||
      errors.min_weight !== undefined ||
      errors.max_weight !== undefined ||
      errors.life_span !== undefined
    ) {
      document.getElementById("DoNotSubmit");
      return alert("Please complete the fields with valid data");
    }
    const addDog = {
      name: input.name,
      height: input.min_height + " - " + input.max_height,
      weight: input.min_weight + " - " + input.max_weight,
      life_span: input.life_span,
      image: input.image,
      temperament: temps,
    };
    e.preventDefault();
    dispatch(postDog(addDog));
    alert("Your dog was successfully created!");
    setInput({
      name: "",
      min_height: "",
      max_height: "",
      min_weight: "",
      max_weight: "",
      life_span: "",
      image: "",
      temperament: [],
    });
    setTemps([]);
    history.push("/home");
  }

  return (
    <div className={stl.bkg}>
      <div className={stl.container}>
        <h1 className={stl.title}>Create Dog</h1>
        <form
          className={stl.form}
          id="DoNotSubmit"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label>Name: </label>
            <input
              id="name1"
              key="name"
              className={stl.input}
              placeholder="Enter a Name"
              type="text"
              name="name"
              autoComplete="off"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className={stl.error}>{errors.name}</p>}
          </div>
          <div>
            <label>Height: </label>
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="min_height"
              type="number"
              value={input.min_height}
              placeholder="Min height"
              autoComplete="off"
            />
            {errors.min_height && (
              <p className={stl.error}>{errors.min_height}</p>
            )}
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="max_height"
              type="number"
              value={input.max_height}
              placeholder="Max height"
              autoComplete="off"
            />
            {errors.max_height && (
              <p className={stl.error}>{errors.max_height}</p>
            )}
          </div>
          <div>
            <label>Weight: </label>
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="min_weight"
              type="number"
              value={input.min_weight}
              placeholder="Min weight"
              autoComplete="off"
            />
            {errors.min_weight && (
              <p className={stl.error}>{errors.min_weight}</p>
            )}
            <input
              className={stl.input}
              onChange={(e) => handleChange(e)}
              name="max_weight"
              type="number"
              value={input.max_weight}
              placeholder="Max weight"
              autoComplete="off"
            />
            {errors.max_weight && (
              <p className={stl.error}>{errors.max_weight}</p>
            )}
          </div>
          <div>
            {" "}
            <label>Life Span: </label>
            <input
              className={stl.input}
              id="life_span1"
              placeholder="Life Span"
              type="number"
              name="life_span"
              value={input.life_span}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            {errors.life_span && (
              <p className={stl.error}>{errors.life_span}</p>
            )}
          </div>
          <div>
            <label>Image: </label>
            <input
              className={stl.input}
              key="image"
              placeholder="Insert URL image"
              type="text"
              name="image"
              value={input.image}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
            />
            {errors.image && <p className={stl.error}>{errors.image}</p>}
          </div>
          <div>
            {" "}
            <label>Choose Temperaments: </label>
            <select
              className={stl.templist}
              id="select"
              name="temperament"
              onChange={(e) => handleSelect(e)}
              type="text"
            >
              <option value={null}></option>
              {temperaments.map((temp, id) => {
                return (
                  <option key={id} value={temp.name}>
                    {temp.name}
                  </option>
                );
              })}
            </select>
            {temps.map((temp, id) => {
              return (
                <React.Fragment key={id}>
                  <div className={stl.tempSelect}>
                    ◼ {temp}
                    <button
                      className={stl.btnTemp}
                      value={temp}
                      onClick={(e) => handleDelete(e)}
                    >
                      x
                    </button>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className={stl.formFooter}>
            <button
              className={stl.submitbutton}
              id="btn"
              type="submit"
              name="submit"
            >
              Create Dog
            </button>
            <Link to="/home">
              <button className={stl.backbutton}>Back </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
