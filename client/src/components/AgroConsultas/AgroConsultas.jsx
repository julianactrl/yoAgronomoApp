import React, {useState,useEffect} from 'react';

import fhi from './fhi.json';
import manejoIntegrado from './manejoIntegrado.json'
import styles from './styles.module.css'
import {connect} from 'react-redux'
import etapasDesarrollo2 from './etapasDesarrollo2.json'
import funguicidas from './funguicidas.json'

import etapascerealesotoñal from './etapascerealesotoñal.json'



import { getFhi} from '../../redux/actions/agroConsultasActions';

function AgroConsultas(props){
    
  
    const [input,setInput] = useState('')

    const [etapas, setEtapas] = useState(etapasDesarrollo2.etapas)
    const [funguicidastate, setFunguicidas] = useState(funguicidas.funguicidas)

    
   
    
  

    const [filteredCategory, setFilteredCategory] = useState([])

// function handleCategory(e){
//     if (e.target.value === 'Etapas de Desarrollo'){
//         setFilteredCategory(maiz)
//     }
// }
function selectEtapas(e){
    setFilteredCategory(etapas)
}
function selectFunguicidas(e){
    setFilteredCategory(funguicidastate)
}


// function handleFhi(){
//     props.getFhi()
// }

const titles= props.dataAgro

function handleFhi(){
    console.log(titles.map(e=>(e.Title)))
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
                    <button onClick={(e)=>selectEtapas(e)} className={styles.categoria} >
                        Escalas Fenológicas 
                    </button>
                    <button onClick={(e)=>selectFunguicidas(e)} className={styles.categoria} >
                        Funguicidas 
                    </button>
                   
                   
                    
                </div>
            </main>
            
            <ul>
                {
                    filteredCategory.map(e=>(
                        <div className={styles.resultados}>
                        
                        {/* ESCALAS FENOLOGICAS */}
                        <p>{e.cereal}</p>
                        <p>{e.title}</p>
                        <p>{e.subtitle}</p>
                        <p>{e.Descripcion}</p>
                        <img src={e.imagen}/>

                        {/* FUNGUICIDAS */}
                        <p>{e.type}</p>
                        <p>{e.subtype}</p>
                        <p>{e.props}</p>
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
        getFhi: () => dispatch(getFhi()),
        
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(AgroConsultas);