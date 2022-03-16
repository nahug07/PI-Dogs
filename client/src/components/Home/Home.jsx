import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  filterDogTemp,
  getTemperaments,
  filterCreated,
  orderByName,
  orderbyWeight,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from "../Paging/Paging";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import stl from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs); //me trae del reducer el estado dogs
  const [loading, setLoading] = useState(true)

  //--> Paginado <--//
  const [currentPage, setCurrentpage] = useState(1); //le paso el estado local con la primer página que se renderiza
  const [dogsPage, setDogsPage] = useState(8); //cuántos dogs quiero por página
  const indexLastDog = currentPage * dogsPage; //1 * 8 = 8
  const indexFirstDog = indexLastDog - dogsPage; // 8 - 8 = 0
  const currentDogs = allDogs?.slice(indexFirstDog, indexLastDog);  //slice toma una porción del arreglo dependiendo lo que le estoy pasando por parámetr

  const paging = (pageNumber) => { //acá el paginado va a setear la pagina en el numero de pagina que se vaya clickeando
    setCurrentpage(pageNumber);  //cuando setea la página los índices cambian y el slide se va modificando
  };

  //--> FilterTemperament <--//
  const allTemperament = useSelector((state) => state.temperaments);

  //cuando el componente se monte me traigo los dogs y temps
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  // --> Handles <-- //
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemperament(e) {
    e.preventDefault();
    dispatch(filterDogTemp(e.target.value));
    setCurrentpage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentpage(1);
  }

  // --> Ordenamiento <-- //
  const [order, setOrder] = useState(""); // esto es solo un estado local vacío para que me renderize el ordenamiento A-Z
  const [orderr, setOrderr] = useState(""); // esto es solo un estado local para que me renderize el ordenamiento por peso
  
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentpage(1);
    setOrder(`Ordenado ${e.target.value}`);  //ese estado local empieza vacío y lo seteo para que me haga el renderizado
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderbyWeight(e.target.value));
    setCurrentpage(1);
    setOrderr(`Ordenado ${e.target.value}`);
  }


  return (
    <div>
      { loading === true ? (
        <Loading setLoading={setLoading} />
      ) : (
        <div className={stl.ppal}>
          <div className={stl.conteinerMain1}>
            <h1>DOG APP</h1>
          </div>

          <div className={stl.conteinerMain}>
            <div className={stl.c4}>
              <div className={stl.c2}>            {/* <----------------- Buttons ------ */}
                <button className={stl.hpbot1}>
                  <Link to="/dog">Create Dog</Link>
                </button>

                <button
                  className={stl.hpbot2}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className={stl.cSearch}>     {/* <----------------- SearchBar ------ */}
                <SearchBar />
              </div>
              <div className={stl.c3}>
                <div className={stl.filtros1}>   {/* <----------------- Filtros ------ */}
                  <h2>Filters</h2>         
                  <div className={stl.filtros}>
                    <select
                      className={stl.hpfilter1}
                      onChange={(e) => handleFilterTemperament(e)}
                    >
                      <option value="Temps">Temperaments</option>
                      {allTemperament.map((p) => {
                        return (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        );
                      })}
                    </select>
                    <select
                      className={stl.hpfilter2}
                      onChange={(e) => handleFilterCreated(e)}
                    >
                      <option value="All">All Dogs</option>
                      <option value="created">Dogs Created</option>
                      <option value="api">Api Dogs</option>
                    </select>
                  </div>
                </div>
                <div className={stl.ordenamiento1}> {/* <----------------- Sort --------*/}
                  <h2>Sort</h2>                  
                  <div className={stl.ordenamiento}>
                    <select
                      className={stl.hpfilter1}
                      onChange={(e) => handleSort(e)}
                    >
                      <option value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </select>

                    <select
                      className={stl.hpfilter2}
                      onChange={(e) => handleOrderByWeight(e)}
                    >
                      <option value="all">Weight</option>
                      <option value="PesoAsc">Light</option>
                      <option value="PesoDesc">Heavy</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className={stl.c5}>   {/* <----------------- Cards --------*/}
              {currentDogs?.map((el) => {         
                return (
                  <div key={el.name}>
                    <Link to={"/dogs/" + el.id}>
                      <Card
                        name={el.name}
                        image={el.image}
                        temperament={
                          el.temperament
                            ? el.temperament
                            : el.temperaments &&
                              el.temperaments.map((temp) =>
                                temp.name.concat(" ")
                              )
                        }
                        key={el.id}
                        weight={el.weight}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>         {/* <----------------- Paging --------*/}
            <Paging                
              dogsPage={dogsPage}
              allDogs={allDogs?.length}
              paging={paging}
              currentPage={currentPage}
            />
          </div>
          <footer>
            <span>
              Made with ❤ by{" "}
              <a href="https://www.linkedin.com/in/nahuel-grijalba/">
                Nahuel Grijalba
              </a>{" "}
              | 2022
            </span>
          </footer>
        </div>
      )}
    </div>
  );
}
