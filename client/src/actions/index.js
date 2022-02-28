import axios from 'axios';

export function getDogs() { // conexión de back&front
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/dogs',{});
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}