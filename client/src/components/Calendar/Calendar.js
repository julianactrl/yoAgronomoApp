import React, { useState, useEffect } from "react";
import { createTarea, getAllTareas } from "../../redux/actions/calendarActions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import swal from "sweetalert";
const { REACT_APP_API } = process.env;

function Calendar() {
  const idEmpresa = useSelector(
    (state) => state.empresaReducer.empresaForId.id
  );

  useEffect(() => {
    dispatch(getAllTareas(idEmpresa));
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const [tarea, setTarea] = useState({
    empresaId: idEmpresa,
    tarea: "",
    fecha: "",
    prioridad: "",
  });

  function handleInputChange(e) {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createTarea(tarea));
    history.push(`/home`)
  }
  function deleteTarea(id) {
    axios
      .delete(`${REACT_APP_API}/tareas/delete/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    swal("Tarea eliminada", { icon: "success" });
  }

  const tareasEmpresa = useSelector((state) => state.calendarReducer.tareas);
  const empresaName = useSelector((state) => state.empresaReducer.empresaForId.name);

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
      <div className={styles.all}>
        <Header />
        <h1 className={styles.tareas}>{empresaName} <br/>Tareas a realizar</h1>
        <form className={styles.estilosForm} onSubmit={handleSubmit}>
          <div>
            <label>Tarea: </label>
            <input
              className={styles.otroInput}
              type="text"
              onChange={(e) => handleInputChange(e)}
              value={tarea["tarea"]}
              placeholder="Tarea a realizar..."
              name="tarea"
            />
          </div>
          <div>
            <label>Fecha: </label>
            <input
              className={styles.otroInput}
              type="date"
              onChange={(e) => handleInputChange(e)}
              value={tarea["fecha"]}
              placeholder="2021-07-22"
              name="fecha"
            />
          </div>
          <br></br>
          <div>
            {/* <label>Prioridad: </label> */}
            <select
              className={styles.select}
              name="prioridad"
              onChange={(e) => handleInputChange(e)}
            >
              <option value=""> Selecciona Prioridad </option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
          <div>
            {tarea.fecha && tarea.tarea && tarea.empresaId ? (
              <button
                className={styles.buttonTarea}
                type="submit"
                value="Agendar Tarea"
                name="Enviar"
              >
                Agendar Tarea
              </button>
            ) : (
              <button type="button" className={styles.disabledButton}>
                Agendar Tarea
              </button>
            )}
          </div>
        </form>
        <br></br>
        <div className={styles.datatableContainer}>
          <table className={styles.datatable}>
            <thead>
              <tr>
                <th>
                  <h2 className={styles.tablita}>Tarea</h2>
                </th>
                <th>
                  <h2 className={styles.tablita}>Fecha</h2>
                </th>
                <th>
                  <h2 className={styles.tablita}>Prioridad</h2>
                </th>
                <th>
                    <h2 className={styles.tablita}>Estado</h2>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tareasEmpresa.length > 0 &&
                tareasEmpresa.map((t) => (
                  <tr>
                    <td>
                      <p className={styles.cadaTarea}>{t.tarea}</p>
                    </td>
                    <td>
                      <p className={styles.cadaTarea}>{t.fecha}</p>
                    </td>
                    <td>
                      <p className={styles.cadaTarea}>{t.prioridad}</p>
                    </td>
                    <td>
                        <p className={styles.cadaTarea}>{t.estado}</p>
                    </td>
                    <td>
                      {" "}
                      <Link to={`/empresa/${idEmpresa}`}>
                        <button
                          onClick={() => deleteTarea(`${t.id}`)}
                          className={styles.eliminarEmpresa}
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>
                      </Link>{" "}
                    </td>
                    <td>
                                <Link to={`/tareas/${t.id}`}>
                                   <button className={styles.actualizar}><i class="fa fa-refresh" aria-hidden="true"></i> </button>
                                </Link>
                            </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default Calendar;
