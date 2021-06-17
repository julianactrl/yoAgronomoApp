import React, {useState} from 'react';
import etapasDesarrollo from './etapasDesarrollo.json';
import fhi from './fhi.json';
import manejoIntegrado from './manejoIntegrado.json'
import styles from './styles.module.css'
import etapasmaiz from './etapasmaiz.json'
import etapassorgo from './etapassorgo.json'
import etapascerealesotoñal from './etapascerealesotoñal.json'
import etapasgirasol from './etapasgirasol.json'
import etapassoja from './etapassoja.json'
import etapasmani from './etapasmani.json'
import etapasgarbanzo from './etapasgarbanzo.json'

function AgroConsultas(){
    
  
    const [maiz, setMaiz] = useState(etapasmaiz.Maiz)
    const [sorgo, setSorgo] = useState(etapassorgo.Sorgo)
    const [otoñal, setOtoñal] = useState(etapascerealesotoñal.CerealesDeSiembraOtoñal)
    const [girasol, setGirasol] = useState(etapasgirasol.Girasol)
    const [soja, setSoja] = useState(etapassoja.Soja)
    const [mani, setMani] = useState(etapasmani.Mani)
    const [garbanzo, setGarbanzo] =useState(etapasgarbanzo.Garbanzo)

    const [filteredCategory, setFilteredCategory] = useState([])

// function handleCategory(e){
//     if (e.target.value === 'Etapas de Desarrollo'){
//         setFilteredCategory(maiz)
//     }
// }
function selectMaiz(e){
    setFilteredCategory(maiz)
}
function selectSorgo(e){
    setFilteredCategory(sorgo)
}
function selectOtoñal(e){
    setFilteredCategory(otoñal)
}
function selectGirasol(e){
    setFilteredCategory(girasol)
}
function selectSoja(e){
    setFilteredCategory(soja)
}
function selectMani(e){
    setFilteredCategory(mani)
}
function selectGarbanzo(e){
    setFilteredCategory(garbanzo)
}

    return(
        <div>
            <main className={styles.main}>
                <h1 className={styles.titulo}>Agroconsultas</h1>
                <div className={styles.categorias} id='categorias'>
                    
                   
                   
                    <button onClick={(e)=>selectMaiz(e)} className={styles.categoria} >
                        Escalas Fenológicas Maíz
                    </button>
                    <button onClick={(e)=>selectSorgo(e)} className={styles.categoria}>
                        Escalas Fenológicas Sorgo
                    </button>
                    <button onClick={(e)=>selectOtoñal(e)} className={styles.categoria} >
                        Escalas Fenológicas Cereales de siembra Otoñal
                    </button>
                    <button onClick={(e)=>selectGirasol(e)} className={styles.categoria} >
                        Escalas Fenológicas Girasol
                    </button>
                    <button onClick={(e)=>selectSoja(e)} className={styles.categoria} >
                        Escalas Fenológicas Soja
                    </button>
                    <button onClick={(e)=>selectMani(e)} className={styles.categoria} >
                        Escalas Fenológicas Mani
                    </button>
                    <button onClick={(e)=>selectGarbanzo(e)} className={styles.categoria} >
                        Escalas Fenológicas Garbanzo
                    </button>
                   
                    
                </div>
            </main>
            
            <ul>
                {
                    filteredCategory.map(e=>(
                        <div className={styles.resultados}>
                        
                        
                        <p>{e.Etapa}</p>
                        <p>{e.Descripcion}</p>
                        <img src={e.imagen}/>
                        </div>
                    ))
                }
            </ul>
            
        </div>
    )
}

export default AgroConsultas;