import React from 'react';
import { MdRedeem } from 'react-icons/md';
import "../../../../src/styles/util.css";
import SumItemDetail from "../components/SumItemDetail";
import moment from 'moment'

const ItemsShippingDetails = ({ data }) => {
    console.log(data[0])
    return (
        <div className="container containerShipping">


            <div >
                <div className="Left mt-3">
                    <span className='text-black font-weight-bold mb-4 '>Número de orden: {data[0].idRequest} </span>
                </div>
                <div className="Left">
                    <span className='text-black Left font-weight-bold mb-4 '>Fecha del pedido:
                     {moment(data[0].emissionDate).format('DD/MM/YYYY')}
                    </span>
                </div>
                <div className="Left">
                    <span className='text-black Left font-weight-bold mb-4'>Subtotal: LPS. {data[0].subtotal}</span>
                    
                </div>

            </div>


            <div className="Left mb-3">
                <span className='text-black Left font-weight-bold mb-4'>Detalle del pedido: </span>
            </div>

            <div className='col-12 ContainerDetail'>
                <div className="ContainerDetail">
                    <div className='col-12 mb-3'>
                        <ul className='list-group'>
                            {
                                data.map(info => (
                                    <SumItemDetail key={info.idRequest} data={info} />

                                ))
                            }
                        </ul>
                    </div>

                </div>
            </div>




        </div>
    );
};

export default ItemsShippingDetails;