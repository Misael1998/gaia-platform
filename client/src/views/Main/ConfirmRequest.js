import React, { useState } from 'react';
import Title from '../../components/Title';
import { FaClipboardCheck } from 'react-icons/fa'
import SummaryItem from './components/SummaryItem';
import BuySummary from './components/BuySummary';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment, MdChevronRight } from 'react-icons/md'
import BubbleIcon from '../../components/BubbleIcon';
import { useSelector, useDispatch } from 'react-redux';
import { cancelOrder } from '../../modules/helper';
import { deleteCart } from '../../actions/cartActions'
import { Redirect } from 'react-router-dom';
import { createRequest } from '../../services/Request';
import Swal from 'sweetalert2'



const ConfirmRequest = ({ history }) => {

    const [loading, setLoading] = useState(false);
    const [paypalButton, setPaypalButton] = useState(false);
    const [paypalURL, setPaypalURL] = useState('');

    const requestInfo = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { shippingType, paymentType, cart } = requestInfo;


    if (cart.length === 0) {
        return <Redirect to='/app/products' />
    }

    let paymentString = paymentType.payment.description
    let shippingString = shippingType.name

    let sum = 0, isv = 0, sumExcent = 0, sumGrav = 0;

    cart.forEach(product => {
        sum += product.unit_price * product.quantity
        if (product.sarType === 'E') {
            sumExcent += product.unit_price * product.quantity;
        } else {
            sumGrav += product.unit_price * product.quantity;
        }
    })

    sum = sum.toFixed(2);
    sumExcent = sumExcent.toFixed(2);
    sumGrav = sumGrav.toFixed(2);
    isv = (sum * 0.15).toFixed(2);
    let total = (Number(sum) + Number(isv)).toFixed(2);

    const sendRequest = () => {
        setLoading(true);
        createRequest(requestInfo)
            .then(async (res) => {
                setLoading(false);
                if (res.code === 1) {
                    await Swal.fire(
                        'Pedido creado',
                        'Tu pedido fue procesado exitosamente',
                        'success'
                    )
                    dispatch(deleteCart());
                    history.push('/app/products')
                } else if (res.code === 2) {
                    dispatch(deleteCart());
                    setPaypalURL(res.paypal.url)
                    await Swal.fire('Pedido creado', 'Tu pedido se ha creado procede con el pago', 'success');
                    setPaypalButton(true);

                }

                
            })
            .catch(error => {
                setLoading(false);
                Swal.fire({
                    icon: "error",
                    title: error.title,
                    text: error.text
                });
            })
    }

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
                            {
                                cart.map(product => (
                                    <SummaryItem
                                        key={product.idProducts}
                                        name={product.productName}
                                        price={product.unit_price}
                                        quantity={product.quantity}
                                    />
                                ))
                            }

                        </ul>
                    </div>
                    <div className='col-12 mt-3'>
                        <div className='row'>
                            <div className='col-6 d-flex flex-row align-items-center justify-content-center'>
                                <BubbleIcon icon={<MdLocalShipping />} />
                                <span className='font-weight-bold mr-1'>Tipo de envio:{' '} </span> {shippingString}

                            </div>
                            <div className='col-6 d-flex  align-items-center justify-content-center'>
                                <BubbleIcon icon={<MdPayment />} />
                                <span className='font-weight-bold mr-1'>Tipo de pago: </span> {paymentString}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-4 offset-1'>
                <BuySummary total={total} isv15={isv} excent={sumExcent} grav={sumGrav} subtotal={sum} />
            </div>
            <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>
                <div className='mr-2'>
                    <button className='btn btn-success btn-lg' disabled={loading} onClick={() => cancelOrder(dispatch, deleteCart, history)}>
                        <MdCancel className='text-white mr-1' /> Cancelar orden
                    </button>
                </div>
                <div className='ml-2'>
                    {
                        paypalButton && paypalURL !== '' ? (
                            <a href={paypalURL} className='btn btn-success btn-lg' >
                                Pagar pedido <MdChevronRight className='text-white ml-1' />
                            </a>) :
                            <button className='btn btn-success btn-lg' onClick={sendRequest} disabled={loading}>
                                {
                                    loading ?
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
};

export default ConfirmRequest;