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

export function postEmpresa(empresa) {
    return function(dispatch) {
        return axios.post(`http://localhost:3001/createEmpresa`, {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(empresa)
        })
        .then((response)=> {         
            
                dispatch({          
                type: POST_EMPRESA,
                payload: response.data,
            })
            
        })
    }
}