import React,{Fragment} from 'react'
import Title from '../../../components/Title';
import { FaClipboardCheck } from 'react-icons/fa';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'
import ItemsShippingDetails from '../components/ItemsShippingDetails';
import "../../../styles/util.css"

const ShippingDetails = () => {
    return ( 
        <div className='row p-5'>

        <Title title='Detalle de pedido' icon={<FaClipboardCheck size={40} />} />

        <div className='col-12'>

            <div>

                <h5>Su pedido:</h5>

            </div>

        </div>

        <div className='col-7 mt-3'>

            <div className='row'>

                <div className='col-12'>

                    <ul className='list-group'>

                        <ItemsShippingDetails />

                        

                    </ul>

                </div>

                
            </div>

        </div>


    <div className='col-4 offset-1 mt-3'>

                    
        <div className='d-flex flex-row align-items-center justify-content-center Left mb-4'>

            <span className='bubble-style primary-color text-white mr-2 '>

                <MdLocalShipping />

            </span>

                <span className='font-weight-bold mr-2'>Tipo de envio: {' '} </span> Tipo de envio

        </div>


        <div className='d-flex flex-row align-items-center justify-content-center Left'>

                            <span className='bubble-style primary-color text-white mr-2 '>

                                <MdPayment />

                            </span>

                            <span className='font-weight-bold mr-2'>Tipo de Pago:{' '} </span> Tipo de pago

         </div>


        </div>

        <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

            

            <div className='ml-2'>

                <button className='btn btn-success btn-lg'>

                    <MdCheckCircle className='text-white mr-1' /> Volver a realizar el pedido 

                </button>

            </div>

        </div>

    </div>
     );
}
 
export default ShippingDetails;