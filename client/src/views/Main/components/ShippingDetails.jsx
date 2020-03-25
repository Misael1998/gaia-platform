import React,{Fragment, useState, useEffect} from 'react'
import Title from '../../../components/Title';
import { FaClipboardCheck } from 'react-icons/fa';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'
import ItemsShippingDetails from '../components/ItemsShippingDetails';
import "../../../styles/util.css"
import {getRequestHistory} from "../../../services/RequestHistory"
import {showRequestDetails} from "../../../services/RequestDetails";

const ShippingDetails = () => {

    //state para guardar el arreglo de los requests:
    const [requestDetails, handleRequestDetails]=useState([]);

    var reqId = 0;

    //Funcion para traer la info del inventario:
    useEffect(() => {
        getRequestHistory()
        .then(res => {

            let dim = res.length;

            reqId = res[dim-1].requests;
            showRequestDetails(reqId).then(res2 => { 
                handleRequestDetails(res2);
            })        
        })
        .catch(err => console.log("El error es:", err));
    }, []);

    return ( 
        <div className='row p-5'>

        <Title title='Detalle de pedido' icon={<FaClipboardCheck size={40} />} />

        <div className='col-12'>

            <div>

                <h5>Su pedido:</h5>

            </div>

        </div>

        <div className='col-7 mt-3'>

            <div className='row'>

                <div className='col-12'>

                    <ul className='list-group'>

                        <ItemsShippingDetails requestDetails={requestDetails}/>

                        

                    </ul>

                </div>

                
            </div>

        </div>


    <div className='col-4 offset-1 mt-3'>

                    
        <div className='d-flex flex-row align-items-center justify-content-center Left mb-4'>

            <span className='bubble-style primary-color text-white mr-2 '>

                <MdLocalShipping />

            </span>

                {requestDetails.map(registro => (
                    <span key={registro.idRequest} className='font-weight-bold mr-2'>Tipo de envio: {registro.deliveryType} </span> 
                ))}
                

        </div>


        <div className='d-flex flex-row align-items-center justify-content-center Left'>

                            <span className='bubble-style primary-color text-white mr-2 '>

                                <MdPayment />

                            </span>
                            {requestDetails.map(registro => (
                    <span key={registro.idRequest} className='font-weight-bold mr-2'>Tipo de Pago: {registro.paymentMethod} </span> 
                    ))}
                            

         </div>


        </div>

        <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

            

            <div className='ml-2'>

                <button className='btn btn-success btn-lg'>

                    <MdCheckCircle className='text-white mr-1' /> Volver a realizar el pedido 

                </button>

            </div>

        </div>

    </div>
     );
}
 
export default ShippingDetails;