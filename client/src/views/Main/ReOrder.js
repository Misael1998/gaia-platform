import React, { useState, useEffect } from 'react';
import { FaClipboardCheck,FaRoute } from 'react-icons/fa'
import { MdPayment, MdLocalShipping, MdCheckCircle } from 'react-icons/md'
import Swal from 'sweetalert2'
import ItemsShippingDetails from './components/ItemsShippingDetails'
import Spinner from '../../components/Spinner'
import Title from '../../components/Title'
import { showRequestDetails } from '../../services/RequestDetails'
import { getDeliveryTypes, getPaymentTypes } from '../../services/Data'



const ReOrder = ({ match, history }) => {

    const [requestDetail, setRequestDetail] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [shippingTypes, setShippingTypes] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedShipping, setSelectedShipping] = useState('');
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const getData = async () => {
            const { id } = match.params;
            try {
                const details = await showRequestDetails(id);
                const { deliveryType, paymentMethod } = details[0]
                setRequestDetail(details);
                const shipping = await getDeliveryTypes();
                const value = shipping.find(type => type.name === deliveryType);
                setSelectedShipping(value.id);
                setShippingTypes(shipping);
                const payment = await getPaymentTypes();
                const payValue = payment.find(type => type.description === paymentMethod);
                setSelectedPayment(payValue.idPaymentMethods)
                setPaymentMethods(payment);
                setLoading(false);
    
            } catch (error) {
                Swal.fire(
                    'Error de conexion',
                    'Ocurrió un error al intentar conectar con el servidor',
                    'error')
            }
        }

        getData();
    }, [])

    if (loading) {
        return <Spinner />
    } else {
        return (
            <div className='row p-5'>
                <Title title='Confirmar pedido' icon={<FaClipboardCheck size={40} />} />
                <div className='col-7 mt-3'>
                    <div className='row'>
                        <div className='col-12'>
                            <ul className='list-group'>
                                <ItemsShippingDetails data={requestDetail} reorder />
                            </ul>
                        </div>
                    </div>
                </div>


                <div className='col-5 mt-3'>


                    <div className='d-flex flex-row align-items-center justify-content-center Left mb-4'>

                        <span className='bubble-style primary-color text-white mr-2 '>
                            <MdLocalShipping />
                        </span>
                        <select className='form-control' defaultValue={selectedShipping}>
                            {
                                shippingTypes.map(type => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))
                            }
                        </select>

                    </div>


                    <div className='d-flex flex-row align-items-center justify-content-center Left'>

                        <span className='bubble-style primary-color text-white mr-2 '>
                            <MdPayment />
                        </span>
                        <select className='form-control' defaultValue={selectedPayment}>
                            {
                                paymentMethods.map(type => (
                                    <option key={type.idPaymentMethods} value={type.idPaymentMethods}>{type.description}</option>
                                ))
                            }
                        </select>

                    </div>
                    <div className='d-flex flex-row align-items-center justify-content-center Left'>

                        <span className='bubble-style primary-color text-white mr-2 '>
                            <FaRoute />
                        </span>
                        <textarea
                            className='form-control'
                            placeholder='Direccion'

                        ></textarea>
                    </div>

                </div>

                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>
                    <div className='ml-2'>

                        <button className='btn btn-success btn-lg' >

                            <MdCheckCircle className='text-white mr-1' /> Realizar pedido

                    </button>

                    </div>

                </div>

            </div>
        );
    }
};

export default ReOrder;