import React, { useState, useEffect } from "react";
import logo from "../../../../assets/img/logo.png";
import "../styles/bill.css";
import { Table } from "@david.kucsai/react-pdf-table";
import moment from "moment";

const ProBillContent = ({ billInfo }) => {
  //State para guardar los productos
  const [prod, setProd] = useState([]);

  useEffect(() => {
    setProd(billInfo.products);
  }, []);

  let cont = 0;

  for (var i = 0; i < prod.length; i++) {
    cont = cont + parseInt(prod[i].importTotal, 10);
  }

  return (
    <div className="billHeader">
      <div className="row">
        <div className="col-lg-6 p-r-0 m-t-5">
          <img className="billLogo" src={logo} />
        </div>
        <div className="col-lg-6 p-r-0 m-t-5">
          <p className="txt-h-b text-center">PILONES Y FLORES DE HONDURAS</p>
          <p className="txt-h-b txt-sa">S.A DE C.V</p>
        </div>
      </div>

      <div className="row r-a mt-4">
        <div className="col-lg-6 p-r-0">
          <span className="row">
            <label className="txt-info-c txt-b">PARA:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              {billInfo.nameClient}
            </p>
          </span>
        </div>
        <div className="col-lg-6 p-r-0">
          <span className="row">
            <label className="txt-info-c txt-b">FACTURA #:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              {billInfo.numBill}
            </p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">FECHA:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              {moment(billInfo.emissionDate).format("DD/MM/YYYY")}
            </p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">FECHA VENCIMIENTO:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              {moment(billInfo.emissionDate).add(7, "d").format("DD/MM/YYYY")}
            </p>
          </span>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="primary-color text-white text-center">
          <tr>
            <th>ARTÍCULO</th>
            <th>CANTIDAD</th>
            <th>PRECIO</th>
            <th>IMPORTE</th>
          </tr>
        </thead>
        <tbody>
          {billInfo.products.map((reg) => (
            <tr>
              <th className="text-center">{reg.nameProduct}</th>
              <th className="text-center">{reg.quantity}</th>
              <th className="text-center">{reg.price} LPS.</th>
              <th className="text-center">{reg.importTotal} LPS.</th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row">
        <div className="col-lg-6"></div>

        <div className="col-lg-6">
          <div className="containerShipping2 pay-info-cont">
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">TOTAL PARCIAL L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">TOTAL L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info text-center">{cont} Lps.</p>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div className="row mt-4 mb-3">
        <span className="col-lg-6"></span>
        <span className="col-lg-6">
          <div className="containerGreen">
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">SALDO DEUDOR L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ProBillContent;
