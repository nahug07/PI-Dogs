import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getDetail from "../../actions";
import { useEffect } from "react";
import stl from "./Detail.module.css";
import {getDeleteDetail} from "../../actions";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {                                   /* const { id } = useParams(); Podria usar el hook también*/ 
    dispatch(getDetail(props.match.params.id)); 
        return function (){
          dispatch(getDeleteDetail())
        }                                           //accedo al id pasandole props a mi componente Detail
  }, [dispatch, props.match.params.id]);

  const myDog = useSelector((state) => state.detail);   // me traigo el estado detail desde el reducer con useSelector

  return (
    <div className={stl.conteinerDetail}>
      <div className={stl.containerDetail2}>
        {myDog.length > 0 ? (
          <div className={stl.cardDetail}>
            <img
              className={stl.imgDetail}
              src={myDog[0].image}
              alt="Img not found"
            />
            <div className={stl.contentDetail}>
              <div className={stl.contentBxDetail}>
                <h1>{myDog[0].name} </h1>
                <p>
                  TEMPERAMENTS 〰〰〰{" "}
                  {!myDog[0].createdInDb
                    ? myDog[0].temperament + " "
                    : myDog[0].temperaments.map((el) => el.name + ", ")}
                </p>
                <p> HEIGHT 〰〰〰 {myDog[0].height} Cm</p>
                <p> WEIGHT 〰〰〰 {myDog[0].weight} Kg </p>
                <p>
                  LIFE SPAN 〰〰〰{" "}
                  {myDog[0].createdInDb
                    ? myDog[0].life_span + " years"
                    : myDog[0].life_span}{" "}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* <h1>Loading..</h1> */
          <div className={stl.woorupape2}>
            <div className={stl.fouGif2}>
              <div className={stl.spinnerr}></div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Link to="/home">
          <button className={stl.btnVolver}>Back</button>
        </Link>
      </div>
    </div>
  );
}
