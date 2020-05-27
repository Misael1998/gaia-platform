import React, { Fragment, useState, useEffect } from 'react'
import { FaMoneyCheckAlt } from "react-icons/fa";
import Title from '../../../components/Title';
import { useDispatch } from 'react-redux'
import { addPaymentType } from '../../../../src/actions/shippingActions';
import "../../../styles/FormLog.css";
import "../../../styles/util.css"
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { deleteCart } from '../../../actions/cartActions'
import { cancelOrder } from '../../../modules/helper';
import { getPaymentTypes } from '../../../services/Data';
import Swal from 'sweetalert2'
import Spinner from '../../../components/Spinner';

const FormPayment = ({ history }) => {

  //Creando el state para leer el input:
  const [infoPayment, handleinfoPayment] = useState({
    paymentType: ""
  });

  const [paymentTypes, setPaymentTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPaymentTypes()
      .then(res => { setPaymentTypes(res); setLoading(false) })
      .catch(async (error) => {
        await Swal.fire('Error de conexion', 'Ocurrio un error en el servidor', 'error')
        history.goBack();
      })
  }, [])

  //state para el error
  const [error, handleError] = useState(false);

  //extrayendo los valores con el desctructuring
  const {
    paymentType
  } = infoPayment;

  


  //Configuracion de dispatch 
  const dispatch = useDispatch();
  const submitPayment = () => {

    //validacion
    if (paymentType === "") {
      handleError(true);
      return;
    } else {
     
    }
    
    let paymentObject = paymentTypes.find(type => type.idPaymentMethods === Number(infoPayment.paymentType))
    //Objeto a enviar al store
    let savePaymentType = {
      'payment': paymentObject,
    }
    //Se despacha la accion
    dispatch(addPaymentType(savePaymentType))
    handleError(false);

    history.push('/app/cart/confirm')

  }




  //funcion que se ejecuta cuando se escriba en el input
  const handleSavePayment = e => {

    

    if (e.target.value === "0") {
      handleError(true);
      return;
    }


    handleinfoPayment({
      ...infoPayment,
      [e.target.name]: e.target.value
    });

    handleError(false);

  };





  if (loading) {
    return <Spinner />
  } else {

    return (


      <Fragment>
        <div className='row p-5'>
          <Title icon={<FaMoneyCheckAlt size={40} />} title="Tipo de Pago" />
        </div>

        <div className="container ">

          <div className="col-lg-6 containerShipping">

            <div className="espaciado">

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
                  
                  {
                    paymentTypes.map(type => (
                      <option key={type.idPaymentMethods} value={type.idPaymentMethods}>{type.description}</option>
                    ))
                  }
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


             

              <div className="container-login100-form-btn p-t-1 botones">

                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

                  <div className='mr-2'>

                    <button className='btn btn-success btn-lg' onClick={() => cancelOrder(dispatch, deleteCart, history)}>

                      <MdCancel className='text-white mr-1' /> Cancelar

                      </button>

                  </div>

                  <div className='ml-2'>

                    <button className='btn btn-success btn-lg' onClick={submitPayment}>

                      <MdCheckCircle className='text-white mr-1' /> Siguiente

                      </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


      </Fragment>


    );
  }
}




export default FormPayment;