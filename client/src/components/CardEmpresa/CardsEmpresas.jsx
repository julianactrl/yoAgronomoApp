import React, { useEffect } from 'react';
import styles from './styles.module.css'
import image1 from '../../assets/image1.jpg';
import {useDispatch, useSelector} from 'react-redux'
import { getAllEmpresas } from '../../redux/actions/empresaActions';



export default function CardsEmpresas (empresas){
        const example = {
            title: 'Example',
            img: image1,
            hectareas: 200
        }
        function render(){
            empresas.map(e=>{
                const {name, hectareas} =  e
                return(
                <div className={styles.main}>
                    <div className={styles.cardCont}>
                        <img src={empresas.img} className={styles.img}/>
                        <h1 className={styles.titleEmpresa}>{name}</h1>
                        <h3 className={styles.titleEmpresa}>{hectareas}</h3>
                    </div>
                </div>
                )
            })

            
        }

        return (
            <>
                {
                    empresas?render():null
                }
            </>

        )  

}