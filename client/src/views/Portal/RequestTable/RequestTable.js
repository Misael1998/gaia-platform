import React, { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import { FaShoppingBag } from 'react-icons/fa'
import { getPaymentTypes, getDeliveryTypes } from '../../../services/Data';
import Swal from 'sweetalert2';
import Spinner from '../../../components/Spinner';
import moment from 'moment'
import { getRequestData } from '../../../services/Request';
import { Link } from 'react-router-dom';

const RequestTable = ({match}) => {

    const [filter, setFilter] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [shippingTypes, setShippingTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {

        getRequestData()
            .then(res => {
                setRequestData(res);
                setFilterData(res);
            })
            .catch(async (err) => {
                await Swal.fire('Error de conexion', 'Ocurrio un error al conectar al servidor', 'error')
                window.location.href = 'portal/'
            })
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

    const filterByDate = () => {
        if (initialDate.trim() === '' && finalDate.trim() === '') {
            setError(true);
            return;
        }

        setError(false);
        const requestByDate = requestData.filter(data => {
            const momentI = moment(initialDate);
            const momentF = moment(finalDate);
            if (moment(data.emission_date).isBetween(momentI, momentF)) {
                return data
            }
        })
        setFilterData(requestByDate);
    }

    const cleanData = () => {
        setFilter('0');
        setInitialDate('');
        setFinalDate('');
        setFilterData(requestData);
    }

    const filterValue = (e) => {
        let filterByValue = requestData;
        switch (e.target.name) {
            case 'client':
                let regex = new RegExp(e.target.value, 'i');
                filterByValue = requestData.filter(data => {
                    if (regex.test(data.client)) {
                        return data
                    }
                })
                break;
            case 'payment':
                if (e.target.value !== '0')
                    filterByValue = requestData.filter(data => {
                        if (data.paymentMethod === e.target.value) {
                            return data
                        }
                    })
                break;
            case 'shipping':
                if (e.target.value !== '0')
                    filterByValue = requestData.filter(data => {
                        if (data.deliveryType === e.target.value) {
                            return data;
                        }
                    })
                break;

        }
        setFilterData(filterByValue);
    }

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
                            onClick={filterByDate}
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
                    <input name='client' placeholder='Nombre de cliente' className='form-control' onChange={filterValue} />
                )
                break;
            case '3':
                filterComponent = (
                    <select className='form-control' name='payment' onChange={filterValue}>
                        <option value='0'>Seleccione una opcion</option>
                        {paymentMethods.map(type => (
                            <option key={type.idPaymentMethods} value={type.description}>{type.description}</option>
                        ))}
                    </select>
                )
                break;
            case '4':
                filterComponent = (
                    <select className='form-control' name='shipping' onChange={filterValue}>
                        <option value='0'>Seleccione una opcion</option>
                        {shippingTypes.map(type => (
                            <option key={type.id} value={type.name}>{type.name}</option>
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
                        <select className='form-control' value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value='0'>Seleccione un filtro</option>
                            <option value='1'>Fecha</option>
                            <option value='2'>Cliente</option>
                            <option value='3'>Tipo de pago</option>
                            <option value='4'>Tipo de envío</option>
                        </select>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-success' onClick={cleanData}>Limpiar</button>
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
                        {
                            filterData.map(request => (
                                <tr key={request.idRequest}>
                                    <td>{request.idRequest}</td>
                                    <td>{request.client}</td>
                                    <td>{request.deliveryType}</td>
                                    <td>{request.paymentMethod}</td>
                                    <td>{moment(request.emission_date).format('DD/MM/YYYY')}</td>
                                    <td className='text-center'>
                                        <Link className='btn btn-success' to={`request-summary/details/${request.idRequest}`}>Ver mas</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestTable;