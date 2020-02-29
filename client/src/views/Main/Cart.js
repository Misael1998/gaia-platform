import React from 'react';
import { MdShoppingCart } from 'react-icons/md';
import CartItem from './components/CartItem';
import Title from './components/Title';


const Cart = () => {
    return (
        <div className='row p-5'>
            <Title icon={<MdShoppingCart size={40} />} title='Carrito' />
            <div className='col-12 mt-4 '>
                <div className='row'>
                    <div className='col-8'>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </div>
                    <div className='col-4'>
                        <div className='mb-4'>
                            <h4 className='text-center'>Resumen de compra</h4>
                        </div>
                        <div className='mb-2'>
                            <span className='font-weight-bold m-r-170'>Subtotal:</span>
                            L 150.00
                        </div>
                        <div className='mb-2'>
                            <span className='font-weight-bold m-r-173'>ISV 15%:</span>
                            L 22.50
                        </div>
                        <div className='mb-2'>
                            <span className='font-weight-bold m-r-173'>ISV 18%:</span>
                            L 0.00
                        </div>
                        <div className='mb-2'>
                            <span className='font-weight-bold m-r-135'>Total Excento:</span>
                            L 0.00
                        </div>
                        <div className='mb-2'>
                            <span className='font-weight-bold m-r-130'>Total Gravado:</span>
                            L 0.00
                        </div>
                        <div>
                            <hr />
                        </div>
                        <div className='mt-3 text-center fa-lg'>
                            <span className='font-weight-bold '>Total:</span> L 172.50
                        </div>
                        <div className='mt-5'>
                            <button className='btn btn-success btn-block'>Proceder con el pago</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;