import {GET_ALL_LOTES} from '../constants/index'

export function getAllLotes (empresaId) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/lote/empresa/${empresaId}`)
            .then(data => data.json())
            .then(data => {
                console.log('estoy en la actionnnnnnnnnnnnnnnn',data);
                dispatch({
                    type: GET_ALL_LOTES,
                    payload: data
                })
            })
    }
}