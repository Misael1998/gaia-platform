import React,{useEffect, useState} from 'react';
import {MdRedeem} from 'react-icons/md';
import "../../../../src/styles/util.css";
import {getRequestHistory} from "../../../services/RequestHistory"
import SumItemDetail from "../components/SumItemDetail";
import {showRequestDetails} from "../../../services/RequestDetails";

const ItemsShippingDetails = ({requestDetails}) => {

        
      

    

    return (
        <div className="container containerShipping">

            {requestDetails.map(registro => (
                <div key={registro.idRequest}>
                    <div className="Left mt-3">
                <span className='text-black font-weight-bold mb-4 '>Número de orden: {registro.idRequest}</span>  
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4 '>Fecha del pedido: {registro.emissionDate}</span>
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4'>Subtotal: {registro.subtotal}</span> 
            </div>
                </div>
            ))}
            
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