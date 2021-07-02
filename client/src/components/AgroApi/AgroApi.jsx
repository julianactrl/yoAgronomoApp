import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {getImages,getSoilData,setPoly} from '../../redux/actions/agroApiActions';
import '../AgroApi/AgroApi.css'
import Header from '../Header/Header'
import { Link } from 'react-router-dom';

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
    let dia = date.getDate()
    let mes = date.getMonth()+1;
    let año = date.getFullYear()
    let horas = date.getHours();
    let minutos = "0" + date.getMinutes();
    let segundos = "0" + date.getSeconds();
    let fechaAmostrar = dia +"/"+mes+"/"+año+" "+"a las: "+ horas + ':' + minutos.substr(-2) + ':' + segundos.substr(-2);
   
    let temp10 = soilData.t10-273.15;
    let temp0 = soilData.t0-273.15;
    return(
        <div>
            <Header/>
            <br></br>    
    <br></br>    
    <br></br>    
    <br></br>  
    <br></br>    
    <br></br>  
    <br></br>    
    <br></br> 
        <div className='containerAgro'>
        
           <Link to= '/map'>
           <button className='goBack'>Volver al mapa</button>
           </Link>
            <div className='allInfo'>
            { loading ? <h1>Loading...</h1> : 
                <div className="container-agroImages">
                    {
                        images && images.map(i => (
                            <div className="agro-images">
                                <div className="indices-images">
                                   
                                <h5 className='unoDos'><img className='cuadradito' src={i.image.truecolor}  alt="" />Indice TrueColor</h5>
                                <h5 className='unoDos'>  <img className='cuadradito' src={i.image.falsecolor} alt="" />Indice FalseColor</h5>
                                <h5 className='unoDos'>    <img className='cuadradito' src={i.image.ndvi} alt="" />Indice de verdor</h5>
                                <h5 className='unoDos'>   <img className='cuadradito' src={i.image.evi} alt="" />Indice veg. mejorado</h5>
                                <h5 className='unoDos'>  <img className='cuadradito' src={i.image.evi2} alt="" />Indice veg. mejorado 2</h5>
                                <h5 className='unoDos'>  <img className='cuadradito' src={i.image.nri} alt="" />Indice nac. precipitación</h5>
                                <h5 className='unoDos'>   <img className='cuadradito'  src={i.image.dswi} alt="" />Indice dif. agua</h5>
                                <h5 className='unoDos'>   <img className='cuadradito' src={i.image.ndwi} alt="" />Indice agua normalizado</h5>
                                </div>
                                <div className="datos-solares">
                                    <p>Elevacion solar: {i.sun.elevation.toFixed(2)}°</p>
                                    <p>Angulo de orientación Solar: {i.sun.azimuth.toFixed(2)}°</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <div className="container-soilData">
                <h3>Detalles del Suelo</h3>
                <ul className='ulSelesi'>
                <li className='simpleP' ><i class="fa fa-check" aria-hidden="true"></i>Datos capturados el&nbsp;<b>{fechaAmostrar}</b></li>
                <li> <i class="fa fa-check" aria-hidden="true"></i><strong>Temperatura a 10cm de profundidad:&nbsp;</strong>{temp10.toFixed(2)}°C</li>
                <li><i class="fa fa-check" aria-hidden="true"></i><strong>Temperatura de la superficie:&nbsp;</strong> {temp0.toFixed(2)}°C</li>
                <li><i class="fa fa-check" aria-hidden="true"></i><b>Humedad por metro cuadrado:&nbsp;</b> {soilData.moisture}%</li>
                </ul>
               
            </div>
            </div>
        </div>
        </div>
    )
}

export default AgroApi;
