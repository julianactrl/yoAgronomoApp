import styles from './styles.module.css'
import { deleteClasificacion } from '../../../../redux/actions/gestionGastosActions';
import { useDispatch } from 'react-redux';

export default function Clasificacion ({name, id}) {
    const dispatch = useDispatch()
    const clasificacionSeleccionada= {name:name, clasificacionDeGastoId: id}

    return (
        <div className={styles.contClasificacion}>
            <buton onClick={()=> dispatch({type:'SELECTED_CLASIFICACION', payload: clasificacionSeleccionada})} className={`btn btn-outline-success ${styles.btnClasificacion}`}>
                {name}
            </buton>
                <button onClick={()=> dispatch(deleteClasificacion(id))} className={styles.btn}>X</button>
        </div>
    )
}