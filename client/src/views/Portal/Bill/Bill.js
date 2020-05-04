import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import CaiBillContent from "./components/CaiBillContent";
import ProBillContent from "./components/ProBillContent";
import PDFBillView from "./components/PDFBillView";
import { FaClipboardCheck } from "react-icons/fa";
import { getBillInfo } from "../../../services/BillInfo";
import { getBillType } from "../../../services/BillType";
import "./styles/bill.css";

const Bill = ({ match }) => {
  //State para mostrar el pdf:
  const [showPDF, setShowPDF] = useState(false);

  //State para guardar la info de la factura:
  const [billInfo, setBillInfo] = useState({});

  //state para guardar el tipo de factura que es:
  const [billType, setBillType] = useState(false);

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
        console.log("Ocurrio un error al conectar con el servidor");
      });

    //Obteniendo la informacion de la factura:
    getBillInfo(id)
      .then((res) => {
        setBillInfo(res);
      })
      .catch((error) => {
        console.log("Ocurrio un error al conectar con el servidor");
      });
  }, []);

  if (showPDF) {
    return <PDFBillView data={""} billType={billType} />;
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
              <CaiBillContent billInfo={billInfo} />
            ) : (
              <ProBillContent billInfo={billInfo} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Bill;
