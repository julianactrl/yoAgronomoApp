import fhi from '../../components/AgroConsultas/fhi.json'

import { GET_FHI} from "./../constants";
  
  const initialState = {
    fhiData: [],
    
  };

  const agroConsultasReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_FHI: {
        return {
          ...state,
          fhiData: fhi.results,
        }
      }
      
    default:
        return state;
    }
  };
  
  export default agroConsultasReducer;