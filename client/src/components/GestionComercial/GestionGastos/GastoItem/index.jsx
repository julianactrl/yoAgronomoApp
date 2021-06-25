import styles from './styles.module.css'

export default function GastoItem ({ Nombre, Descripcion, Precio}) {

    return (
        <>
            <tr>
                <td>1</td>
                <td>{Nombre}</td>
                <td>{Descripcion}</td>
                <td>{Precio}</td>
                <td className={styles.contBtn}>
                    {/* <div className={styles.contBtn}> */}
                    <button>X</button>
                    <button>X</button>
                    {/* <button className={styles.btn}> <img className={styles.img} src='https://image.flaticon.com/icons/png/512/1159/1159633.png'/> </button> */}
                    {/* </div> */}
                </td>
            </tr>
        </>
    )
}