import styles from './styles.module.css'

export function renderizarItemOinput (nombre, descripcion, precio , fecha, edit) {

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
                <td><input className={styles.input} placeholder={''}/></td>
                <td><input className={styles.input} placeholder={nombre}/></td>
                <td><input className={styles.input} placeholder={descripcion}/></td>
                <td><input className={styles.input} placeholder={precio}/></td>
                <td><input className={styles.input} placeholder={fecha}/></td>
            </>
            }
        </>
    )
}