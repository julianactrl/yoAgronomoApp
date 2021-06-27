import styles from './styles.module.css'
import { deleteClasificacion } from '../../../../redux/actions/gestionGastosActions';
import { useDispatch } from 'react-redux';

export default function Clasificacion ({name, id}) {
    const dispatch = useDispatch()

    return (
        <div className={styles.contClasificacion}>
            <buton onClick={()=> console.log('hello')} className={`btn btn-outline-success ${styles.btnClasificacion}`}>
                {name}
            </buton>
                <button onClick={()=> dispatch(deleteClasificacion(id))} className={styles.btn}>X</button>
        </div>
    )
}