import Header from "../../Header/Header"
import styles from './styles.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Clasificacion from "./Clasificacion"
import GastoItem from "./GastoItem"


export default function GestionGastos () {


    return (
         <>
             <Header />
             <div className={styles.contenedor}>
                <div className={styles.contenedorTable}>
                        <div className={styles.contenedorHeader}>
                            <div className={styles.contClasificacionesYtotal}>
                                <Clasificacion title={'clasificacion nª 1'}/>
                                <Clasificacion title={'clasificacion nª 2'}/>
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
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <GastoItem Nombre={'Hi5'} Descripcion={2003} Precio={1500}/>
                            <GastoItem Nombre={'Windows live messenger'} Descripcion={1999} Precio={1500}/>
                            <GastoItem Nombre={'Metroflog messenger'} Descripcion={2004} Precio={1500}/>
                            <GastoItem Nombre={'Myspace'} Descripcion={2003} Precio={1500}/>
                            <GastoItem Nombre={'Windows live messenger'} Descripcion={1999} Precio={1500}/>
                            <tr>
                                <th scope="row">TOTAL</th>
                                {/* <td>-</td>
                                <td>7</td> */}
                                <td><strong>207.51</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
             </div>
         </>
    )
}