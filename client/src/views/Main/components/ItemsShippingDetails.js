import React from 'react';
import { MdRedeem } from 'react-icons/md';
import "../../../../src/styles/util.css";
import SumItemDetail from "../components/SumItemDetail";
import moment from 'moment'

const ItemsShippingDetails = ({ data }) => {
    return (
        <div className="container containerShipping">


            <div >
                <div className="Left mt-3">
                    <span className='text-black font-weight-bold mb-4 '>Número de orden: {data.idRequest} </span>
                </div>
                <div className="Left">
                    <span className='text-black Left font-weight-bold mb-4 '>Fecha del pedido:
                     {moment(data.emissionDate).format('DD/MM/YYYY')}
                    </span>
                </div>
                <div className="Left">
                    <span className='text-black Left font-weight-bold mb-4'>Subtotal: LPS. {data.subtotal}</span>
                    <p className='font-small alert alert-success m-2'>
                        Al procesar de nuevo este pedido, algunos precios pueden presentar una variacion segun los cargos que esten vigentes al momento de procesarse
                    </p>
                </div>

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