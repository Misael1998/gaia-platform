import React from 'react';
import { MdPayment, MdLocalShipping, MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'
import BubbleIcon from '../../../components/BubbleIcon';
import moment from 'moment'

const OrderItem = ({ data }) => {
    return (
        <div className='d-flex flex-col p-3 history-item m-2'>
            <Link to={`request/${data.requests}`}>
                <div className='d-flex flex-row align-items-center justify-content-center '>
                    <span className='text-black-50 m-1 font-lg'>Orden N° </span>
                    <span className='text-black-75 font-lg'>{data.requests}</span>
                </div>
                <div className='d-flex flex-row m-1 justify-content-center'>
                    <div className='flex-row justify-content-center align-items-center ml-0 m-1'>
                        <BubbleIcon icon={<MdDateRange />} /> {moment(data.emissionDate).format('DD/MM/YYYY')}
                    </div>
                    <div className='flex-row justify-content-center align-items-center ml-0 m-1'>
                        <BubbleIcon icon={<MdLocalShipping />} /> {data.deliveryType}
                    </div>
                    <div className='flex-row justify-content-center align-items-center m-1'>
                        <BubbleIcon icon={<MdPayment />} /> {data.paymentMethods}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default OrderItem;