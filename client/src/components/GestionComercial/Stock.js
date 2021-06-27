import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import '../GestionComercial/GestionComercial.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    getStock,
    createStock,
    getStockById
} from '../../redux/actions/stockActions';
import Header from '../Header/Header'

export const Stock = (props) => {
    const [form, setForm] = useState(false)
    var {loteId} = props
    const [input, setInput] = useState({
        tipo: '',
        cantidad: null,
        nombreProducto: '',
        loteId,
    })
    useEffect(async () => {
        await props.getStockById(loteId)
    }, [])
    const toggleForm = () => {
        if (form === true) {
            setForm(false)
        } else {
            setForm(true);
        }
    }
    const handleInputChangeTipo = async (e) => {
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
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(input)
        await props.createStock(input)
        Stock();
    }
    console.log('aaaaaaaa', props)
    return (
        <div>
        <Header/>
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
                        props.stock && props.stock.map((s) => {
                            return (
                                <tr>
                                    <th scope='row'>{s.id}</th>
                                    <td>{s.tipo}</td>
                                    <td>{s.nombreProducto}</td>
                                    <td>{s.cantidad} unidades</td>
                                
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
                    <button type="button" onClick={toggleForm} className='btnAddStock'>+</button>
        </div>
    </div>
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        stock: state.stockReducer.stock,
        loteId: state.loteReducer.detailLote.id
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Stock);
