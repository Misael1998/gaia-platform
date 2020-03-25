import React, {Fragment, useState} from 'react'
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import Title from '../../../components/Title';
import { useDispatch } from 'react-redux'
import { addPaymentType } from '../../../../src/actions/shippingActions';
import "../../../styles/FormLog.css";
import  "../../../styles/util.css"
import { MdCancel, MdCheckCircle, MdLocalShipping, MdPayment } from 'react-icons/md'

const FormPayment = ( {updateShowPayment} ) => {

    //Creando el state para leer el input:
  const [infoPayment, handleinfoPayment] = useState({
    paymentType: ""
    });


    //Configuracion de dispatch 
    const dispatch = useDispatch();
    const add_Payment_Type = () => {
    //Objeto a enviar al store
    let paymentType = {
      infoPayment
    }

    

    //Se despacha la accion
    dispatch(addPaymentType(paymentType))
  }

    //states para cada caso
    //state par leer inputs de paypal
  const [infoPaypal, handleinfoPaypal] = useState ({
    paymentType: "3",
    account: ""
  });

    //state para leer inputs de Credit Card
    const [infoCreditCard, handleinfoCreditCard] =useState({
      paymentType: "2",
      numberCard: "",
      expirationDate: "",
      ccv: ""
    });


    //state para mostrar info de la cuenta PAYPAL
    const [showPaypal, updateShowPaypal] =useState(false);
    //state para mostrar la info de la tarjeta
    const [showCreditCar, updateShowCreditCar] =useState(false);
    

    //extrayendo los valores con el desctructuring
    const {
        paymentType
    } = infoPayment;

    //extrayendo los valores con destructuring PAYPAL
    const {
      account
    } = infoPaypal;

    //extrayendo los valores con destructuring CREDIT CARD
    const {
      numberCard,
      expirationDate,
      ccv
    } = infoCreditCard;

    //funcion que se ejecuta cuando se escriba en el input
    const handleSavePayment = e => {

      updateShowPaypal(false);
      updateShowCreditCar(false);

      if (e.target.value==="0"){
        handleError(true);
        return;
      }

      if (e.target.value==="3"){
        updateShowPaypal(true);
      }

      if (e.target.value==="2"){
        updateShowCreditCar(true);
      }
      
        handleinfoPayment({
        ...infoPayment,
        [e.target.name]: e.target.value
        });

        handleError(false);
        
    };


    //funcion que se ejecuta cuando se escribe en PAYPAL

    const handleSavePaypal = e => {

      handleErrorPaypal(false);
      handleinfoPaypal({
        ...infoPaypal,
        [e.target.name]: e.target.value
        });

        
    };

    //funcion que se ejecuta cuando se escribe en Credit Card
    
    const handleSaveCreditCard = e => {

    
      handleinfoCreditCard({
        ...infoCreditCard,
        [e.target.name]: e.target.value
        });

        
    };


    //state para el error
     const [error, handleError] = useState(false);

    //state para el error en paypal
    const [errorPaypal, handleErrorPaypal] = useState(false);

    //state para el error en Credit Card
    const [errorCreditCard, handleErrorCreditCard] = useState(false);

  

    const submitPayment = e => {
        e.preventDefault();
    
        //validacion
        if (paymentType=== "") {
        handleError(true);
        return;
        }else{
          if(paymentType==="3"){
            if(account.trim()===""){
              handleErrorPaypal(true);
              return; 
            }
            
          }else{
            if (paymentType==="2"){
              if(numberCard.trim()==="" ||
                expirationDate.trim()==="" ||
                ccv.trim()===""
              ){
                handleErrorCreditCard(true);
                return;
              }
              
            }
          }
        }

       

        


        updateShowPayment(false);
        handleError(false);
        handleErrorPaypal(false);
        handleErrorCreditCard(false);
    
    };


    return ( 


        <Fragment>
             <div className='row p-5'>
            <Title icon={<FaMoneyCheckAlt size={40} />} title="Tipo de Pago" />
        </div>

        <div className="container ">

            <div className="col-lg-6 containerShipping">

            <form onSubmit={submitPayment} className="espaciado">

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
                    <option value="1">Efectivo</option>
                    <option value="2">Tarjeta de crédito</option>
                    <option value="3">Paypal</option>
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

              
              {showPaypal ? (<Fragment>
                {/*Parte de la paypal */}
                
                
              <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
              >
                
              <input
                className="input100"
                type="text"
                name="account"
                onChange={handleSavePaypal}
                placeholder="Cuenta de Paypal"
                value={account}
                
              />
              
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-book"></span>
              </span>
              
            </div>

            {errorPaypal ? (
                <p className="alert alert-danger error-p text-white">
                  Debe ingresar la cuenta de Paypal!!
                </p>
                ) : null}

            {/*Parte FIN de la tarjeta */}
            </Fragment>
              ) : null}

              {showCreditCar ? (<Fragment>
                {/*Parte de la tarjeta  de credito*/}
                
                <p className="alert alert-danger error-p text-white">
                  El soporte para tarjeta de créditos aún está en proceso!
                </p>

              {/* 
                <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
              >
                
              <input
                className="input100"
                type="text"
                name="numberCard"
                onChange={handleSaveCreditCard}
                placeholder="Número de Tarjeta"
                value={numberCard}
                
              />
              
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-book"></span>
              </span>
              
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
              >
                
              <input
                className="input100"
                type="date"
                name="expirationDate"
                onChange={handleSaveCreditCard}
                value={expirationDate}
                
              />
              
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-book"></span>
              </span>
              
            </div>

            <div
              className="wrap-input100 validate-input m-b-16"
              data-validate="Password is required"
              >
                
              <input
                className="input100"
                type="number"
                name="ccv"
                onChange={handleSaveCreditCard}
                placeholder="CCV"
                value={ccv}
                
              />
              
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <span className="lnr lnr-book"></span>
              </span>
              
            </div>

            {errorCreditCard ? (
                <p className="alert alert-danger error-p text-white">
                  Todos los campos deben ser llenados!!
                </p>
                ) : null}
              */}
              

           
            </Fragment>
              )  : null
              //fin de la tarjeta de credito
            }

                <div className="container-login100-form-btn p-t-1 botones">
                
                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

                <div className='mr-2'>

                    <button className='btn btn-success btn-lg'>

                        <MdCancel className='text-white mr-1' /> Cancelar

                    </button>

                </div>

                <div className='ml-2'>

                    <button className='btn btn-success btn-lg' onClick={add_Payment_Type}>

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