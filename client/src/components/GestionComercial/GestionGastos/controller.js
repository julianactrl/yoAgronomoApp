import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './styles.module.css'


export function renderizarTotalClasificaciones (clasificaciones) {

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
                        clasificaciones.map(item=> <>
                                <tr>
                                    <td>{item.name}</td>
                                    <td>23423</td>
                                </tr>
                            </>
                        )
                    }

                        
                </tbody>
            </table>
            <div className={styles.footer}>
                <h2>TOTAL</h2>
                <h2 className={styles.numberTotal}>
                     {/* {gastos.length && gastos.map(e=> Number(e.cost)).reduce((acc,next)=> acc + next)} */}
                   1200
                </h2>
            </div>
        </>
        
    )
}