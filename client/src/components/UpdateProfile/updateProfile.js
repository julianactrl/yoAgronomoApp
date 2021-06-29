import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {
  updateUser,
  logout,
} from "../../redux/actions/userActions";
import styles from "./styles.module.css";
import axios from "axios";
import Header from "../Header/Header";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

const { REACT_APP_API } = process.env;

function UpdateProfile() {
  const usuario = useSelector(state=> state.userReducer.userInfo.user)
  console.log("usuario",usuario)
  const dispatch = useDispatch();
  var history = useHistory();
  const { id } = useParams();

  const [updateinfo, setUpdateInfo] = useState({
    id: id,
    fullName: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImgUrl(URL.createObjectURL(event.target.files[0]));
  };

  function handleInputChange(e) {
    setUpdateInfo({
      ...updateinfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
   // e.preventDefault();
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

    fd.append("fullName", updateinfo.fullName);
    fd.append("email", updateinfo.email);
    fd.append("password",updateinfo.password)
    fd.append(
      "profile_pic",
      selectedFile,
      updateinfo.fullName + "." + extension[extension.length - 1]
    );
    const infoSendDb = {
      id: id,
      fd,
    };
    dispatch(updateUser(infoSendDb, config));
    setUpdateInfo(updateinfo);
    swal({
      title: "Info Edited",
      icon: "success",
      button: true,
    })
        dispatch(logout(id));
        history.push("/home");
  }

  function deleteUsuario(id) {
    axios
      .delete(`${REACT_APP_API}/user/delete/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
      swal("La cuenta del usuario ha sido eliminada", { icon: "success" });
  }

  return (
    <div className={styles.div}>
      <Header />
      <h2 className={styles.alineado}>Actualizar User</h2>
      <div className={styles.caja}>
        <form className={styles.estilosForm} onSubmit={handleSubmit}>
          <div>
            <label className={styles.labelCrear}>Nombre: </label>
            <input
              className={styles.inputCrear}
              type="text"
              onChange={handleInputChange}
              placeholder={usuario.fullName}
              value={updateinfo.fullName}
              name="fullName"
            />
          </div>

          <div>
            <label className={styles.labelCrear}>Email </label>
            <input
              className={styles.inputCrear}
              type="text"
              onChange={handleInputChange}
              value={updateinfo.email}
              placeholder={usuario.email}
              name="email"
            />
          </div>

           <div>
            <label className={styles.labelCrear}>Password </label>
            <input
              className={styles.inputCrear}
              type="password"
              onChange={handleInputChange}
              value={updateinfo.password}
              name="password"
            />
          </div> 

          <div>
            <label className={styles.labelCrear}>Imagen: </label>
            <input
              className={styles.inputCrear}
              type="file"
              name="profile_pic"
              accept="image/png, image/jpeg"
              onChange={handleFileInputChange}
              required
            />
          </div>

          <img
            src={imgUrl}
            alt={imgUrl}
            style={{ height: "200px", width: "250px" }}
          />

          <br></br>
          <button
            className={styles.buttonCrearEmpresa}
            type="submit"
            value="Crear empresa"
            name="Enviar"
          >
            Actualizar Usuario
          </button>
          <Link to={`/`}>
            <h3
              onClick={() => deleteUsuario(id)}
              className={styles.eliminarEmpresa}
            >
              <FontAwesomeIcon icon={faUserTimes} />
            </h3>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
