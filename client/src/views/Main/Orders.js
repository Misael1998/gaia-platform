import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import { GoPackage } from 'react-icons/go'
import OrderItem from './components/OrderItem';
import { MdClose } from 'react-icons/md';
import { getRequestHistory } from '../../services/RequestHistory';
import Swal from 'sweetalert2';
import Spinner from  '../../components/Spinner'


const Orders = ({ history }) => {

    const [filter, setFilter] = useState('');
    const [requestHistory, setRequestHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRequestHistory()
            .then(res => { setRequestHistory(res); setLoading(false); })
            .catch(async (error) => {
                await Swal.fire('Error de conexión', 'Ocurrió un error al conectarse al servidor', 'error');
                history.goBack();
            })
    }, [])

    let filterComponent;

    if (filter !== '' && filter === 'date') {
        filterComponent = (
            <div className='row p-2'>
                <div className='col-12 mt-1'>
                    Fecha inicio
                    <input type='date' placeholder='Fecha inicio' className='form-control' />
                </div>
                <div className='col-12 mt-2'>
                    Fecha fin
                    <input type='date' placeholder='Fecha fin' className='form-control' />
                </div>
            </div>
        )
    } else if (filter === 'order') {
        filterComponent = (
            <input type='text' placeholder='N° de Orden' className='form-control' />
        )
    }

    if (loading) {
        return <Spinner/>
    } else {

        

        return (
            <div className='row p-5'>
                <Title title='Mis pedidos' icon={<GoPackage size={40} />} />
                <div className='offset-1 col-6 text-center'>
                    {
                        requestHistory.length !== 0 ? 
                        requestHistory.map(item => (
                            <OrderItem key={item.requests} data={item}/>
                        )):
                        <h3>No tiene historial de pedidos</h3>
                    }
                </div>
                <div className='col-4'>
                    <div className='row'>
                        <div className='col-12 text-center d-flex flex-row justify-content-around m-2 '>
                            <h5>Filtrar por</h5>
                            {filter !== '' ?
                                <span
                                    className='btn btn-sm btn-success'
                                    onClick={() => setFilter('')}
                                >
                                    <MdClose />
                                </span>
                                : null}
                        </div>
                        <div className='col-12'>
                            <label className='d-flex flex-row align-items-center list-group-item'>
                                <input
                                    type='radio'
                                    className='form-control mr-2'
                                    name='filter'
                                    value='date'
                                    checked={filter === 'date'}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <span>Fecha de pedido</span>
                            </label>
                        </div>
                        <div className='col-12'>
                            <label className='d-flex flex-row align-items-center list-group-item'>
                                <input
                                    type='radio'
                                    className='form-control mr-2'
                                    name='filter'
                                    value='order'
                                    checked={filter === 'order'}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <span>N° de orden</span>
                            </label>
                        </div>
                        <div className='col-12 mt-3'>
                            {filterComponent}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Orders;