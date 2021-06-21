import axios from 'axios';
import {
    GET_DOLAR
} from '../constants';


export const getDolar = () => {
    return function(dispatch) {
        axios
            .get(`https://www.dolarsi.com/api/api.php?type=valoresprincipales`)
            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_DOLAR,
                    payload: data
                });
            });
    }
}