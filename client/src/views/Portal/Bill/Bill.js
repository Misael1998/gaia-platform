import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import CaiBillContent from "./components/CaiBillContent";
import ProBillContent from "./components/ProBillContent";
import PDFBillView from "./components/PDFBillView";
import Spinner from "../../../components/Spinner";
import { FaClipboardCheck } from "react-icons/fa";
import {
  getCaiBillInfo,
  getProBillInfo,
  getBillType,
} from "../../../services/BillInfo";
import "./styles/bill.css";
import Swal from "sweetalert2";

const Bill = ({ match }) => {
  //State para mostrar el pdf:
  const [showPDF, setShowPDF] = useState(false);

  //State para guardar la info de la factura cai:
  const [CaiBillInfo, setCaiBillInfo] = useState({});

  //State para guardar la info de la factura pro:
  const [ProBillInfo, setProBillInfo] = useState({});

  //state para guardar el tipo de factura que es:
  const [billType, setBillType] = useState(false);

  //State para el spinner:
  const [loading, setLoading] = useState(true);

  //Funcion para envarle la factura al cliente:
  const sendBill = () => {
    alert("Enviando la factura al cliente!!!");
  };

  //Funcion para traer la data para mostrar en la factura:
  useEffect(() => {
    const { id } = match.params;

    //Aqui se hace el cambio del contenido segun sea el tipo de la factura:
    getBillType(id)
      .then((res) => {
        if (res === "c") {
          setBillType(true);
        } else {
          setBillType(false);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un problema al traer el tipo de factura.",
        });
      });

    //Obteniendo la informacion de las facturas:
    getCaiBillInfo(id)
      .then((res) => {
        setCaiBillInfo(res);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un problema al traer la información de la factura.",
        });
      });
    getProBillInfo(id)
      .then((res) => {
        setProBillInfo(res);
        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un problema al traer la información de la factura.",
        });
      });
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    if (showPDF) {
      return (
        <PDFBillView CaiBillInfo={""} ProBillInfo={""} billType={billType} />
      );
    } else {
      return (
        <div className="row p-main">
          <Title
            title="Factura del pedido"
            icon={<FaClipboardCheck size={40} />}
          />

          <div className="col-lg-12 mb-3">
            <button
              className="btn btn-lg btn-success float-right"
              onClick={() => setShowPDF(!showPDF)}
            >
              Guardar como PDF
            </button>

            <button
              className="btn btn-lg btn-success float-right mr-3"
              onClick={() => sendBill()}
            >
              Enviar al Cliente
            </button>
          </div>

          <div className="col-lg-12 p-4">
            <div className="containerShipping2 p-2">
              {billType ? (
                <CaiBillContent CaiBillInfo={CaiBillInfo} />
              ) : (
                <ProBillContent ProBillInfo={ProBillInfo} />
              )}
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Bill;
