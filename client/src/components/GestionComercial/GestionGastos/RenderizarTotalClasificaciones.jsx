
import React , { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotal } from '../../../redux/actions/gestionGastosActions'
import styles from './styles.module.css'
import Cookies from 'universal-cookie'


export default function RenderizarTotalClasificaciones ({clasificaciones}) {
    const dispatch = useDispatch()
    const cookie = new Cookies()
    const total = useSelector(state=>state.gestionGastosReducer.total)

    useEffect(()=>{
        cookie.get('selectedEmpresa').id && dispatch(getTotal(cookie.get('selectedEmpresa').id))
    },[])

    function sumaTotal () {
        if(total.gastos > 0) return total.gastos;
        if(total[0]){
            let arrayTotal = total.map(item=> (item.gastos ? item.gastos : 0) ) 
            return arrayTotal.reduce( (acc,next) => acc + next )
        }
        return 0
    }

    return (
        <>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr className={styles.contenedorTHeadTotal}>
                        <th>Clasificaciones</th>
                        <th>Precio</th>
                    </tr>
                </thead>
            </table>  
            <div className={styles.contenedorClasificaciones}>
                    {
                        total.map(item=> <>
                                <div className={styles.contenedorItemClasificacion}>
                                    <td className={styles.td}>{item.clasificacion}</td>
                                    <td className={styles.tdPrecio}>{item.gastos}</td>
                                </div>
                            </>
                        )
                    }
            </div>
            <div className={styles.footer}>
                <h2>TOTAL</h2>
                <h2 className={styles.numberTotal}>
                    { sumaTotal() }
                </h2>
            </div>
        </>
        
    )
}