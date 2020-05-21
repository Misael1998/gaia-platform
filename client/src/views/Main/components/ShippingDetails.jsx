import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import { FaClipboardCheck } from "react-icons/fa";
import {
  MdCheckCircle,
  MdLocalShipping,
  MdPayment,
  MdLocationOn,
} from "react-icons/md";
import ItemsShippingDetails from "../components/ItemsShippingDetails";
import "../../../styles/util.css";
import { showRequestDetails } from "../../../services/RequestDetails";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const role = sessionStorage.getItem("role");

const ShippingDetails = ({ match }) => {
  const [requestDetail, setRequestDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { id } = match.params;
    showRequestDetails(id)
      .then((res) => {
        setRequestDetail(res);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire(
          "Error de conexion",
          "Ocurrió un error al intentar conectar con el servidor",
          "error"
        );
      });
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="row p-5">
        <Title
          title="Detalle de pedido"
          icon={<FaClipboardCheck size={40} />}
        />

        <div className="col-lg-5 col-sm-12 mt-3 info-reorder">
          <table className="table table-borderless table-striped  ">
            <tbody className="text-center">
              <tr>
                <td>
                  <span className="bubble-style primary-color text-white">
                    <MdLocalShipping />
                  </span>
                </td>
                <td>
                  <span className="font-weight-bold">Envio</span>
                </td>
                <td>{requestDetail.deliveryType}</td>
              </tr>
              <tr>
                <td>
                  <span className="bubble-style primary-color text-white">
                    <MdPayment />
                  </span>
                </td>
                <td>
                  <span className="font-weight-bold">Metodo de pago</span>
                </td>
                <td>{requestDetail.paymentMethod}</td>
              </tr>
              {requestDetail.deliveryDescription ? (
                <tr>
                  <td>
                    <span className="bubble-style primary-color text-white">
                      <MdLocationOn />
                    </span>
                  </td>
                  <td>
                    <span className="font-weight-bold">Ubicacion</span>
                  </td>
                  <td>{requestDetail.deliveryDescription}</td>
                </tr>
              ) : null}
            </tbody>
          </table>

          {role !== "employee" ? (
            <div className="mt-4">
              <p className="font-small alert alert-success m-2">
                Al procesar de nuevo este pedido, algunos precios pueden
                presentar una variacion segun los cargos que esten vigentes al
                momento de procesarse
              </p>
            </div>
          ) : null}
        </div>

        <div className="col-lg-7 col-sm-12 mt-3">
          <div className="row">
            <div className="col-12">
              <ul className="list-group">
                <ItemsShippingDetails data={requestDetail} role={role} />
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 text-center d-flex flex-row justify-content-center mt-5">
          {role !== "employee" ? (
            <div className="ml-2">
              <Link
                className="btn btn-success btn-lg"
                to={`reorder/${requestDetail.idRequest}`}
              >
                <MdCheckCircle className="text-white mr-1" /> Volver a realizar
                el pedido
              </Link>
            </div>
          ) : (
            <div className="ml-2">
              <Link
                className="btn btn-success btn-lg"
                to={`facturacion/${requestDetail.idRequest}`}
              >
                <MdCheckCircle className="text-white mr-1" /> Generar Factura
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default ShippingDetails;
