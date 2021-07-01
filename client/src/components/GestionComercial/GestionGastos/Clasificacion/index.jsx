import styles from './styles.module.css'
import { deleteClasificacion } from '../../../../redux/actions/gestionGastosActions';
import { useDispatch } from 'react-redux';

export default function Clasificacion ({name, id}) {
    const dispatch = useDispatch()
    const clasificacionSeleccionada= {name:name, clasificacionDeGastoId: id}

    function clickClasificacion () {
        console.log('clasificacion seleccionada --->', name ,id);
        dispatch({type:'SELECTED_CLASIFICACION', payload: clasificacionSeleccionada})
        dispatch({type: 'GASTO_BY_INPUT',payload: []})
    }

    function handleDelete () {
        console.log('estoy borrando la clasificacion cn este id y nombre', id, name);
        return dispatch(deleteClasificacion(id))
    }

    return (
        <div className={styles.contClasificacion}>
            
            <buton onClick={clickClasificacion} className={styles.btnClasificacion}>
                {name}
            </buton>

            <button onClick={handleDelete} className={styles.btnCerrar}>X</button>
        </div>
    )
}