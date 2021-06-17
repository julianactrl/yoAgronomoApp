import React, {useState,useEffect} from 'react';
import etapasDesarrollo from './etapasDesarrollo.json';
import fhi from './fhi.json';
import manejoIntegrado from './manejoIntegrado.json'
import styles from './styles.module.css'
import {connect} from 'react-redux'
import etapasmaiz from './etapasmaiz.json'
import etapassorgo from './etapassorgo.json'
import etapascerealesotoñal from './etapascerealesotoñal.json'
import etapasgirasol from './etapasgirasol.json'
import etapassoja from './etapassoja.json'
import etapasmani from './etapasmani.json'
import etapasgarbanzo from './etapasgarbanzo.json'
import { getFhi } from '../../redux/actions/agroConsultasActions';

function AgroConsultas(props){
    
  
    const [input,setInput] = useState('')

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

// function handleFhi(){
//     props.getFhi()
// }

const titles= props.dataAgro

function handleFhi(e){
    console.log(props.dataAgro)
}

function handleChange(e){
    console.log(e.target.value)
    setInput(e.target.value)
}


useEffect(() => {
    props.getFhi()
    return () => {
    }
  }, [])

    return(
        <div>
            <main className={styles.main}>
                <h1 className={styles.titulo}>Agroconsultas</h1>
                <div className={styles.categorias} id='categorias'>
                <form className={styles.form}>
                <input className={styles.input} type="text"
                placeholder='Tu consulta...'
                onChange={e=> handleChange(e)} />
               <button className={styles.btn} type= 'submit'>Buscar</button>
                </form>
                    
                   
                <button onClick={e => handleFhi(e)} className={styles.categoria} >
                        F.H.I
                    </button>
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

function mapStateToProps(state){
    return {
        dataAgro: state.agroConsultasReducer.fhiData,
    }
}

function mapDispatchToProps(dispatch){
    return{
        getFhi: () => dispatch(getFhi())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AgroConsultas);