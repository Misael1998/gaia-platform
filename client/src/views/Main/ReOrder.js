import React, { useState, useEffect } from 'react';
import { FaClipboardCheck, FaRoute } from 'react-icons/fa'
import { MdPayment, MdLocalShipping, MdCheckCircle, MdChevronRight } from 'react-icons/md'
import Swal from 'sweetalert2'
import moment from 'moment'
import ItemsShippingDetails from './components/ItemsShippingDetails'
import Spinner from '../../components/Spinner'
import Title from '../../components/Title'
import { showRequestDetails } from '../../services/RequestDetails'
import { createRequest } from '../../services/Request.js'
import { getDeliveryTypes, getPaymentTypes } from '../../services/Data'



let shippingAddress;

const ReOrder = ({ match, history }) => {
    
    const [requestDetail, setRequestDetail] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [shippingTypes, setShippingTypes] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedShipping, setSelectedShipping] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [address, setAddress] = useState('');
    const [disableAddress, setDisableAddress] = useState(true);
    const [paypalButton, setPaypalButton] = useState(false);
    const [paypalURL, setPaypalURL] = useState('');


    useEffect(() => {

        const getData = async () => {
            const { id } = match.params;
            try {
                const details = await showRequestDetails(id);
                const { deliveryType, paymentMethod } = details
                setRequestDetail(details);
                const shipping = await getDeliveryTypes();
                const value = shipping.find(type => type.name === deliveryType);
                shippingAddress = shipping.find(type => type.name === 'Personalizado').id
                setSelectedShipping(value.id);
                setShippingTypes(shipping);
                const payment = await getPaymentTypes();
                const payValue = payment.find(type => type.description === paymentMethod);

                setSelectedPayment(payValue.idPaymentMethods)
                setPaymentMethods(payment);
                setLoading(false);

            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error de conexion',
                    'Ocurrió un error al intentar conectar con el servidor',
                    'error')
            }
        }

        getData();
    }, [])

    const changeShipping = (e) => {
    
        if(Number(e.target.value) === shippingAddress){
            setDisableAddress(false);
        }else {
            setDisableAddress(true);
        }
        setSelectedShipping(e.target.value)
    }

    const sendRequest = () => {
        setLoadingButton(true);
        const products = requestDetail.products.map(info => ({
            product: info.idProduct,
            quantity: info.quantity
        }))

        const payment = paymentMethods.find(type => type.idPaymentMethods === Number(selectedPayment));
       
        const requestInfo = {
            emissionDate: moment().format('YYYY-MM-DD'),
            products,
            shipping: 0.00,
            requestType: '1',
            deliveryType: selectedShipping,
            payment,
            deliveryDescription: address,
        }

        createRequest(requestInfo, 1)
            .then(async (res) => {
                setLoadingButton(false);
                if (res.code === 1) {
                    await Swal.fire(
                        'Pedido creado',
                        'Tu pedido fue procesado exitosamente',
                        'success'
                    )
                    history.push('/app/products')
                } else if (res.code === 2) {
                    setPaypalURL(res.paypal.url)
                    await Swal.fire('Pedido creado', 'Tu pedido se ha creado procede con el pago', 'success');
                    setPaypalButton(true);

                }
            })
            .catch(error => {
                setLoadingButton(false);
                Swal.fire({
                    icon: "error",
                    title: error.title,
                    text: error.text
                });
            })
    }


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
                        <select className='form-control' defaultValue={selectedShipping} onChange={changeShipping}>
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
                        <select className='form-control' defaultValue={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
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
                            disabled={disableAddress}
                            className='form-control'
                            placeholder='Direccion'
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                        ></textarea>
                    </div>

                </div>

                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>
                    <div className='ml-2'>
                        {paypalButton && paypalURL !== '' ? (
                            <a href={paypalURL} className='btn btn-success btn-lg' >
                                Pagar pedido <MdChevronRight className='text-white ml-1' />
                            </a>) :
                            <button className='btn btn-success btn-lg' onClick={sendRequest} disabled={loadingButton}>
                                {
                                    loadingButton ?
                                        (<div className="spinner-border text-light" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>) :
                                        (<><MdCheckCircle className='text-white mr-1' /> Realizar pedido</>)
                                }
                            </button>
                        }

                    </div>

                </div>

            </div>
        );
    }
};

export default ReOrder;