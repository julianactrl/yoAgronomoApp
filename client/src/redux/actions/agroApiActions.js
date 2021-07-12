import axios from 'axios';
import {
    shallowEqual
} from 'react-redux';
import {
    GET_IMAGES,
    GET_SOIL_DATA,
    POST_POLYID,
    PATCH_POLY_ID,
    CLEAR_AGRO
} from '../constants';
import swal from 'sweetalert'

const {
    REACT_APP_AGRO_API_KEY,
    REACT_APP_API
} = process.env



export function postPolyId(data) {
    return async function (dispatch) {
        console.log(data)
        return await axios.post(`https://api.agromonitoring.com/agro/1.0/polygons?appid=b18836b4cf50726ea1bcdc1073c39105`, data)
            .then(res => {
                dispatch({
                    type: POST_POLYID,
                    payload: res.data,
                })
                swal('Coordenadas exitosas', {
                    icon: 'success'
                })
                console.log(res.data)
            })
            .catch(error => {
                swal('Por favor defina de manera mas específica su polígono', {
                    icon: 'warning'
                })
            })
    }
}


// export const postPolyId = ({ name,coord1, coord2, coord3, coord4,coord5}) => {

//     return (dispatch) => {
//         dispatch({ type: POST_POLYID });
//         axios({
//             method: 'post',
//             url: `http://api.agromonitoring.com/agro/1.0/polygons?appid=0a1f8edec9b19466a0369055e53e1a95`,
//             data: {
//                 name,
//                 geo_json:{
//                    type:"Feature",
//                    properties:{

//                    },
//                    geometry:{
//                       type:"Polygon",
//                       coordinates:[
//                          [
//                             [coord1],
//                             [coord2],
//                             [coord3],
//                             [coord4],
//                             [coord5]
//                          ]
//                       ]
//                    }
//                 }
//              },
//         }).catch(e => dispatch(e))
//     }
// };


export const getImages = (polygonId) => {
    return function (dispatch) {
        axios
            .get(`https://api.agromonitoring.com/agro/1.0/image/search?start=1622943075&end=1624843875&polyid=${polygonId}&appid=b18836b4cf50726ea1bcdc1073c39105`)
            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_IMAGES,
                    payload: data
                });
            });
    }
}

export const getSoilData = (polygonId) => {
    return function (dispatch) {
        axios
            .get(`https://api.agromonitoring.com/agro/1.0/soil?polyid=${polygonId}&appid=b18836b4cf50726ea1bcdc1073c39105`)
            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_SOIL_DATA,
                    payload: data
                });
            });
    }
}
// export const setPoly = (id,polygonId) => {
//     console.log(id)
//     return function(dispatch) {
//         axios
//         .put(`${REACT_APP_API}/lote/1`,"hola")
//         .then((r) => r.data)
//         .then((data)=> {
//             dispatch({
//                 type: PATCH_POLY_ID,
//                 payload: data
//             });
//         });
//     }
// }

export function setPoly(polygonId, id) {
    return function (dispatch) {
        return axios.put(`${REACT_APP_API}/lote/${id}`, {
            poliId: polygonId
        })
            .then(response => dispatch({
                type: PATCH_POLY_ID,
                payload: response.data
            }))
            .catch(e => console.log(e))
    }
}

export const clearAgroData = () => {
    return{
        type: CLEAR_AGRO
    }
}