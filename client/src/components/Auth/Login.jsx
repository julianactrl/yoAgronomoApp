import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../LandingPage/styles.module.css";
import { login } from "../../redux/actions/userActions";
import { useHistory, Link } from "react-router-dom";

export function validate(input) {
  let errors = {};
  if (!input.email) {
    errors.email = "Se Requiere un Email";
  } else if (/\S+@\S+\.\S+/.test(input.mail)) {
    errors.email = "Email inválido";
  }
  if (!input.password) {
    errors.password = "Se requiere una contraseña";
  }

  return errors;
}

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const logged = useSelector((state) => state.userReducer.isAuth);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const handleChange = function (e) {
    e.persist();
    setInput({
      ...input,
      [e.target.id]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.id]: e.target.value,
      })
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input);
    dispatch(login(input));
    setLoading(true);
  }

  return (
    <div className={styles.container}>
      <form action="" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.labels} htmlFor="email"></label>
          <input
            placeholder="email@yoagronomo.com"
            className={styles.loginInput}
            type="email"
            id="email"
            value={input.email}
            onChange={handleChange}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.labels} htmlFor="password"></label>
          <input
            placeholder="Contraseña"
            className={styles.loginInput}
            type="password"
            id="password"
            value={input.password}
            onChange={handleChange}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>
        <div>
          {input.password ? (
            <button type="submit" className={styles.loginBtn}>
              Login
            </button>
          ) : (
            <button type="button" className={styles.disabledLogin}>
              Login
            </button>
          )}
        </div>
        <div>
          {loading ? (
            <div>
              <img
                alt="#"
                className={styles.loader}
                src="http://www.hadecoration.gift/public/images/ajax-loader-green.gif"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <Link to="/resetpassword">
         
        </Link>
      </form>
    </div>
  );
};

export default Login;
