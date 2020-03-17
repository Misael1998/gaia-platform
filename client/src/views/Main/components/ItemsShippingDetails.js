import React from 'react';
import {MdRedeem} from 'react-icons/md';
import "../../../../src/styles/util.css";
import SumItemDetail from "../components/SumItemDetail";

const ItemsShippingDetails = () => {
    return (
        <div className="container containerShipping">
            
            <div className="Left mt-3">
                <span className='text-black font-weight-bold mb-4 '>Número de orden: </span>{' '} 57
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4 '>Fecha del pedido: </span>{' '} 16/03/2020
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4'>Subtotal: </span>{' '} LPS 300.00
            </div>
            <div className="Left mb-3">
                <span className='text-black Left font-weight-bold mb-4'>Detalle del pedido: </span> 
            </div>
            
            <div className='col-12 ContainerDetail'>
                <div className="ContainerDetail">
                    <div className='col-12 mb-3'>
                        <ul className='list-group'>
                            <SumItemDetail />
                            <SumItemDetail />
                            <SumItemDetail />
                        </ul>
                    </div>
                    
                </div>
            </div>
                

                  

        </div>
    );
};

export default ItemsShippingDetails;