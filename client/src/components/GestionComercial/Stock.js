import React, { useState, useEffect} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import '../GestionComercial/GestionComercial.css';
import swal from "sweetalert";
import {useHistory} from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../Header/Header';
import {
    getStock,
    createStock,
    getStockById,
    deleteStock
} from '../../redux/actions/stockActions';
import {getEmpresa} from '../../redux/actions/empresaActions';
// import { editStock } from '../../../../api/src/controllers/stockController';

export const Stock = () => {
    const dispatch = useDispatch()
    const stock = useSelector(state => state.stockReducer.stockPorEmpresa)
    const empresaId = window.location.pathname.split('/')[3]
    console.log(empresaId)
    const [form, setForm] = useState(false)
    const [formEdit, setFormEdit] = useState(false)
    const [input, setInput] = useState({
        tipo: '',
        cantidad: null,
        nombreProducto: '',
        empresaId,
    })
    const [IdStock,setIdStock] = useState(null)
    useEffect(() => {
        dispatch(getEmpresa(empresaId))
        dispatch(getStockById(empresaId))
    }, [])
    // useEffect(() => {
    // },[])
    const toggleForm = () => {
        if (form === true) {
            setForm(false)
        } else {
            setForm(true);
        }
    }
    const toggleFormEdit = () => {
        if (formEdit === true) {
            setFormEdit(false)
        } else {
            setFormEdit(true);
        }
    }
    const handleInputChangeTipo = async (e) => {
        if (e.target.value === "Tipo" || e.target.value === "") {
            return swal({
                title: "Debes completar todos los campos!",
                icon: "warning",
                button: true,
                dangerMode: true,
              });
        }
        setInput({
            ...input,
            tipo: e.target.value
        });
    }
    const handleInputChangeProducto = async (e) => {
        setInput({
            ...input,
            nombreProducto: e.target.value
        });
    }
    const handleInputChangeCantidad = async (e) => {
        setInput({
            ...input,
            cantidad: e.target.value
        });
        console.log(input)
    }
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.tipo === undefined || input.cantidad === null || input.nombreProducto === undefined ) {
            return swal({
                title: "Debes completar todos los campos!",
                icon: "warning",
                button: true,
                dangerMode: true,
              });
        } else {
            await dispatch(createStock(input))
            swal({
                title: "Stock creado!",
                icon: "success",
                button: true,
              })
              window.location.reload(true)
              
        }
    }
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (input.tipo === undefined || input.cantidad === null || input.nombreProducto === undefined ) {
            return swal({
                title: "Debes completar todos los campos!",
                icon: "warning",
                button: true,
                dangerMode: true,
              });
        } else {
            await dispatch(createStock(input))
            swal({
                title: "Stock creado!",
                icon: "success",
                button: true,
              })
              DeleteStock(IdStock)
              window.location.reload(true)
              
        }
    }
    const DeleteStock = (stockId) => {
        dispatch(deleteStock(stockId))
        window.location.reload(true)
    }
    const EditarStock = (stockId) => {
        toggleFormEdit();
        setIdStock(stockId)
    }
    console.log(IdStock)
    return (
        <>
        <Header />
    <div className='stockCont'>
        <div className='table-responsive colorTable'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col"><strong>#</strong></th>
                        <th scope="col"><strong>Tipo</strong></th>
                        <th scope="col"><strong>Producto</strong></th>
                        <th scope="col"><strong>Cantidad</strong></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        stock && stock.map((s) => {
                            return (
                                <tr>
                                    <th scope='row'>{stock.indexOf(s) + 1}</th>
                                    <td>{s.tipo}</td>
                                    <td>{s.nombreProducto}</td>
                                    <td>{s.cantidad} unidades</td>
                                    <td ><button onClick={() => {EditarStock(s.id)}} className='btnEditarStock'><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button><button onClick={() => DeleteStock(s.id)} className='btnEliminarStock'><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                form ? 
            <form className='formStock' onSubmit={handleSubmit}>
                <div className='containerInputStock'>
                  <select className='stockTipo' onChange={handleInputChangeTipo}>
                      <option value="Tipo">Tipo</option>
                      <option value="Semilla">Semilla</option>
                      <option value="Insumo">Insumo</option>
                  </select> 
                  <input type="text" className='stockProducto' placeholder='Producto' onChange={handleInputChangeProducto} /> 
                  <input type="number" min='0' max='1000' placeholder='0' className='stockCant' onChange={handleInputChangeCantidad} /> 
                </div>
                  <input type="submit" value='Create' className='submitStock' />
            </form> 
            :
            null
            }
            {
                formEdit ?
                <form className='formStock' onSubmit={handleSubmitEdit}>
                <div className='containerInputStock'>
                  <select className='stockTipo' onChange={handleInputChangeTipo}>
                      <option value="Tipo">Tipo</option>
                      <option value="Semilla">Semilla</option>
                      <option value="Insumo">Insumo</option>
                  </select> 
                  <input type="text" className='stockProducto' placeholder='Producto' onChange={handleInputChangeProducto} /> 
                  <input type="number" min='0' max='1000' placeholder='0' className='stockCant' onChange={handleInputChangeCantidad} /> 
                </div>
                  <input type="submit" value='Edit' className='submitStock' />
            </form> 
            : null
            }
                    <button type="button" onClick={toggleForm} className='btnAddStock'>+</button>
        </div>
    </div>
    </>
    )
}

const mapStateToProps = (state) => {
    return {
        stock: state.stockReducer.stock,
        empresaId: state.empresaReducer.empresaForId.id,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getStock: () => {
            dispatch(getStock())
        },
        createStock: (data) => {
            dispatch(createStock(data))
        },
        getStockById: (id) => {
            dispatch(getStockById(id))
        },
        getEmpresa: (id) => {
            dispatch(getEmpresa(id))
        }
    }
}
export default Stock;
