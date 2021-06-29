import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {getImages,getSoilData,setPoly} from '../../redux/actions/agroApiActions';
import '../AgroApi/AgroApi.css'

const AgroApi = ()=> {
    
    const polyId = useSelector(state => state.agroApiReducer.polyId.id)
    const soilData = useSelector(state => state.agroApiReducer.agroSoil)
    const images = useSelector(state => state.agroApiReducer.agroImages)
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPoly(polyId))
        dispatch(getImages(polyId))
        dispatch(getSoilData(polyId))
    })
    return(
        <div>

        </div>
    )
}

export default AgroApi;
