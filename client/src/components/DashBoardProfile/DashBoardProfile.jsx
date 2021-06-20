// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styles from "./styles.module.css";
// import { logout } from "../../redux/actions/userActions";
// import jwt_decode from "jwt-decode";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCog } from "@fortawesome/free-solid-svg-icons";

// export default function DashBoardProfile() {
//   const [active, setActive] = useState(false)
//    const token = useSelector(state => state.userReducer.userInfo.data.token)

 
//   if(token){
//       var decoded = jwt_decode(token)
//   }
//   console.log(decoded.user)
  
//   const dispatch= useDispatch();

//   const handleLogout = () =>{
//       dispatch(logout)
//   }

//   function renderPerfil() {
//     return (
//       <div className={styles.perfilDeploy}>
//         <button className={styles.perfilbtn}>
//           <img
//             alt="perfil"
//             src={
//               "https://icon-library.com/images/profile-icon-white/profile-icon-white-3.jpg"
//             }
//             className={styles.perfilimg}
//             onClick={() => (!active ? setActive(true) : setActive(false))}
//           />
//         </button>
//         <h3 className={styles.title}>{decoded.user.fullName}</h3>
//         <h3 className={styles.email}>{decoded.user.email}</h3>
//         <h3 className={styles.titleLogout} onClick={handleLogout}>
//           CERRAR SESION
//         </h3>
//         <Link to={`/user/update/${decoded.id}`}>
//           <h3 className={styles.settings}>
//             <FontAwesomeIcon icon={faUserCog} />
//           </h3>
//         </Link>{" "}
//       </div>
//     );
//   }

//   return (
//     <div className={styles.perfilbtncont}>
//       {active ? (
//         renderPerfil()
//       ) : (
//         <button className={styles.perfilbtn}>
//           <img
//             alt="icon"
//             src={
//               "https://icon-library.com/images/profile-icon-white/profile-icon-white-3.jpg"
//             }
//             className={styles.perfilimg}
//             onClick={() => {
//               !active ? setActive(true) : setActive(false);
//             }}
//           />
//         </button>
//       )}
//     </div>
//   );
// }
