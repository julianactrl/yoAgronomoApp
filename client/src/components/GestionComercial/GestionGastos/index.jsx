import Header from "../../Header/Header"
import styles from './styles.module.css'
import Clasificacion from "./Clasificacion"
import GastoItem from "./GastoItem"
import { useEffect, useState } from "react"
import { getAllClasificiones , createClasificacion, getAllGastos, getGastoByInput} from "../../../redux/actions/gestionGastosActions"
import { useDispatch, useSelector } from "react-redux"

import  RenderizarTotalClasificaciones  from "./RenderizarTotalClasificaciones.jsx"
import {renderClasificaciones} from './controller'

export default function GestionGastos () {
    const dispatch = useDispatch();
    
    const [clasificacion, setClasificacion] = useState({name:''})
    const [totalClasificaciones, setTotalClasificaciones] = useState() // Estado para mostrar el total de gasto de todas las clasificaciones
    // const [empresaId, setEmpresaId] = useState();
    const clasificaciones = useSelector(state=>state.gestionGastosReducer.clasificaciones)
    const createdClasificacion = useSelector(state=>state.gestionGastosReducer.createdClasificacion)
    const selectedClasificacion = useSelector(state=>state.gestionGastosReducer.selectedClasificacion)// clasificacion seleccionada
    const gastos = useSelector(state=>state.gestionGastosReducer.gastos) // todos los gastos
    const gastoByInput = useSelector(state=>state.gestionGastosReducer.gastoByInput) // gastos buscados por el input
    const createdGasto = useSelector(state=>state.gestionGastosReducer.createdGasto)
    const empresaId = useSelector(state=>state.empresaReducer.empresaForId.id)


    useEffect( ()=>{
         dispatch(getAllClasificiones(empresaId))
    },[])

    useEffect( ()=>{
        dispatch(getAllGastos(selectedClasificacion.clasificacionDeGastoId))
        setTotalClasificaciones(false)
        console.log('estos son los gastos',gastos);
        let gastosAuxiliar = gastos.length && gastos.map(e=> Number(e.cost)).reduce((acc,next)=> acc + next)
    },[selectedClasificacion])
    
    // si se crea un gasto o se elimina con este useefect se actualiza
    useEffect(()=>{
        console.log('se creo un gasto ahora los traigo');
        dispatch(getAllGastos(selectedClasificacion.clasificacionDeGastoId))
    },[createdGasto])
    
    
    useEffect( ()=>{
         dispatch(getAllClasificiones(empresaId))
    },[createdClasificacion])
    
      function crearClasificacion () {
        const crearClasificacion = clasificacion;
        crearClasificacion.empresaId =  empresaId
         dispatch(createClasificacion(crearClasificacion))
        setClasificacion({name:''}) 
         dispatch(getAllClasificiones(empresaId))
    }
    // useEffect( ()=>{
    // },[])


    return (
         <>
             <Header />
             <div className={styles.contenedor}>
                <div className={styles.contenedorTable}>
                        <div className={styles.contenedorHeader}>
                            <div className={styles.contClasificacionesYtotal}>
                                <div className={styles.contClasificaciones}>
                                {
                                    // renderClasificaciones(clasificaciones, createdClasificacion)
                                    clasificaciones[0]&&clasificaciones.map(item=> <Clasificacion id={item.id} name={item.name} />)
                                }
                                    <div className={styles.contCrearClasificacion}>
                                        <input value={clasificacion.name} onChange={(e)=>setClasificacion({name:e.target.value})} placeholder='Agregar clasificación..' className={styles.inputAgregar} />
                                        <button className={styles.btnCrear} onClick={crearClasificacion}>Crear</button>
                                    </div>
                                </div>

                                <div className={styles.total}>
                                    <button onClick={()=>setTotalClasificaciones(true)} className={styles.btnTotal}>Total</button>
                                </div>
                            </div>

                            <div className={styles.contBuscador}>
                                <button className={styles.btnLupa}>
                                    <img className={styles.img} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM52Oe0Jm_tYAOj3OmCysuXypVFc3cR53MoM8U_NdsvM-p7OGLJiVRkvZBLnKjb4DRddc&usqp=CAU'/>
                                </button>
                                <input onBlur={(e)=>{e.target.value.length? dispatch(getGastoByInput(e.target.value)) : dispatch({type: 'GASTO_BY_INPUT',payload: []}) }} onChange={(e)=> {dispatch(getGastoByInput(e.target.value));console.log(gastoByInput)}} className={styles.inputt} placeholder='Buscar por palabra coincidente'/>
                            </div>
                        </div>
                        { totalClasificaciones  ?
                        <RenderizarTotalClasificaciones clasificaciones={clasificaciones} />
                            : (<>
                            <table className={styles.table}>
                                <thead className={styles.thead}>
                                    <tr className={styles.contenedorTHead}>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>
                            </table>   
                                    <div className={styles.contenedorGasto}>
                                        <GastoItem />
                                        {
                                            gastoByInput[0] ?
                                            gastoByInput.map(gasto=> <GastoItem Nombre={gasto.name} Descripcion={gasto.description} Precio={gasto.cost} gastoId={gasto.id} fecha={gasto.date}/>)
                                            : gastos && gastos.map(gasto=> <GastoItem Nombre={gasto.name} Descripcion={gasto.description} Precio={gasto.cost} gastoId={gasto.id} fecha={gasto.date}/>)
                                        }
                                    </div>
                            <div className={styles.footer}>
                                <h2>TOTAL</h2>
                                <h2 className={styles.numberTotal}>
                                    {gastos.length && gastos.map(e=> Number(e.cost)).reduce((acc,next)=> acc + next)}
                                </h2>
                            </div>
                            </>)
                        }
                </div>
             </div>
             </>
    )
}