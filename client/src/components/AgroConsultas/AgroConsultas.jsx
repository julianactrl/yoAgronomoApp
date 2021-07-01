import React, { useState } from "react";
import manejoIntegrado from "./manejoIntegrado.json";
import styles from "./styles.module.css";
import etapasDesarrollo2 from "./etapasDesarrollo2.json";
import funguicidas from "./funguicidas.json";
import insecticidas from "./insecticidas.json";
import herbicidas from "./herbicidas.json";
import allResults from "./allResults.json";
import Header from "../Header/Header";
import { motion } from "framer-motion";

function AgroConsultas() {
  const [input, setInput] = useState("");

  const [etapas, setEtapas] = useState(etapasDesarrollo2.etapas);
  const [funguicidastate, setFunguicidas] = useState(funguicidas.funguicidas);
  const [insect, setInsect] = useState(insecticidas.insecticidas);
  const [herbic, setHerbic] = useState(herbicidas.herbicidas);
  const [manejo, setManejo] = useState(manejoIntegrado.manejoIntegrado);

  const [allRes, setAllRes] = useState(allResults.all);
  const [filteredCategory, setFilteredCategory] = useState([]);

  function selectEtapas(e) {
    setFilteredCategory(etapas);
  }
  function selectFunguicidas(e) {
    setFilteredCategory(funguicidastate);
  }
  function selectInsecticidas(e) {
    setFilteredCategory(herbic);
  }
  function selectHerbicidas(e) {
    setFilteredCategory(insect);
  }
  function selectManejo(e) {
    setFilteredCategory(manejo);
  }
  function selectAll(e) {
    setFilteredCategory(allRes);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: -1,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.002,
          },
        },
      }}
    >
      <div>
        <Header />

        <h1 className={styles.titulo}>Agroconsultas</h1>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            placeholder="Tu consulta..."
            onChange={(e) => handleChange(e)}
          />
        </form>
        <div className={styles.categorias} id="categorias">
          {/* <button onClick={e => handleFhi(e)} className={styles.categoria} >
                        F.H.I
                    </button> */}
          <button onClick={(e) => selectEtapas(e)} className={styles.categoria}>
            Escalas Fenológicas <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
          <button
            onClick={(e) => selectFunguicidas(e)}
            className={styles.categoria}
          >
            {" "}
            Funguicidas <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
          <button
            onClick={(e) => selectInsecticidas(e)}
            className={styles.categoria}
          >
            {" "}
            Insecticidas <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
          <button
            onClick={(e) => selectHerbicidas(e)}
            className={styles.categoria}
          >
            Herbicidas <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
          <button onClick={(e) => selectManejo(e)} className={styles.categoria}>
            Manejo Integrado <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
          <button onClick={(e) => selectAll(e)} className={styles.categoria}>
            {" "}
            Ver Todo <br />
            <img
              className={styles.icon}
              alt="#"
              src="https://static.thenounproject.com/png/2880952-200.png"
            />
          </button>
        </div>

        <ul className={styles.contentOverflow}>
          {filteredCategory.length
            ? filteredCategory
                .filter((val) => {
                  if (input == "") {
                    return val;
                  } else if (
                    (val.title &&
                      val.title.toLowerCase().includes(input.toLowerCase())) ||
                    (val.cereal &&
                      val.cereal.toLowerCase().includes(input.toLowerCase())) ||
                    (val.type &&
                      val.type.toLowerCase().includes(input.toLowerCase())) ||
                    (val.subtype &&
                      val.subtype.toLowerCase().includes(input.toLowerCase()))
                  ) {
                    return val;
                  }
                })
                .map((e) => (
                  <div className={styles.resultados}>
                    {/* ESCALAS FENOLOGICAS */}
                    <p className={styles.tituloCard}>{e.cereal}</p>
                    <p className={styles.sub}>{e.title}</p>
                    <p className={styles.body}>{e.subetapa}</p>
                    <p className={styles.body}>{e.Descripcion}</p>
                    {/* <img className={styles.escalasImg} alt="not found" src={e.imagen} /> */}

                    {/* FUNG/HERB/INSECT */}
                    <p className={styles.tituloCard}>{e.type}</p>
                    <p className={styles.sub}>{e.subtype}</p>
                    <p className={styles.body}>{e.subtype2}</p>
                    <p className={styles.body}>{e.props}</p>
                  </div>
                ))
            : allRes
                .filter((val) => {
                  if (input === "") {
                    return val;
                  } else if (
                    (val.title &&
                      val.title.toLowerCase().includes(input.toLowerCase())) ||
                    (val.cereal &&
                      val.cereal.toLowerCase().includes(input.toLowerCase())) ||
                    (val.type &&
                      val.type.toLowerCase().includes(input.toLowerCase())) ||
                    (val.subtype &&
                      val.subtype.toLowerCase().includes(input.toLowerCase()))
                  ) {
                    return val;
                  }
                })
                .map((e) => (
                  <div className={styles.resultados}>
                    {/* ESCALAS FENOLOGICAS */}
                    <p className={styles.tituloCard}>{e.cereal}</p>
                    <p className={styles.sub}>{e.title}</p>
                    <p className={styles.body}>{e.subetapa}</p>
                    <p className={styles.body}>{e.Descripcion}</p>
                    {/* <img className={styles.escalasImg} alt="not found" src={e.imagen} /> */}

                    {/* FUNG/HERB/INSECT */}
                    <p className={styles.tituloCard}>{e.type}</p>
                    <p className={styles.sub}>{e.subtype}</p>
                    <p className={styles.body}>{e.subtype2}</p>
                    <p className={styles.body}>{e.props}</p>
                  </div>
                ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default AgroConsultas;
