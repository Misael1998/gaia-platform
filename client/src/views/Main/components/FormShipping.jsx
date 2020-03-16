import React, { Fragment, useState } from 'react';
import "../../../styles/util.css";
import { FaShippingFast } from "react-icons/fa";
import Title from '../../../components/Title';
import { useDispatch } from 'react-redux'
import { addShippingType } from '../../../../src/actions/shippingActions';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'

const FormShipping = ({updateShowShipping}) => {

    //Creando el state para leer el input:
  const [infoShipping, handleinfoShipping] = useState({
      ShippingType: ""
  });



  //Configuracion de dispatch 
  const dispatch = useDispatch();
  const add_Shipping_Type = () => {
    //Objeto a enviar al store
    let shippingType = {
      infoShipping
    }
    //Se despacha la accion
    dispatch(addShippingType(shippingType))
  }


  


  //extrayendo los valores con el desctructuring
  const {
    ShippingType
  } = infoShipping;


  //funcion que se ejecuta cuando se escriba en el input
  const handleSaveShipping = e => {
    handleinfoShipping({
      ...infoShipping,
      [e.target.name]: e.target.value
      
    });

    if(e.target.value==="0"){
      handleError(true);
      return;
    }
    handleError(false);
  };


   //state para el error
   const [error, handleError] = useState(false);

  

   const submitShipping = e => {
     e.preventDefault();
 
     //validacion
     if (ShippingType=== "") {
       handleError(true);
       return;
     }


     updateShowShipping(false);
     handleError(false);
 
   };

  

    return ( 

        <Fragment>
             <div className='row p-5'>
            <Title icon={<FaShippingFast size={40} />} title="Tipo de Envío" />
        </div>

        <div className="container">

          <div className="col-lg-6 containerShipping">

            <form onSubmit={submitShipping} className="espaciado">

            <h3 className="mb-4">Selecciona el Tipo de Envío:</h3>

              <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <select
                    className="input100"
                    type="text"
                    onChange={handleSaveShipping}
                    name="ShippingType"
                    value={ShippingType} 
                    
                  >
                    <option value="0">Seleccione el tipo de envío</option>
                    <option value="1">Tipo 1</option>
                    <option value="2">Tipo 2</option>
                    <option value="3">Tipo 3</option>
                  </select>

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-home"></span>
                  </span>
                </div>

                {error ? (
                <p className="alert alert-danger error-p text-white">
                  Debe Seleccionar el tipo de envío
                </p>
                ) : null}

                <div className="container-login100-form-btn p-t-1  botones">
                
                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

                <div className='mr-2'>

                    <button className='btn btn-success btn-lg'>

                        <MdCancel className='text-white mr-1' /> Cancelar

                    </button>

                </div>

                <div className='ml-2'>

                    <button className='btn btn-success btn-lg' onClick={add_Shipping_Type}>

                        <MdCheckCircle className='text-white mr-1' /> Siguiente

                    </button>

                </div>

                </div>
                
              </div>


            </form>

        </div>

        
                  

            </div>
            
        
        </Fragment>
       
     );
}
 
export default FormShipping;