import React from 'react';
import { Route,Link } from 'react-router-dom';
import styles from './styles.module.css'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import GoogleBtn from '../GoogleBtn/index.jsx'
import leaf from './leaf.png'


const LandingPage = () => {

    return (
      <div className={styles.div}>
          <div className={styles.title}>
            <h1>YO</h1>
            <h2>AGRONOMO</h2>
            <img className={styles.logo} src={leaf}/>
          </div>
          <div className={styles.options}>
            <Link to="/index">
              <h1 className={styles.login}>Login</h1>
            </Link>

            <Link to="/index/register">
              <h1 className={styles.registro}>Registro</h1>
            </Link>
          </div>

          <Route exact path="/index/register" component={Register} />
          <Route exact path="/index" component={Login} />
          <GoogleBtn/>
      </div>
    )
}

export default LandingPage