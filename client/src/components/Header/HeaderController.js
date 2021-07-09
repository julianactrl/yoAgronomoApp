

import {Link} from 'react-router-dom'
import styles from './styles.module.css'


//...  SideBar  ...

export function sidebar(verify){
    const empresaId = window.location.pathname.split('/')[2] //---> Id de la empresa que aparece en detalle


    if (!verify){
        return(
            <div className={styles.sidebarcont}>
                <div className={styles.linktextcont}>
                    <Link to='/home' className={styles.linktext}>
                    <h2 className={styles.text}>HOME</h2>
                    </Link>
                    <Link to='/membresia' className={styles.linktext}>
                    <h2 className={styles.text}>MEMBRESIA</h2>
                    </Link>
                    <Link to='/agroconsultas' className={styles.linktext}>
                    <h2 className={styles.text}>AGRO CONSULTAS</h2>
                    </Link>
                    <Link to='/map' className={styles.linktext}>
                    <h2 className={styles.text}>INFORMACIÓN SATELITAL</h2>
                    </Link>
                </div>    
            </div>
        )
    }else{
            return(
        <div className={styles.sidebarcont}>
            <div className={styles.linktextcont}>
                <Link to='/home' className={styles.linktext}>
                <h2 className={styles.text}>HOME</h2>
                </Link>
                <Link to={`/gestion_comercial/${empresaId}`} className={styles.linktext}>
                <h2 className={styles.text}>GESTIÓN COMERCIAL</h2>
                </Link>
                <Link to={`/lote/${empresaId}`} className={styles.linktext} >
                <h2 className={styles.text}>LOTES</h2>
                </Link>
                <Link to='/mercados' className={styles.linktext}>
                <h2 className={styles.text}>MERCADOS</h2>
                </Link>
                <Link to={`/tareas`} className={styles.linktext}>
                <h2 className={styles.text}>AGENDA</h2>
                </Link>
                <Link to='/weather' className={styles.linktext}>
                <h2 className={styles.text}>CLIMA</h2>
                </Link>
                <Link to='/membresia'className={styles.linktext}>
                <h2 className={styles.text}>MEMBRESIA</h2>
                </Link>
                <Link to='/agroconsultas'className={styles.linktext}>
                <h2 className={styles.text}>AGRO CONSULTAS</h2>
                </Link>
                <Link to='/map' className={styles.linktext}>
                    <h2 className={styles.text}>INFORMACIÓN SATELITAL</h2>
                </Link>
            </div>

        </div>
    )
    }

}

