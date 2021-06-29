import axios from 'axios';
import {
   GET_IMAGES,GET_SOIL_DATA,POST_POLYID
} from '../constants';

const { REACT_APP_AGRO_API_KEY } = process.env



export function postPolyId (data){
    return async function (dispatch) {
        console.log(data)
        return await axios.post(`http://api.agromonitoring.com/agro/1.0/polygons?appid=0a1f8edec9b19466a0369055e53e1a95`, data)
        .then(res => {
            dispatch({
                type: POST_POLYID,
                payload: res.data,
            })
            console.log(res.data)
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
    return function(dispatch) {
        axios
            .get(`http://api.agromonitoring.com/agro/1.0/image/search?start=1622943075&end=1624843875&polyid=${polygonId}&appid=0a1f8edec9b19466a0369055e53e1a95`)
            .then((r) => r.data)
            .then((data)=> {
                dispatch({
                    type: GET_IMAGES,
                    payload: data
                });
            });
    }
}

export const getSoilData = (polygonId) => {
    return function(dispatch) {
        axios
            .get(`http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygonId}&appid=0a1f8edec9b19466a0369055e53e1a95`)
            .then((r) => r.data)
            .then((data)=> {
                dispatch({
                    type: GET_SOIL_DATA,
                    payload: data
                });
            });
    }
}