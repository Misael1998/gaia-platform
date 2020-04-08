import React, { useState, useEffect } from 'react'
import Title from '../../../components/Title';
import { FaClipboardCheck } from 'react-icons/fa';
import { MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'
import ItemsShippingDetails from '../components/ItemsShippingDetails';
import "../../../styles/util.css"
import { showRequestDetails } from "../../../services/RequestDetails";
import Swal from 'sweetalert2'
import {Link} from 'react-router-dom'
import Spinner from '../../../components/Spinner';

const ShippingDetails = ({ match, history }) => {

    const [requestDetail, setRequestDetail] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id } = match.params;
        showRequestDetails(id)
            .then(res => {
                setRequestDetail(res);
                setLoading(false);
            })
            .catch(error => {
                Swal.fire(
                    'Error de conexion',
                    'Ocurrió un error al intentar conectar con el servidor',
                    'error')
            })
    }, [])


    if (loading) {
        return <Spinner />
    } else {

        return (
            <div className='row p-5'>

                <Title title='Detalle de pedido' icon={<FaClipboardCheck size={40} />} />


                <div className='col-7 mt-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <ul className='list-group'>
                                <ItemsShippingDetails data={requestDetail} />
                            </ul>
                        </div>
                    </div>
                </div>


                <div className='col-4 offset-1 mt-3'>


                    <div className='d-flex flex-row align-items-center justify-content-center Left mb-4'>

                        <span className='bubble-style primary-color text-white mr-2 '>

                            <MdLocalShipping />
                        </span>
                        <span className='font-weight-bold mr-1'>
                            Envio:
                        </span>
                        {requestDetail.deliveryType}
                    </div>


                    <div className='d-flex flex-row align-items-center justify-content-center Left'>

                        <span className='bubble-style primary-color text-white mr-2 '>

                            <MdPayment />

                        </span>

                        <span className='font-weight-bold mr-1'>
                            Metodo de pago: {'  '}
                        </span>  {requestDetail.paymentMethod}


                    </div>
                    <div className='mt-4'>
                        <p className='font-small alert alert-success m-2'>
                            Al procesar de nuevo este pedido, algunos precios pueden presentar una variacion segun los cargos que esten vigentes al momento de procesarse
                        </p>
                    </div>


                </div>

                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>



                    <div className='ml-2'>

                        <Link className='btn btn-success btn-lg' to={`reorder/${requestDetail.idRequest}`}>

                            <MdCheckCircle className='text-white mr-1' /> Volver a realizar el pedido

                    </Link>

                    </div>

                </div>

            </div>
        );
    }
}



export default ShippingDetails;