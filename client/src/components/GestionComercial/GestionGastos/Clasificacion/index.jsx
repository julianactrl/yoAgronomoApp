import styles from './styles.module.css'
import { deleteClasificacion } from '../../../../redux/actions/gestionGastosActions';
import { useDispatch } from 'react-redux';

export default function Clasificacion ({name, id}) {
    const dispatch = useDispatch()
    const clasificacionSeleccionada= {name:name, clasificacionDeGastoId: id}

    function clickClasificacion () {
        dispatch({type:'SELECTED_CLASIFICACION', payload: clasificacionSeleccionada})
        dispatch({type: 'GASTO_BY_INPUT',payload: []})
    }

    return (
        <div className={styles.contClasificacion}>
            <buton onClick={clickClasificacion} className={`btn btn-outline-success ${styles.btnClasificacion}`}>
                {name}
            </buton>
                <button onClick={()=> dispatch(deleteClasificacion(id))} className={styles.btn}>X</button>
        </div>
    )
}