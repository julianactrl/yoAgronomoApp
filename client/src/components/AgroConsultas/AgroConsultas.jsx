import React, {useState,useEffect} from 'react';
import manejoIntegrado from './manejoIntegrado.json'
import { connect } from 'react-redux';
import styles from './styles.module.css'
import etapasDesarrollo2 from './etapasDesarrollo2.json'
import funguicidas from './funguicidas.json'
import insecticidas from './insecticidas.json'
import herbicidas from './herbicidas.json'
import allResults from './allResults.json'
import Header from '../Header/Header'
import { motion } from 'framer-motion';


function AgroConsultas(props){
    
  
    const [input,setInput] = useState('')

    const [etapas, setEtapas] = useState(etapasDesarrollo2.etapas)
    const [funguicidastate, setFunguicidas] = useState(funguicidas.funguicidas)
    const [insect, setInsect] = useState(insecticidas.insecticidas)
    const [herbic, setHerbic] = useState(herbicidas.herbicidas)
    const [manejo, setManejo] = useState(manejoIntegrado.manejoIntegrado)
    
    const [allRes, setAllRes] = useState(allResults.all)
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
function selectInsecticidas(e){
    setFilteredCategory(herbic)
}
function selectHerbicidas(e){
    setFilteredCategory(insect)
}
function selectManejo(e){
    setFilteredCategory(manejo)
}
function selectAll(e){
    setFilteredCategory(allRes)
}



function handleChange(e){
    console.log(e.target.value)
    setInput(e.target.value)
}

// function handleSubmit(e){
//     e.preventDefault()

//     if(input){
//         props.filterByValue()
//     }else{
//         alert('You must enter a valid word')
//     }
//     setInput('')
// }






    return(
        <motion.div
      initial='hidden'
      animate='visible'
      variants={{
      hidden: {
          scale: .8,
          opacity: -1
      },
      visible: {
          scale: 1,
          opacity: 1,
          transition:{
              delay: .002
          }
      }
      }}
      >
        <div>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.titulo}>Agroconsultas</h1>
                <form  className={styles.form}>
                <input className={styles.input} type="text"
               
                placeholder='Tu consulta...'
                onChange={(e)=> handleChange(e)} />
               <button className={styles.btn} type= 'submit'>Buscar</button>
                </form>
                <div className={styles.categorias} id='categorias'>
                
                    
                   
                {/* <button onClick={e => handleFhi(e)} className={styles.categoria} >
                        F.H.I
                    </button> */}
                    <button onClick={(e)=>selectEtapas(e)} className={styles.categoria} >Escalas Fenológicas <img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>
                        
                    </button>
                    <button onClick={(e)=>selectFunguicidas(e)} className={styles.categoria} > Funguicidas <img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>
                    
                    </button>
                    <button onClick={(e)=>selectInsecticidas(e)} className={styles.categoria} > Insecticidas <img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>
                        
                    </button>
                    <button onClick={(e)=>selectHerbicidas(e)} className={styles.categoria} >Herbicidas <img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>
                       
                    </button>
                    <button onClick={(e)=>selectManejo(e)} className={styles.categoria} >Manejo Integrado<img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>
                        
                    </button>
                    <button onClick={(e)=>selectAll(e)} className={styles.categoria} > Ver Todo<img className={styles.icon} src='https://static.thenounproject.com/png/2880952-200.png'/>

                    </button>
                   
                   
                   
                    
                </div>
            </main>
            
            <ul className={styles.contentOverflow}>
                {   filteredCategory.length?
                    filteredCategory.map(e=>(
                        <div className={styles.resultados}>
                             
                        
                        {/* ESCALAS FENOLOGICAS */}
                        <p className={styles.tituloCard}>{e.cereal}</p>
                        <p className={styles.sub}>{e.title}</p>
                        <p>{e.subetapa}</p>
                        <p>{e.Descripcion}</p>
                        <img className={styles.escalasImg} src={e.imagen}/>

                        {/* FUNG/HERB/INSECT */}
                        <p className={styles.tituloCard}>{e.type}</p>
                        <p className={styles.sub}>{e.subtype}</p>
                        <p>{e.subtype2}</p>
                        <p>{e.props}</p>
                        </div>
                        ))
                        :
                        allRes.map(e=>(
                            <div className={styles.resultados}>
                              {/* ESCALAS FENOLOGICAS */}
                        <p className={styles.tituloCard}>{e.cereal}</p>
                        <p className={styles.sub}>{e.title}</p>
                        <p>{e.subetapa}</p>
                        <p>{e.Descripcion}</p>
                        <img className={styles.escalasImg} src={e.imagen}/>

                        {/* FUNG/HERB/INSECT */}
                        <p className={styles.tituloCard}>{e.type}</p>
                        <p className={styles.sub}>{e.subtype}</p>
                        <p>{e.subtype2}</p>
                        <p>{e.props}</p>  
                            </div>
                        ))
                       
                        

                }
            </ul>
            
        </div>
        </motion.div>
    )
}



export default AgroConsultas;


