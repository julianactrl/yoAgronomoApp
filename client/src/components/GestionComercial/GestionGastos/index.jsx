import Header from "../../Header/Header"
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Clasificacion from "./Clasificacion"
import GastoItem from "./GastoItem"
import { useEffect, useState } from "react"
import { getAllClasificiones , createClasificacion} from "../../../redux/actions/gestionGastosActions"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'universal-cookie'

export default function GestionGastos () {
    const dispatch = useDispatch();
    const cookies = new Cookies();
    const [clasificacion, setClasificacion] = useState({name:''})
    // const [empresaId, setEmpresaId] = useState();
    const clasificaciones = useSelector(state=>state.gestionGastosReducer.clasificaciones)
    const createdClasificacion = useSelector(state=>state.gestionGastosReducer.createdClasificacion)


    useEffect(async ()=>{
        await dispatch(getAllClasificiones(cookies.get('selectedEmpresa').id))
    },[])

    useEffect(async ()=>{
        await dispatch(getAllClasificiones(await cookies.get('selectedEmpresa').id))
    },[createdClasificacion])

    async function crearClasificacion () {
        if(clasificacion.name.length){
            const crearClasificacion = clasificacion;
            crearClasificacion.empresaId = await cookies.get('selectedEmpresa').id
            await dispatch(createClasificacion(crearClasificacion))
            setClasificacion({name:''}) 
        }
    }

    return (
         <>
             <Header />
             <div className={styles.contenedor}>
                <div className={styles.contenedorTable}>
                        <div className={styles.contenedorHeader}>
                            <div className={styles.contClasificacionesYtotal}>
                                {
                                    clasificaciones&&clasificaciones.map(item=> <Clasificacion id={item.id} name={item.name} />)
                                }
                                <div className={styles.total}>
                                    <input value={clasificacion.name} onChange={(e)=>setClasificacion({name:e.target.value})} placeholder='Agregar Clasificación +' className={`btn btn-outline-success ${styles.btnTotal}`} />
                                    <button onClick={crearClasificacion}>Crear !!</button>
                                </div>
                                <div className={styles.total}>
                                    <button className={`btn btn-outline-success ${styles.btnTotal}`}>Total</button>
                                </div>
                            </div>

                            <div className={styles.contBuscador}>
                                <button className={styles.btnLupa}>
                                    <img className={styles.img} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM52Oe0Jm_tYAOj3OmCysuXypVFc3cR53MoM8U_NdsvM-p7OGLJiVRkvZBLnKjb4DRddc&usqp=CAU'/>
                                </button>
                                <input className={styles.input} placeholder='Buscar por palabra coincidente'/>
                            </div>
                        </div>
                    <table className={`table table-hover ${styles.table}`}>
                        <thead>
                            <tr>
                                <th>Prioridad</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Fecha</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody >
                                <GastoItem/>
                                <GastoItem Nombre={'Hi5'} Descripcion={2003} Precio={1500} fecha={'26/06/2021'}/>
                                <GastoItem Nombre={'Windows live messenger'} Descripcion={1999} Precio={1500} fecha={'26/06/2021'}/>
                                <GastoItem Nombre={'Metroflog messenger'} Descripcion={2004} Precio={1500} fecha={'26/06/2021'}/>
                                <GastoItem Nombre={'Myspace'} Descripcion={2003} Precio={1500} fecha={'26/06/2021'}/>
                                <GastoItem Nombre={'Windows live messenger'} Descripcion={1999} Precio={1500} fecha={'26/06/2021'}/>

                            {/* <tr className={styles.totalNumber}>
                                <th scope="row">TOTAL</th>
                                {/* <td>-</td>
                                <td>7</td> */}
                                {/* <td colspan="5" className={styles.totalNumberItem}><strong>207.51</strong></td> */}
                                {/* <td></td>
                                <td></td>
                                <td></td>
                                <td></td> 
                            </tr> 
                                */}
                        </tbody>
                    </table>
                    <div className={styles.footer}>
                        <h2>TOTAL</h2>
                        <h2 className={styles.numberTotal}> 207,51</h2>
                    </div>
                </div>
             </div>
         </>
    )
}