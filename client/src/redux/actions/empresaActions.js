import {GET_EMPRESA_ID, POST_EMPRESA} from '../constants';
import axios from 'axios';

export function getEmpresa(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/empresa/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_EMPRESA_ID,
                payload: json
            })
        })
    }
}


export const postEmpresa = ({ name, hectareas,ubicacion,image }) => {

    return (dispatch) => {
        dispatch({ type: POST_EMPRESA });
        axios({
            method: 'post',
            url: `http://localhost:3001/empresa/create`,
            data: {
                name,
                hectareas,
                ubicacion,
                image
            },
        }).catch(e => dispatch(e))
    }
}

export const updateEmpresa = ({id, body}) => {
    return (dispatch) => {
        dispatch({type: UPDATE_EMPRESA, id, body});
        axios({
            method: 'put',
            url: `http://localhost:3001/empresa/${id}`,
            data: body,
        }).catch(e => dispatch(e))
    }
}