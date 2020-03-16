import React from 'react';
import { MdPayment, MdLocalShipping, MdDateRange } from 'react-icons/md'
import BubbleIcon from '../../../components/BubbleIcon';

const OrderItem = () => {
    return (
        <div className='d-flex flex-col p-3 history-item m-2'>
            <div className='d-flex flex-row align-items-center justify-content-center '>
                <span className='text-black-50 m-1 font-lg'>Orden N° </span>
                <span className='text-black-75 font-lg'>00891729180</span>
            </div>
            <div className='d-flex flex-row m-1 justify-content-center'>
                <div className='flex-row justify-content-center align-items-center ml-0 m-1'>
                    <BubbleIcon icon={<MdDateRange />} /> 15/01/2020
            </div>
                <div className='flex-row justify-content-center align-items-center ml-0 m-1'>
                    <BubbleIcon icon={<MdLocalShipping />} /> Personalizado
            </div>
                <div className='flex-row justify-content-center align-items-center m-1'>
                    <BubbleIcon icon={<MdPayment />} /> Efectivo
            </div>
            </div>
        </div>
    );
};

export default OrderItem;