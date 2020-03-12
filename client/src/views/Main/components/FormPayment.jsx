import React, {Fragment, useState} from 'react'
import { FaMoneyCheckAlt } from "react-icons/fa";
import Title from '../../../components/Title';
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'

const FormPayment = ( {updateShowPayment} ) => {

    //Creando el state para leer el input:
  const [infoPayment, handleinfoPayment] = useState({
    paymentType: ""
    });


    //extrayendo los valores con el desctructuring
    const {
        paymentType
    } = infoPayment;

    //funcion que se ejecuta cuando se escriba en el input
    const handleSavePayment = e => {
        handleinfoPayment({
        ...infoPayment,
        [e.target.name]: e.target.value
        });
    };


    //state para el error
     const [error, handleError] = useState(false);

  

    const submitPayment = e => {
        e.preventDefault();
    
        //validacion
        if (paymentType=== "") {
        handleError(true);
        return;
        }


        updateShowPayment(false);
        handleError(false);
    
    };


    return ( 


        <Fragment>
             <div className='row p-5'>
            <Title icon={<FaMoneyCheckAlt size={40} />} title="Tipo de Pago" />
        </div>

        <div className="container ">

            <div className="col-lg-6">

            <form onSubmit={submitPayment}>

            <h3 className="mb-4">Selecciona el Tipo de pago:</h3>

              <div
                  className="wrap-input100 validate-input m-b-16"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <select
                    className="input100"
                    type="text"
                    onChange={handleSavePayment}
                    name="paymentType"
                    value={paymentType} 
                    
                  >
                    <option value="0">Seleccione el tipo de pago</option>
                    <option value="1">Tipo 1</option>
                    <option value="2">Tipo 2</option>
                    <option value="3">Tipo 3</option>
                  </select>

                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <span className="lnr lnr-cart"></span>
                  </span>
                </div>

                {error ? (
                <p className="alert alert-danger error-p text-white">
                  Debe Seleccionar el tipo de pago
                </p>
                ) : null}

                <div className="container-login100-form-btn p-t-25">
                
                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

                <div className='mr-2'>

                    <button className='btn btn-success btn-lg'>

                        <MdCancel className='text-white mr-1' /> Cancelar

                    </button>

                </div>

                <div className='ml-2'>

                    <button className='btn btn-success btn-lg'>

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
 
export default FormPayment;