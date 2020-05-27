import React from 'react';
import Title from '../../components/Title'
import { FaRegCheckCircle, FaClipboardCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom';
const SuccessRequest = () => {
    return (
        <div className='row p-5'>
            <Title title='Pago exitoso' icon={<FaClipboardCheck size={40} />} />
            <div className='col-12 p-3'>
                <div className=' text-center'>
                    <div className='m-3'>
                        <FaRegCheckCircle size={120} color='#27ae60' />
                    </div>
                    <div className='m-3'>
                        <h3>¡Tu pedido ha sido pagado con exito!</h3>
                        <h4>¡Gracias por comprar en PYFLOR!</h4>
                    </div>
                    <div className='m-3'>
                        <Link to='/app/products' className='btn btn-success btn-lg'>
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessRequest;