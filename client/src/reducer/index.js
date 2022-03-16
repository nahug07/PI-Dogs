const initialState = {
  dogs : [],
  allDogs : [],     //declaro un estado inicial, defino los valores que voy a querer
  sortedArr : [],        
  weightDogs : [], 
  temperaments : [],    
  detail : [],         
};                           //recibe parametro state, copia de mi estado inicial
                            //                //esta va a ser la accion que se despache
function rootReducer(state = initialState, action) {
  switch (action.type) {     //segun el type de la accion es lo que va a ir haciendo
    case "GET_DOGS":        //cada accion que se dispare va a modificar al estado de diferente forma
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "FILTER_BY_TEMP":
      const allDogss = state.allDogs
      const tempDogs = allDogss && allDogss.filter(dog => {
          if(dog.temperaments){
              const temperament = dog.temperaments.map( dog => dog.name)
              return temperament.includes(action.payload)}
          if (dog.temperament) { 
              return dog.temperament.includes(action.payload)
          }
          return null
      })

      return {
          ...state,
          dogs: action.payload === 'Temps' ? allDogss : tempDogs,

      }

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allDogs.filter((e) => e.createdInDb)
          : state.allDogs.filter((e) => !e.createdInDb);
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs : createdFilter,
      };

    case "ORDER_BY_NAME":
      const sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "ORDER_BY_WEIGHT":
      const weightDogs = state.dogs
      if(action.payload === "PesoAsc") {
        weightDogs.sort((a, b) => {                        
              return parseInt(a.weight) - parseInt(b.weight);
          });
      } 
      if(action.payload === "PesoDesc") {
        weightDogs.sort((a, b) => {                        
              return parseInt(b.weight) - parseInt(a.weight);
          });
    }
    return {
      ...state,
      dogs: weightDogs,
    };

    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "POST_DOG":
      return {
        ...state,
      };

      case "GET_DELETE_DETAIL":
        return{
          ...state,
          detail: []
        };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload
      }  

    default:
      return state;
  }
}

export default rootReducer;
