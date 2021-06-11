import {Link} from 'react-router-dom'
import styles from './styles.module.css'

//...  SideBar  ...

export function sidebar(){
    return(
        <div className={styles.sidebarcont}>
            <div className={styles.linktextcont}>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>HOME</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>GESTIÓN COMERCIAL</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>LOTES</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>MERCADO</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>AGENDA</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>CLIMA</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>PREMIUM</h2>
                </Link>
                <Link className={styles.linktext}>
                <h2 className={styles.text}>AGRO CONSULTAS</h2>
                </Link>
            </div>

        </div>
    )
}