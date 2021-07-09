import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import { useHistory } from "react-router";
import { postEmpresa } from "../../redux/actions/empresaActions";
import swal from "sweetalert";
import {Link} from 'react-router-dom'

import dataCiudades from '../../ciudades.json'
import upload from '../../assets/upload.jpg'


function NewEmpresa() {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUserId = useSelector(
    (state) => state.userReducer.userInfo.user.id
  );
  const numEmpresa = useSelector((state) => state.empresaReducer.allEmpresas);
  const userInfo = useSelector(
    (state) => state.userReducer.userInfo.user.isPremium
  );

  if (numEmpresa.length >= 2 && userInfo === false) {
    swal({
      title: "para seguir creando mas empresas pasarse a Premium",
      icon: "error",
      button: true,
    });
  }

  const [input, setInput] = useState({
    userId: currentUserId,
    name: "",
    hectareas: "",
    ubicacion: "",
    imagen: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(upload);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  function handleInputChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      
    });
    console.log(input);
  }

  function handleSubmit() {
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
    fd.append("userId", input.userId);
    fd.append(
      "imagen",
      selectedFile,
      input.name + "." + extension[extension.length - 1]
    );
    const infoSendDb = {
      userId: currentUserId,
      fd,
    };
    dispatch(postEmpresa(infoSendDb, config));
    setInput(input);
    swal({
      title: "Empresa creada",
      icon: "success",
      button: true,
    })
      .then(() => {
        window.push("/home");
      })
      .catch((e) => console.log(e));
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: -1,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.002,
          },
        },
      }}
    >
      <div className={styles.div}>
        <Header />
        <div className={styles.auxPhone}>

        <div className={styles.caja}>
          <h2 className={styles.alineado}>Nueva Empresa</h2>
          <Link to='/home' className={styles.cross}/>
          <form className={styles.estilosForm} onSubmit={handleSubmit}>
            <div className={styles.inputsNewEmpresa}>
              <div className={styles.inputCont}>
                <h4>Nombre</h4>
                <input
                  type="text"
                  onChange={(e) => handleInputChange(e)}
                  value={input.name}
                  placeholder="Estancia YoAgronomo"
                  name="name"
                  />
              </div>
              <div className={styles.inputCont}>
                <h4>Hectáreas </h4>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={input.hectareas}
                  placeholder="600"
                  name="hectareas"
                  />
              </div>
              <div className={styles.inputCont}>
                <select className={styles.selectUbicacion} 
                  onChange={(e) => handleInputChange(e)}
                  name="ubicacion">
                  <option  disabled selected> Seleccione Ubicación</option>
                  {dataCiudades.localidades.map((ciudad) => (
                    <option value={ciudad.nombre}>{ciudad.nombre}</option>
                    ))}
                </select>
               
              </div>
            </div>
            <div className={styles.fileImg}>
              <h4>Imagen</h4>
              <div className={styles.contPhoneAux}>
                  <input
                    className={styles.inputCrear}
                    type="file"
                    name="imagen"
                    accept="image/png, image/jpeg"
                    onChange={handleFileInputChange}
                    required
                    placeholder="subir img"
                    />
                  <img
                  className={styles.imgPhone}
                  src={imgUrl}
                  alt={imgUrl}
                  />
              </div>
            </div>
            <img
              className={styles.img}
              src={imgUrl}
              alt={imgUrl}
              />
            <br></br>
              <button
                className={styles.buttonCrearEmpresa}
                type="submit"
                value="Crear empresa"
                name="Enviar"
                >
                Crear Empresa
              </button>
          </form>
        </div>
        </div>
      </div>
    </motion.div>
  );
}

export default NewEmpresa;