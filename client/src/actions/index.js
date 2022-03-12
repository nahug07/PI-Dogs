import axios from "axios";

export function getDogs() {
  // conexión de back&front
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperament", {});
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    var doggy = await axios.post("http://localhost:3001/dog", payload);
    return doggy
}}


export function filterDogTemp(payload) {
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
      type: "ORDER_BY_NAME",
      payload,
    };
  }

  export function orderbyWeight(payload) {
    return {
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "http://localhost:3001/dogs?name=" + name  
      );
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: json.data, 
      });
    } catch (error) {
      console.log(error);
      alert('Dog not found')
    }
  };
}

export default function getDetail(id) {
  return async function(dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id)
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data
      })
    }
    catch(error){
      console.log(error)
      alert('Dog not found')
    }
  }
} 



