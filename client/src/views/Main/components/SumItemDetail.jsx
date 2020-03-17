import React from 'react';
import {MdRedeem} from 'react-icons/md'

const SumItemDetail = () => {
    return (
        <li className='list-group-item d-flex flex-row align-items-center'>
            <div className='bubble-style primary-color mr-2'>
                <MdRedeem className='text-center text-white' size={20}/>
            </div>
            <div>
                <span className='text-black font-weight-bold'>Producto: </span>{' '} Nombre
            </div>
            <div>
                <span className='text-black font-weight-bold '>Cantidad: </span>{' '} Cantidad
            </div>
            <div>
                <span className='text-black font-weight-bold '>Precio: </span>{' '} Precio
            </div>
        </li>
    );
};

export default SumItemDetail;