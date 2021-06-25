import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import axios from "axios";
import { postEmpresa } from "../../redux/actions/empresaActions";
import { motion } from "framer-motion";
import Header from "../Header/Header";
import { useHistory } from "react-router";
import swal from "sweetalert";

function NewEmpresa() {
  const currentUserId = useSelector(
    (state) => state.userReducer.userInfo.user.id
  );

  const [input, setInput] = useState({
    name: "",
    hectareas: "",
    ubicacion: "",
    imagen: "",
    userId: currentUserId,
  });
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
    console.log("---handleFileInputChange----", event.target.files[0]);
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedFile === null)
      return swal({
        title: "Image Field Cannot Be Empty",
        icon: "warning",
        button: true,
        dangerMode: true,
      });
    const fd = new FormData();
    const extension = selectedFile.name.split(".");
    fd.append(
      "imagen",
      selectedFile,
      input.name + "." + extension[extension.length - 1]
    );
    fd.append("name", input.name);
    fd.append("hectareas", input.hectareas);
    fd.append("ubicacion", input.ubicacion);    
    const payload = {id:input.userId, data:fd}
    dispatch(postEmpresa(payload));
    setInput(input);
    swal({
      title: "Su empresa fue creada!",
      icon: "success",
      button: true,
    }).then(() => {
      history.push("/home");
      //window.location.reload();
    });
    // console.log("eessss",input)
    // e.preventDefault();
    // if(!input.name) {
    //     alert('Debe ingresar un nombre!')
    //     return
    // }
    // if(!input.ubicacion) {
    //     alert('Debe ingresar una ubicación!')
    //     return
    // }
    // console.log("el input", input.userId)
    // dispatch(postEmpresa(input));
    // //e.target.reset();
    // alert('Su empresa fue creada!')
    // history.push('/home')
  }
  const dispatch = useDispatch();
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
        <div className={styles.caja}>
          <h2 className={styles.alineado}>Nueva Empresa</h2>
          <form className={styles.estilosForm} onSubmit={handleSubmit}>
            <div>
              <label>Nombre: </label>
              <input
                type="text"
                onChange={(e) => handleInputChange(e)}
                value={input["name"]}
                placeholder="Estancia YoAgronomo"
                name="name"
              />
            </div>
            <div>
              <label>Hectáreas totales: </label>
              <input
                type="text"
                onChange={handleInputChange}
                value={input["hectareas"]}
                placeholder="600"
                name="hectareas"
              />
            </div>
            <div>
              <label>Ubicación: </label>
              <input
                type="text"
                onChange={handleInputChange}
                value={input["ubicacion"]}
                placeholder="Santa Fe"
                name="ubicacion"
              />
            </div>

            <div>
              <label>Imagen: </label>
              <input
                type="file"
                onChange={handleFileInputChange}
              />
            </div>
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
    </motion.div>
  );
}

export default NewEmpresa;
