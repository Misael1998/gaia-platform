import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import BillContent from "./components/BillContent";
import PDFBillView from "./components/PDFBillView";
import { FaClipboardCheck } from "react-icons/fa";
import { showRequestDetails } from "../../../services/RequestDetails";
import "./styles/bill.css";

const Bill = ({ match }) => {
  //State para mostrar el pdf:
  const [showPDF, setShowPDF] = useState(false);

  //State para guardar la info de la factura:
  const [billInfo, setBillInfo] = useState({});

  //Funcion para envarle la factura al cliente:
  const sendBill = () => {
    alert("Enviando la factura al cliente!!!");
  };

  //Funcion para traer la data para mostrar en la factura:
  useEffect(() => {
    const { id } = match.params;
    showRequestDetails(id)
      .then((res) => {
        setBillInfo(res);
      })
      .catch((error) => {
        console.log("Ocurrio un error al conectar con el servidor");
      });
  }, []);

  if (showPDF) {
    return (
      <PDFBillView
        data={""}
        docTitle={"PILONES Y FLORED DE HONDURAS S.A. DE C.V"}
      />
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
            <BillContent />
          </div>
        </div>
      </div>
    );
  }
};

export default Bill;
