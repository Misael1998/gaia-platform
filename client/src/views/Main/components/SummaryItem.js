import React from 'react';
import {MdRedeem} from 'react-icons/md'

const SummaryItem = ({name, quantity, price}) => {
    return (
        <li className='list-group-item d-flex flex-row align-items-center'>
            <div className='bubble-style primary-color mr-2'>
                <MdRedeem className='text-center text-white' size={20}/>
            </div>
            <div>
                <span className='text-black font-weight-bold'>Producto: </span>{' '} {name}
            </div>
            <div>
                <span className='text-black font-weight-bold ml-4'>Cantidad: </span>{' '} {quantity}
            </div>
            <div>
                <span className='text-black font-weight-bold ml-4'>Precio: </span>{' '} {price}
            </div>
        </li>
    );
};

export default SummaryItem;