import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {getImages,getSoilData,setPoly} from '../../redux/actions/agroApiActions';
import '../AgroApi/AgroApi.css'

const AgroApi = ()=> {
    
    const poliId = useSelector(state => state.agroApiReducer.poliId.id)
    const loteId= useSelector(state => state.loteReducer.detailLote.id)
    const soilData = useSelector(state => state.agroApiReducer.agroSoil)
    const images = useSelector(state => state.agroApiReducer.agroImages)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPoly(poliId,1))
        dispatch(getImages(poliId))
        dispatch(getSoilData(poliId))
    },[])
    return(
        <div>

        </div>
    )
}

export default AgroApi;
