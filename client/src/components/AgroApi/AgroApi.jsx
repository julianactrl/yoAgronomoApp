import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {getImages,getSoilData,setPoly} from '../../redux/actions/agroApiActions';
import '../AgroApi/AgroApi.css'

const AgroApi = ()=> {

    const[loading, setLoading] = useState(true)
    
    const poliId = useSelector(state => state.agroApiReducer.poliId.id)
    const loteId= useSelector(state => state.loteReducer.detailLote.id)
    const soilData = useSelector(state => state.agroApiReducer.agroSoil)
    const images = useSelector(state => state.agroApiReducer.agroImages)
    
    const dispatch = useDispatch()
    useEffect(() => {
        if(poliId){
            dispatch(setPoly(poliId,1))
            dispatch(getImages(poliId))
            dispatch(getSoilData(poliId))
            setLoading(false)
        }
    },[])
    let unix_timestamp = soilData.dt

    let date = new Date(unix_timestamp * 1000);
    let dia = date.getDay()
    let mes = date.getMonth()
    let año = date.getFullYear()
    let horas = date.getHours();
    let minutos = "0" + date.getMinutes();
    let segundos = "0" + date.getSeconds();
    let fechaAmostrar = dia +"/"+mes+"/"+año+" "+"a las: "+ horas + ':' + minutos.substr(-2) + ':' + segundos.substr(-2);
   
    let temp10 = soilData.t10-273.15;
    let temp0 = soilData.t0-273.15;
    return(
        <div>
            { loading ? <h1>Loading...</h1> : 
                <div className="conatiner-agroImages">
                    {
                        images && images.map(i => (
                            <div className="agro-images">
                                <div className="indices-images">
                                    <img src={i.image.truecolor} alt="" />
                                    <img src={i.image.falsecolor} alt="" />
                                    <img src={i.image.ndvi} alt="" />
                                    <img src={i.image.evi} alt="" />
                                    <img src={i.image.evi2} alt="" />
                                    <img src={i.image.nri} alt="" />
                                    <img src={i.image.dswi} alt="" />
                                    <img src={i.image.ndwi} alt="" />
                                </div>
                                <div className="datos-solares">
                                    <p>Elevacion solar: {i.sun.elevation.toFixed(2)}°</p>
                                    <p>Azimuth: {i.sun.azimuth.toFixed(2)}°</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <div className="container-soilData">
                <h3>Detalles del Suelo</h3>
                <p>Datos capturados el: {fechaAmostrar}</p>
                <p>Temperatura a 10cm de profundidad: {temp10.toFixed(2)}°C</p>
                <p>Temperatura de la superficie: {temp0.toFixed(2)}°C</p>
                <p>Humedad por metro cuadrado: {soilData.moisture}%</p>
            </div>
        </div>
    )
}

export default AgroApi;
