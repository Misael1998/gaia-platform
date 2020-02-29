import React from 'react';
import { MdAdd, MdRemove } from 'react-icons/md'
import fruit from '../../../assets/img/fresas.png'

const CartItem = () => {
    return (
        <div className='d-flex flex-row cart-item mt-3 mb-3'>
            <div className='mr-2 ml-2'>
                <img src={fruit} alt='fruta' className='cart-image' />
            </div>
            <div className='ml-2 mr-2'>
                <h5>Nombre del producto</h5>
                <p>Categoria</p>
                <p>
                    <span className='font-weight-bold m-1'>
                        Precio:
                            </span>
                    L 150.00
                        </p>
            </div>
            <div className='ml-3 mr-3  d-flex justify-content-center align-items-center'>
                <h4 className='text-center'>1 paquete</h4>
            </div>
            <div className='ml-5 mr-4'>
                <div className='m-3'>
                    <button className='btn btn-success btn-sm'><MdAdd size={25} /></button>
                </div>
                <div className='m-3'>
                    <button className='btn btn-success btn-sm'><MdRemove size={25} /></button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;