import React ,{ useState } from 'react';
import styles from './styles.module.css'
import { renderizarItemOinput } from './controller';

export default function GastoItem ({ Nombre, Descripcion, Precio , fecha}) {
    const [ edit, setEdit ] = useState(false);


    function handleEdit () {
        edit ? setEdit(false) : setEdit(true)
    }

    return (
        <>
            <tr>
                {renderizarItemOinput(Nombre, Descripcion, Precio , fecha, edit)}
                <td className={styles.contBtn}>
                    <img onClick={handleEdit} className={styles.img} src={'https://image.flaticon.com/icons/png/512/1159/1159633.png'} />
                    <img className={styles.imgTacho} src='https://img2.freepng.es/20180410/wjq/kisspng-computer-icons-encapsulated-postscript-font-blueberry-5acd87c1840346.2188309115234190735407.jpg' />
                </td>
            </tr>
        </>
    )
}