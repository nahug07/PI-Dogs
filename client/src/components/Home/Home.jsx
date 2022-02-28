import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";

export default function Home() {
    
    const dispatch = useDispatch()
    const allDogs = useSelector((state)=>state.dogs)

    useEffect(()=> {
        dispatch(getDogs());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
    }


    return (
        <div>
            <h1>Dogs App</h1>
            <Link to='/dog'>Crear Raza</Link>
            <button onClick={e=> {handleClick(e)}}>
                Volver a cargar todos las Razas
            </button>
            <div>
                <select>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
                <select>
                    <option value="PesoAsc">Ascendente</option>
                    <option value="PesoDesc">Descendente</option>
                </select>
                <select>
                    <option value="all">Todas las razas</option>
                    <option value="created">Razas Creadas</option>
                    <option value="api">Razas Existentes</option>
                </select>
                {
                    allDogs?.map((c)=> {
                        return (
                            <div key={c.id}>
                                <Link to={"/home/" + c.id}>  
                                    <Card name={c.name} image={c.image} weight={c.weight} temperament={c.temperament} />
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}