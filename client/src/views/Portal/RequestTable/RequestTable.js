import React, { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import { FaShoppingBag } from 'react-icons/fa'
import { getPaymentTypes, getDeliveryTypes } from '../../../services/Data';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner';

const RequestTable = () => {

    const [filter, setFilter] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [shippingTypes, setShippingTypes] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getPaymentTypes()
            .then(res => setPaymentMethods(res))
            .catch(async (err) => {
                await Swal.fire('Error de conexion', 'Ocurrio un error al conectar al servidor', 'error')
                window.location.href = 'portal/'
            })

        getDeliveryTypes()
            .then(res => { setShippingTypes(res); setLoading(false) })
            .catch(async (err) => {
                await Swal.fire('Error de conexion', 'Ocurrio un error al conectar al servidor', 'error')
                window.location.href = 'portal/'
            })

    }, [])

    if (loading) {
        return <Spinner />
    }

    //Configuracion del filtro
    let filterComponent;
    if (filter !== '') {
        switch (filter) {
            case '1':
                filterComponent = (
                    <div className="row">
                        <div className="col-6">
                            Fecha de inicio
                            <input
                                type="date"
                                className="form-control"
                                onChange={e => setInitialDate(e.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            Fecha fin
                        <input
                                type="date"
                                className="form-control"
                                onChange={e => setFinalDate(e.target.value)}
                            />
                        </div>
                        <button
                            // onClick={filtradoFecha}
                            type="button"
                            className="btn btn-success mt-3 m-l-250"
                        >
                            Buscar
                        </button>
                    </div>
                )
                break;
            case '2':
                filterComponent = (
                    <input placeholder='Nombre de cliente' className='form-control' />
                )
                break;
            case '3':
                filterComponent = (
                    <select className='form-control'>
                        {paymentMethods.map(type => (
                            <option key={type.idPaymentMethods} value={type.idPaymentMethods}>{type.description}</option>
                        ))}
                    </select>
                )
                break;
            case '4':
                filterComponent = (
                    <select className='form-control'>
                        {shippingTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                )


        }
    }



    return (
        <div className='row p-5'>
            <Title title='Pedidos' icon={<FaShoppingBag size={40} />} />
            <div className='col-6'>
                <div className='row'>
                    <div className='col-9'>
                        <select className='form-control' onChange={(e) => setFilter(e.target.value)}>
                            <option value='0'>Seleccione un filtro</option>
                            <option value='1'>Fecha</option>
                            <option value='2'>Cliente</option>
                            <option value='3'>Tipo de pago</option>
                            <option value='4'>Tipo de envío</option>
                        </select>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-success'>Limpiar</button>
                    </div>
                </div>
            </div>
            <div className='col-6'>
                {filter !== '' ? filterComponent : null}
            </div>
            <div className='col-12 mt-5'>
                <table className="table table-bordered table-striped">
                    <thead className="primary-color text-white">
                        <tr>
                            <th scope="col">N° de pedido</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Tipo de envío</th>
                            <th scope="col">Tipo de pago</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mauricio Romero</td>
                            <td>Local</td>
                            <td>Paypal</td>
                            <td>25/03/2020</td>
                            <td className='text-center'><button className='btn btn-success'>Ver mas</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mauricio Romero</td>
                            <td>Local</td>
                            <td>Paypal</td>
                            <td>25/03/2020</td>
                            <td className='text-center'><button className='btn btn-success'>Ver mas</button></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Mauricio Romero</td>
                            <td>Local</td>
                            <td>Paypal</td>
                            <td>25/03/2020</td>
                            <td className='text-center'><button className='btn btn-success'>Ver mas</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestTable;