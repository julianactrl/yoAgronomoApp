import React, { useEffect } from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';
import {useDispatch, useSelector} from 'react-redux'
import { getAllEmpresas } from '../../redux/actions/empresaActions';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
const { REACT_APP_API } = process.env;




export default function CardsEmpresas ({empresa}){
    
    function handleCookie () {
        const cookies = new Cookies();
        cookies.set('selectedEmpresa', empresa , {path:'/', expires: new Date(Date.now()+2592000)})
        console.log('esta es la cookie', cookies.get('selecetedEmpresa'))
    }

    return (
        <div onClick={handleCookie}>
        <Link to={`/empresa/${empresa.id}`}>
            <div className={styles.main}>
                    <div className={styles.cardCont}>
                    {empresa.imagen ? (
            <img
              src={`${REACT_APP_API}/empresa/imagen/${empresa.imagen}`}
              alt="https://i.stack.imgur.com/y9DpT.jpg"
              width={400}
              height={600}
              className={styles.imgEmpresa}
            />
          ) : (
            <img
              alt="perfil"
              src={
                "https://blog.nutri-tech.com.au/content/images/2021/04/Crop---soybeans.jpg"
              }
              className={styles.imgEmpresa}
            />
          )}
                        <h1 className={styles.titleEmpresa}>{empresa.name}</h1>
                        <h3 className={styles.titleEmpresa}>{empresa.hectareas}</h3>
                    </div>
            </div>
        </Link>
        </div>

    )  

}