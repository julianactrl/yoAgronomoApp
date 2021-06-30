import 'bootstrap/dist/css/bootstrap.min.css'
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
        dispatch(getTotal(cookie.get('selectedEmpresa').id))
        console.log('totalllllllllllll', total);
    },[])

    return (
        <>
            <table className={`table table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody >

                    {
                        total.map(item=> <>
                                <tr>
                                    <td>{item.clasificacion}</td>
                                    <td>{item.gastos}</td>
                                </tr>
                            </>
                        )
                    }

                        
                </tbody>
            </table>
            <div className={styles.footer}>
                <h2>TOTAL</h2>
                <h2 className={styles.numberTotal}>
                    {total.length ? total.reduce( (acc,next)=> acc.gastos + next.gastos) : null}
                </h2>
            </div>
        </>
        
    )
}