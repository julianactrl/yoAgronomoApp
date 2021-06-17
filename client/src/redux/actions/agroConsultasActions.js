import {GET_FHI} from '../constants'

export function getFhi() {
    return (dispatch) => {
        dispatch({
          type: GET_FHI,
        });
      };
    };


           