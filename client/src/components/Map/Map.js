import React, { useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { LoadScript, GoogleMap, Polygon } from "@react-google-maps/api";

import './Map.css';

const Map = () => {
    // Store Polygon path in state
    const [path, setPath] = useState([
      {lat: -31.91541, lng: -61.62687},
      {lat: -31.88559, lng: -63.64046},
      {lat: -33.28286, lng: -63.65110},
      {lat: -33.30123, lng: -61.64095}
    ]);
    const [middle, setMiddle] = useState([])
  
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
            return [parseFloat(latLng.lng().toString().slice(0,9)), parseFloat(latLng.lat().toString().slice(0,9))];
          });
        setPath(nextPath);
        //setMiddle({lat: ((path[0].lat + path[1].lat) / 2), lng:((path[0].lng + path[3].lng) / 2)})
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
  
    console.log("The path state is", path);
    console.log('hola')
    console.log('The middle is', middle)

    const apiKey= process.env.REACT_APP_GOOGLE_API_KEY

  return (
    <div className="googleMapsCont">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={apiKey}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerClassName="googleMaps"
          center={path[0]}
          zoom={6}
          version="weekly"
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
    </div>
  );
}

export default Map;