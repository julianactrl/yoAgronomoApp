import React ,{ useState } from 'react';
import styles from './styles.module.css'
import { renderizarItemOinput } from './controller';
import { useDispatch, useSelector } from 'react-redux';
import { createGastos , deleteGastos } from '../../../../redux/actions/gestionGastosActions';

export default function GastoItem ({ Nombre, Descripcion, Precio , fecha, gastoId}) {
    const [ edit, setEdit ] = useState(false);
    const dispatch = useDispatch()
    const selectedClasificacion = useSelector(state=>state.gestionGastosReducer.selectedClasificacion)
    const [ gasto, setGasto ] = useState({
        name:'',
        description:'',
        cost:'',
        date:'',
        clasificacionDeGastoId: selectedClasificacion.clasificacionDeGastoId
    })

    // console.log('esta es la clasificacionnnnnnnnnnnnn', selectedClasificacion);
    function renderizarItemOinput (nombre, descripcion, precio , fecha, edit) {
        return (
            <>
                {!edit ? <>
                    <td>1</td>
                    <td>{nombre}</td>
                    <td>{descripcion}</td>
                    <td>{precio}</td>
                    <td>{fecha}</td>
                    </>
                : <>
                    <td><input  className={styles.input} placeholder={''}/></td>
                    <td><input name={'name'} onChange={(e)=>setGasto({...gasto,[e.target.name]:e.target.value})} value={gasto.name} className={styles.input} placeholder={nombre}/></td>
                    <td><input name={'description'} onChange={(e)=>setGasto({...gasto,[e.target.name]:e.target.value})} value={gasto.description} className={styles.input} placeholder={descripcion}/></td>
                    <td><input name={'cost'} onChange={(e)=>setGasto({...gasto,[e.target.name]:e.target.value})} value={gasto.cost} className={styles.input} placeholder={precio}/></td>
                    <td><input name={'date'} onChange={(e)=>setGasto({...gasto,[e.target.name]:e.target.value})} value={gasto.date} className={styles.input} placeholder={fecha}/></td>
                </>
                }
            </>
        )
    }

    function handleEdit () {
        edit ? setEdit(false) : setEdit(true)
    }
    function handleDelete () {
        return dispatch(deleteGastos(gastoId))
    }
    function crearGasto () {
        let gastoAux = gasto;
        gastoAux.clasificacionDeGastoId = selectedClasificacion.clasificacionDeGastoId
        return dispatch(createGastos(gastoAux))
    }

    return (
        <>
            <tr>
                {Nombre?
                    renderizarItemOinput(Nombre, Descripcion, Precio , fecha, edit)
                :   renderizarItemOinput('Nombre..','Descripcion..','Precio..','Fecha..',true)
                }
                
                <td className={styles.contBtn}>
                    { Nombre ? 
                        (<><img onClick={handleEdit} className={styles.img} src={'https://image.flaticon.com/icons/png/512/1159/1159633.png'} />
                        <img onClick={handleDelete} className={styles.imgTacho} src='https://img2.freepng.es/20180410/wjq/kisspng-computer-icons-encapsulated-postscript-font-blueberry-5acd87c1840346.2188309115234190735407.jpg' /></>)
                    :   <><img onClick={crearGasto} className={styles.imgAgregar} src={'https://www.freeiconspng.com/uploads/add-list-icon--icon-search-engine-26.png'} /> 
                        <img className={styles.imgTachoF} src='https://img2.freepng.es/20180410/wjq/kisspng-computer-icons-encapsulated-postscript-font-blueberry-5acd87c1840346.2188309115234190735407.jpg' /> </>
                    }
                </td>
            </tr>
        </>
    )
}