import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { logout } from "../../redux/actions/userActions";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import imagen from '../../assets/a.png'

const { REACT_APP_API } = process.env;


export default function DashBoardProfile() {
  const userInfo = useSelector((state) => state.userReducer.userInfo.user.isPremium);

  let history = useHistory();
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const token = useSelector((state) => state.userReducer?.userInfo?.token);
  
  const handleLogout = () => {
    dispatch(logout());
    history.push("/index");
  };

  if (token) {
    var decoded = jwt_decode(token);
    var usuario = decoded.user;
  } else {
    handleLogout()
  }


 

  const user = useSelector((state) => state.userReducer.userInfo);

  function renderPerfil() {
    return (
      <div className={styles.perfilDeploy}>
        <button className={styles.perfilbtn}>
        {userInfo===true ? (
          <h3>Premium</h3>
          ) : (
         <h3>cuenta free</h3>
          )}
          {usuario.profile_pic ? (
            <img
            src={
              `${REACT_APP_API}/user/picture/${usuario.profile_pic}`
            }
            alt=""
            height={90}
            className={styles.perfilimg}
            onClick={() => (!active ? setActive(true) : setActive(false))}
            />
            
            ) : (
              <img
              alt="perfil"
              src={
                imagen
              }
              className={styles.perfilimg}
              onClick={() => (!active ? setActive(true) : setActive(false))}
              />
              )}
        </button>
        {usuario ? (
          <>
            <div className={styles.contenido}>
          {userInfo===true ? (
            <h3>Premium</h3>
            ) : (
           <h3>cuenta <strong>free</strong></h3>
           
           )}
           </div>
            <h3 className={styles.title}>{usuario.fullName}</h3>
            <h3 className={styles.email}>{usuario.email}</h3>
            <h3 className={styles.titleLogout} onClick={(e) => handleLogout(e)}>
              CERRAR SESION
            </h3>
            <Link to={`/user/update/${usuario.id}`}>
              <h3 className={styles.settings}>
                <FontAwesomeIcon icon={faUserCog} />
              </h3>
            </Link>{" "}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
       
      </div>
    );
  }

  return (
    <div className={styles.perfilbtncont}>
      {active ? (
        renderPerfil()
      ) : (
        <button className={styles.perfilbtn}>
          <img
            alt="icon"
            src={
              imagen
            }
            className={styles.perfilimg}
            onClick={() => {
              !active ? setActive(true) : setActive(false);
            }}
          />
        </button>
      )}
    </div>
  );
}
