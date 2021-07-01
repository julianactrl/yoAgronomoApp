import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom'
import {getEmpresa, updateEmpresa} from '../../redux/actions/empresaActions';
import styles from './styles.module.css';
import axios from 'axios';
import Weather from '../Weather/Weather'
import Header from '../Header/Header';
import { useHistory } from 'react-router';
import upload from '../../assets/upload.jpg'

import swal from "sweetalert";
const { REACT_APP_API } = process.env;


function UpdateEmpresa ({id}) {
    const empresa = useSelector(state=>state.empresaReducer.empresaForId);
    const dispatch = useDispatch();
    const history = useHistory()

    const [input, setInput] = useState({
        id: id,
        name: empresa.name,
        hectareas: empresa.hectareas,
        ubicacion: empresa.ubicacion,
        imagen: ''
})

const [selectedFile, setSelectedFile] = useState(null);
const [imgUrl, setImgUrl] = useState(upload);

const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };


async function handleInputChange(e) {
    e.persist();
    await setInput({
        ...input,                        
         [e.target.name]: e.target.value  
        });
        // console.log('-------', input)
    }


useEffect(()=> {
    dispatch(getEmpresa(id));
    
}, []);



function handleSubmit(e) {
    if (selectedFile === null)
    return swal({
      title: "Image Field Cannot Be Empty",
      icon: "warning",
      button: true,
      dangerMode: true,
    });
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const fd = new FormData();
  
  const extension = selectedFile.name.split(".");

  fd.append("name", input.name);
  fd.append("hectareas", input.hectareas);
  fd.append("ubicacion", input.ubicacion);
  fd.append(
    "imagen",
    selectedFile,
    input.fullName + "." + extension[extension.length - 1]
  );
  const infoSendDb = {
    id: id,
    fd,
  };
  dispatch(updateEmpresa(infoSendDb, config));
  setInput(input);
  swal({
    title: "Info Edited",
    icon: "success",
    button: true,
  })
      history.push("/home");
        
}


    return (
        <div className={styles.div}>
            <Header />
         <h2 className={styles.alineado} >Actualizar Empresa</h2>
        <div className={styles.caja}>
        <form className={styles.estilosForm} 
        onSubmit={handleSubmit} 
        > 
        <div>
            <label className={styles.labelCrear} htmlFor="">Id: </label>
            <input className={styles.inputCrear}
            type="text" readOnly onChange={(e)=>handleInputChange(e)} value={empresa.id} name="id"/>
        </div>
            
        
            <div>
                <label className={styles.labelCrear}>Nombre: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['name']}
                placeholder={empresa.name}
                name='name' 
                />
            </div>
            <div>
                <label className={styles.labelCrear}>Hectáreas totales: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['hectareas']}
                placeholder={empresa.hectareas}
                name='hectareas'/>
            </div>
            <div>
                <label className={styles.labelCrear}>Ubicación: </label>
                <input className={styles.inputCrear}
                type='text'
                onChange={(e)=>handleInputChange(e)} 
                value={input['ubicacion']}
                placeholder={empresa.ubicacion}
                name='ubicacion'/>
            </div>
           
            <div className={styles.fileImg}>
                <label className={styles.labelCrear}>Imagen: </label>
                <input 
                className={styles.inputCrear}
                type='file'
                name='imagen'
                accept="image/png, image/jpeg"
                onChange={handleFileInputChange} 
                required
                />
            </div>
            <img
            src={imgUrl}
            alt={imgUrl}
            style={ imgUrl===upload ? { height: "220px", width: "240px", padding:"35px"} : { height: "200px", width: "250px", paddingBottom:"3px"}}
          />

                <br></br>
            <button className={styles.buttonCrearEmpresa} type='submit' value='Crear empresa' name="Enviar">Actualizar Empresa</button>
            </form>
            </div>
            
        </div>
    )
}

export default UpdateEmpresa