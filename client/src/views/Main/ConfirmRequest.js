import React from 'react';
import Title from '../../components/Title';
import { FaClipboardCheck } from 'react-icons/fa'
import SummaryItem from './components/SummaryItem';
import BuySummary from './components/BuySummary';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'


const ConfirmRequest = () => {
    return (
        <div className='row p-5'>
            <Title title='Confirmación de pedido' icon={<FaClipboardCheck size={40} />} />
            <div className='col-12'>
                <div>
                    <h5>Se realizara el pedido con los siguientes datos:</h5>
                </div>
            </div>
            <div className='col-7 mt-3'>
                <div className='row'>
                    <div className='col-12'>
                        <ul className='list-group'>
                            <SummaryItem />
                            <SummaryItem />
                            <SummaryItem />
                        </ul>
                    </div>
                    <div className='col-12 mt-3'>
                        <div className='row'>
                            <div className='col-6 d-flex flex-row align-items-center justify-content-center'>
                                <span className='bubble-style primary-color text-white mr-2'>
                                    <MdLocalShipping />
                                </span>
                                <span className='font-weight-bold'>Tipo de envio:{' '} </span> Tipo de envio
                            </div>
                            <div className='col-6 d-flex flex-row align-items-center justify-content-center'>
                                <span className='bubble-style primary-color text-white mr-2'>
                                    <MdPayment />
                                </span>
                                <span className='font-weight-bold'>Tipo de pago:{' '} </span> Tipo de pago
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-4 offset-1'>
                <BuySummary />
            </div>
            <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>
                <div className='mr-2'>
                    <button className='btn btn-success btn-lg'>
                        <MdCancel className='text-white mr-1' /> Cancelar orden
                    </button>
                </div>
                <div className='ml-2'>
                    <button className='btn btn-success btn-lg'>
                        <MdCheckCircle className='text-white mr-1' /> Realizar pedido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRequest;