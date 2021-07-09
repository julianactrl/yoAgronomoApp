import React, { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import Header from '../Header/Header'
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";
import { postPolyId } from "../../redux/actions/agroApiActions";
import {useHistory,Link} from 'react-router-dom'
import {motion} from 'framer-motion'

import './Map.css';

const Map = () => {
    // Store Polygon path in state
    const [path, setPath] = useState([
      {lat: -31.328535, lng: -61.530424},
      {lat: -31.329063, lng: -61.527094},
      {lat: -31.3337, lng: -61.528055},
      {lat: -31.333113, lng: -61.531626}
    ]);
    const [middle, setMiddle] = useState([])
    const [coordenadas,setCoordenadas] = useState({
      coord1: null,
      coord2:null,
      coord3:null,
      coord4:null,
      coord5:null
    })


    
    

    const dispatch = useDispatch()
    const history = useHistory()

    const aux = {
      name:"gaby",
      geo_json:{
        type:"Feature",
        properties:{
          
        },
         geometry:{
           type:"Polygon",
            coordinates:[
              [
                [path[0].lng,path[0].lat],
                [path[1].lng,path[1].lat],
                [path[2].lng,path[2].lat],
                [path[3].lng,path[3].lat],
                [path[0].lng,path[0].lat]
                ]
              ]
         }
        }
   }
   
 
   function handleSubmit(e){
    e.preventDefault();
    dispatch(postPolyId(aux))
    // history.push('/agroapi')
  }
  
    // Define refs for Polygon instance and listeners
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
  
    // Call setPath with new edited path
    const onEdit = useCallback(() => {
      if (polygonRef.current) {
        const nextPath = polygonRef.current
          .getPath()
          .getArray()
          .map(latLng => {
            return { lng: parseFloat(latLng.lng().toString().slice(0,11)) , lat: parseFloat(latLng.lat().toString().slice(0,11))  };
          });
        setPath(nextPath);
      }
    }, [setPath]);
  
    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
      polygon => {
        polygonRef.current = polygon;
        const path = polygon.getPath();
        listenersRef.current.push(
          path.addListener("set_at", onEdit),
          path.addListener("insert_at", onEdit),
          path.addListener("remove_at", onEdit)
        );
      },
      [onEdit]
    );
  
    // Clean up refs
    const onUnmount = useCallback(() => {
      listenersRef.current.forEach(lis => lis.remove());
      polygonRef.current = null;
    }, []);
 
    const apiKey= process.env.REACT_APP_GOOGLE_API_KEY

  return (
    <motion.div
    initial='hidden'
    animate='visible'
    variants={{
    hidden: {
        scale: .8,
        opacity: -1
    },
    visible: {
        scale: 1,
        opacity: 1,
        transition:{
            delay: .002
        }
    }
    }}
    >
    <div>
    <Header/>
    <div className="googleMapsCont">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="googleMaps"
          center= {path[0]}
          zoom={15}
          version="weekly"
          mapTypeId="satellite"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
        </GoogleMap>
      </LoadScript>
      <div className='contenedorInfoMap'>
        <ul  className='ulSele'>
          <h4>Instrucciones:</h4>
          <li><i class="fa fa-check" aria-hidden="true"></i>
            Seleccione la porción de terreno sobre la cual desea obtener información.</li>
          <li><i class="fa fa-check" aria-hidden="true"></i>
            Presione el botón Agregar coordenadas.</li>
          <li><i class="fa fa-check" aria-hidden="true"></i>
            Si obtiene buenos resultados, ya puede ver el detalle de su lote en 'Ver detalle'. De lo contrario, vuelva a marcar el terreno con mayor precisión.</li>
        </ul>
        <div className='dosBotones'>
          <button className='button' onClick={handleSubmit}>Agregar coordenadas</button>
          <Link to = '/agroapi'>
            <button className='button'>Ver detalle</button>
          </Link>
        </div>
      </div>
    </div>
    </div> 
    </motion.div>
  );
}

export default Map;