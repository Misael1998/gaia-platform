import React from 'react';
import { FaRegTimesCircle, FaClipboardCheck } from 'react-icons/fa'
import Title from '../../components/Title'
import { Link } from 'react-router-dom';
const CancelRequest = () => {
    return (
        <div className='row p-5'>
            <Title title='Pago denegado' icon={<FaClipboardCheck size={40} />} />
            <div className='col-12 p-3'>
                <div className='text-center'>
                    <div className='m-3'>
                        <FaRegTimesCircle size={120} color='#e74c3c' />
                    </div>
                    <div className='m-3'>
                        <h3>Al parecer ocurrió un error al pagar el pedido</h3>
                        <h4>¡Lamentamos el inconveniente!</h4>
                    </div>
                    <div className='m-3'>
                        <Link to='/app/products' className='btn btn-danger btn-lg'>
                            Volver al catalogo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelRequest;