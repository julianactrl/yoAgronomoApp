import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { logout } from "../../redux/actions/userActions";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";

export default function DashBoardProfile() {
  const [active, setActive] = useState(false)
   const token = useSelector(state => state.userReducer.userInfo.token)
   console.log(token)
 
  if(token){
      var decoded = jwt_decode(token)
      var usuario = decoded.user;
  }
  console.log("aaa", usuario)
  console.log('holaa')
  
const dispatch= useDispatch();


  const handleLogout = () =>{
      dispatch(logout)
  }

  function renderPerfil() {
    return (
      <div className={styles.perfilDeploy}>
        <button className={styles.perfilbtn}>
          <img
            alt="perfil"
            src={
              "https://icon-library.com/images/profile-icon-white/profile-icon-white-3.jpg"
            }
            className={styles.perfilimg}
            onClick={() => (!active ? setActive(true) : setActive(false))}
          />
        </button>
        {
            usuario ?
            <>
                <h3 className={styles.title}>{usuario.fullName}</h3>
                <h3 className={styles.email}>{usuario.email}</h3>
                <h3 className={styles.titleLogout} onClick={e=> handleLogout(e)}>
                CERRAR SESION
                </h3>
                <Link to={`/user/update/${usuario.id}`}>
                    <h3 className={styles.settings}>
                    <FontAwesomeIcon icon={faUserCog} />
                    </h3>
                </Link>{" "}
            </>
            :
            <h1>Loading...</h1>

        }
        
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
              "https://icon-library.com/images/profile-icon-white/profile-icon-white-3.jpg"
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
