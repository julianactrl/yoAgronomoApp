
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from './styles.module.css'
// import icono from '../../../assets/iconClima.png'

export default function LoteCard ({lote}) {
    const dispatch = useDispatch()
    // empresaId: 6
    // id: 1
    // imagen: "https://imganuncios.mitula.net/timbues_barrio_ioppolo_lotes_10_00_x_33_00_metros_con_hasta_el_40_financiacion_4470063618060034108.jpg"
    // name: "Lote3"
    // superficie: "700 m2"
    // ubicacion: "Tucuman"

    function detailLote(data) {
        dispatch({type:'GET_DETAIL_LOTE',payload:data})
        dispatch({type:'SET_VERIFY',payload:'detalle'})
    }


    return (
        <div className={styles.contCard} onClick={()=>detailLote(lote)}>
            {/* <img src={icono} alt="" className={styles.icon}/> */}
                <img className={styles.img} alt="not found" src={lote.imagen}/>
            <div className={styles.detail}>
                <h1 className={styles.title}>{lote.name}</h1>
                <div className={styles.detailOculto}>
                    <div className={styles.contH2}>
                        <h2 className={styles.clima}>{lote.ubicacion}</h2>
                        <h2 className={styles.hectareas}>{lote.superficie}</h2>
                    </div>
                    <h2 className={styles.text}>Click para ver detalles</h2>
                </div>
            </div>
        </div> 
    )
}