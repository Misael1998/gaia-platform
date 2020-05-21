import React, { Fragment, useState, useEffect } from 'react';
import "../../../styles/util.css";
import { FaShippingFast } from "react-icons/fa";
import Title from '../../../components/Title';
import { useDispatch } from 'react-redux'
import { addShippingType } from '../../../../src/actions/shippingActions';
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { cancelOrder } from '../../../modules/helper'
import { deleteCart } from '../../../actions/cartActions';
import { getDeliveryTypes } from '../../../services/Data';
import Spinner from '../../../components/Spinner'
import Swal from 'sweetalert2';

let customShipping;

const FormShipping = ({ updateShowShipping, history }) => {

  //Creando el state para leer el input:
  const [infoShipping, handleinfoShipping] = useState({
    ShippingType: ""
  });

  const [loading, setLoading] = useState(true);
  const [shippingTypes, setShippingTypes] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [address, setAddress] = useState('');
  const [errorP,handleErrorP] =useState(false);



  useEffect(() => {
    getDeliveryTypes()
      .then(res => {
        setShippingTypes(res);
        customShipping = res.find(type => type.name === 'Personalizado').id
        setLoading(false)
      })
      .catch(async (err) => {
        await Swal.fire('Error de conexion', 'Ocurrio un error en el servidor', 'error')
        history.goBack();
      })
  }, [])

  //extrayendo los valores con el desctructuring
  const {
    ShippingType
  } = infoShipping;

  //Configuracion de dispatch 
  const dispatch = useDispatch();
  const submitShipping = () => {
    //validacion
    if (ShippingType === "") {
      handleError(true);
      return;
    }

    if (address===""){
      handleErrorP(true);
      return;
    }

    
    //Objeto a enviar al store
    let shippingObject = shippingTypes.find(type => type.id === Number(infoShipping.ShippingType))
    shippingObject = {...shippingObject, address}

    //Se despacha la accion
    dispatch(addShippingType(shippingObject))

    updateShowShipping(false);
    handleError(false);
  }




  const handleSaveShipping = e => {
    handleinfoShipping({
      ...infoShipping,
      [e.target.name]: e.target.value

    });

    const address ="";
    
    if(Number(e.target.value) === customShipping){
      setShowInput(true);

      if(address === "") {
        handleErrorP(true);
        handleError(false);
        return;
      }

    }else {
      setShowInput(false);
      handleErrorP(false);
    }

    if (e.target.value === "0") {
      handleError(true);
      return;
    }
    handleError(false);
  };


  //state para el error
  const [error, handleError] = useState(false);



  if (loading) {
    return <Spinner />
  } else {
    return (

      <Fragment>
        <div className='row p-5'>
          <Title icon={<FaShippingFast size={40} />} title="Tipo de Envío" />
        </div>

        <div className="container">

          <div className="col-lg-6 containerShipping">

            <div className="espaciado">

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
                  {shippingTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>

                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <span className="lnr lnr-home"></span>
                </span>
              </div>

              {
                showInput ? (
                  <div
                    className="wrap-input100 validate-input m-b-16"
                    data-validate="Password is required"
                  >
                   

                    <input
                      className="input100"
                      type="text"
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Direccion de envio"
                      value={address}

                    />

                  

                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <span className="lnr lnr-location"></span>
                    </span>

                  </div>


                ) : null
              }

                  {errorP ? (
                    <p className="alert alert-danger error-p text-white">
                      Debe llenar el campo
                    </p>
                  ) : null}

              {error ? (
                <p className="alert alert-danger error-p text-white">
                  Debe Seleccionar el tipo de envío
                </p>
              ) : null}

              <div className="container-login100-form-btn p-t-1  botones">

                <div className='col-12 text-center d-flex flex-row justify-content-center mt-5'>

                  <div className='mr-2'>

                    <button className='btn btn-success btn-lg' onClick={() => cancelOrder(dispatch, deleteCart, history)}>

                      <MdCancel className='text-white mr-1' /> Cancelar

                    </button>

                  </div>

                  <div className='ml-2'>

                    <button className='btn btn-success btn-lg' onClick={submitShipping}>

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

export default FormShipping;