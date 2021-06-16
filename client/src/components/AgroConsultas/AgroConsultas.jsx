import React, {useState} from 'react';
import etapasDesarrollo from './etapasDesarrollo.json';
import styles from './styles.module.css'

function AgroConsultas(){

const [etapas, setEtapas] = useState(etapasDesarrollo.Cereales);
const [etapas2, setEtapas2] = useState(etapasDesarrollo.Oleaginosas_leguminosas);
console.log(etapas)
    return(
        <div>
            <ul>
                {
                    etapas.map(etapa=>(
                        <div>
                        
                        
                        <p>{etapa.Maiz[0].Etapa}</p>
                     
                
                        </div>
                    ))
                }
            </ul>
            <main className={styles.main}>
                <h1 className={styles.titulo}>Agroconsultas</h1>
                <div className={styles.categorias} id='categorias'>
                    <div className={styles.categoria} data-categoria='escalas-fenologicas'>
                        <p>Escalas Fenológicas</p>
                    </div>
                    <div className={styles.categoria} data-categoria='manejo-integrado'>
                        <p>Manejo Integrado</p>
                    </div>
                    <div className={styles.categoria} data-categoria='fungicidas'>
                        <p>F-H-I</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AgroConsultas;