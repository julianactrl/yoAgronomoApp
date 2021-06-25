import styles from './styles.module.css'

export default function Clasificacion ({title}) {

    return (
        <div className={styles.contClasificacion}>
            <buton className={`btn btn-outline-success ${styles.btnClasificacion}`}>{title}</buton>
        </div>
    )
}