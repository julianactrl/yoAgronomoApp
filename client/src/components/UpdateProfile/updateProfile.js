import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  updateEmpresa,
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
import { userInfo } from "os";

const { REACT_APP_API, REACT_APP_API_HEROKU } = process.env;

function UpdateProfile({ id }) {
  const currentUser = useSelector((state) => state.userReducer.userInfo.user);
  const dispatch = useDispatch();

  var idUser = useParams(id);

  const [updateinfo, setUpdateInfo] = useState({
    id: idUser,
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
    console.log("---esto es update form----", event.target.files[0]);
  };

  const history = useHistory();

  function handleInputChange(e) {
    //e.persist();
    setUpdateInfo({
      ...updateinfo,
      [e.target.name]: e.target.value,
    });
    console.log("---esto es update form----", e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    const extension = selectedFile.name.split(".");
    fd.append(
      "profile_pic",
      selectedFile,
      updateinfo.name + "." + extension[extension.length - 1]
    );
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fd.append("fullName", updateinfo.fullName);
    fd.append("email", updateinfo.email);
    fd.append("password", updateinfo.password);

    dispatch(updateUser(fd, config));
    setUpdateInfo(updateinfo);
    swal({
      title: "Info Edited",
      icon: "success",
      button: true,
    }).then(() => {
      history.push("/home");

      //window.location.reload();
    });

    // alert("¿Seguro desea modificar estos datos?");
    // dispatch(updateUser(input));
    //alert("Datos modificados correctamente, ingrese sesión nuevamente");
    //dispatch(logout());
  }

  function deleteUsuario(id) {
    // dispatch(deleteEmpresa(id));
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
              value={updateinfo["fullName"]}
              placeholder={currentUser.fullName}
              name="fullName"
            />
          </div>

          <div>
            <label className={styles.labelCrear}>Email </label>
            <input
              className={styles.inputCrear}
              type="text"
              onChange={handleInputChange}
              value={updateinfo["email"]}
              placeholder={currentUser.email}
              name="email"
            />
          </div>

          <div>
            <label className={styles.labelCrear}>Password </label>
            <input
              className={styles.inputCrear}
              type="password"
              onChange={handleInputChange}
              value={updateinfo["password"]}
              // placeholder={currentUser.password}
              name="password"
            />
          </div>

          <div>
            <label className={styles.labelCrear}>Imagen: </label>
            <input
              className={styles.inputCrear}
              type="file"
              onChange={handleFileInputChange}
              //value={updateinfo["profile_pic"]}
              required
            />
          </div>
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
