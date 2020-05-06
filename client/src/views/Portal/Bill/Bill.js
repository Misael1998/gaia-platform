import React, { useState, useEffect } from "react";
import Title from "../../../components/Title";
import CaiBillContent from "./components/CaiBillContent";
import ProBillContent from "./components/ProBillContent";
import PDFBillView from "./components/PDFBillView";
import Spinner from "../../../components/Spinner";
import { FaClipboardCheck } from "react-icons/fa";
import { getBillInfo } from "../../../services/BillInfo";
import { sendBill } from "../../../services/SendBill";
import "./styles/bill.css";
import Swal from "sweetalert2";

const Bill = ({ match }) => {
  //State para mostrar el pdf:
  const [showPDF, setShowPDF] = useState(false);

  //State para guardar la informacion de la factura:
  const [billInfo, setBillInfo] = useState({});

  //state para guardar el tipo de factura que es:
  const [billType, setBillType] = useState(false);

  //State para el spinner:
  const [loading, setLoading] = useState(true);

  //Funcion para envarle la factura al cliente:
  const onClickHandler = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    sendBill(data)
      .then((res) => {
        Swal.fire(
          "Envio Exitoso..",
          "Se ha enviado la factura exitosamente",
          "success"
        );
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.title,
          text: error.text,
        });
      });
    //console.log("el nombre del archivo es", e.target.files[0]);
  };

  //Funcion para traer la data para mostrar en la factura:
  useEffect(() => {
    const { id } = match.params;

    getBillInfo(id)
      .then((res) => {
        if (res.type === "C") {
          setBillType(true);
        } else {
          setBillType(false);
        }

        setBillInfo(res);

        setLoading(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un problema al traer el tipo de factura.",
        });
      });
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    if (showPDF) {
      return <PDFBillView billInfo={billInfo} billType={billType} />;
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

            <label
              for="file-upload"
              className="btn btn-lg btn-success float-right mr-3"
            >
              Enviar al Cliente
            </label>
            <input
              className="d-none"
              id="file-upload"
              type="file"
              name="file"
              onChange={onClickHandler}
            />
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
  }
};

export default Bill;
