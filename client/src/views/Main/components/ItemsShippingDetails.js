import React,{useEffect, useState} from 'react';
import {MdRedeem} from 'react-icons/md';
import "../../../../src/styles/util.css";
import {getRequestHistory} from "../../../services/RequestHistory"
import SumItemDetail from "../components/SumItemDetail";
import {showRequestDetails} from "../../../services/RequestDetails";

const ItemsShippingDetails = () => {

        //state para guardar el id del request
        const [idReq, setIdReq] = useState(0);
        const [requestDetails, handleRequestDetails]=useState([]);

        var reqId = 0;


        //creacion de variables para cada caso
        let numeroOrden,fechaPedido,subTotal;
      

        //Funcion para traer la info del inventario:
            useEffect(() => {
                getRequestHistory()
                .then(res => {

                    reqId = res[0].requests;
                    // setIdReq(reqId);
                    // console.log(idReq);
                    showRequestDetails(reqId).then(res2 => { 
                        console.log(res2);
                        numeroOrden=res2[0].idRequest;
                        fechaPedido=res2[0].emissionDate;
                        subTotal=res2[0].subtotal;

                        console.log(numeroOrden,fechaPedido,subTotal);

                        handleRequestDetails(res2);
                        console.log("Respuesta de  showRequestDetails: ", requestDetails);
                    })
                    console.log(numeroOrden,fechaPedido,subTotal);
                })
                .catch(err => console.log("El error es:", err));
            }, []);

    return (
        <div className="container containerShipping">
            
            <div className="Left mt-3">
                <span className='text-black font-weight-bold mb-4 '>Número de orden: </span>{numeroOrden} 
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4 '>Fecha del pedido: </span>{fechaPedido} 
            </div>
            <div className="Left">
                <span className='text-black Left font-weight-bold mb-4'>Subtotal: </span>{subTotal} 
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