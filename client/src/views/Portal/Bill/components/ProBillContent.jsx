import React from "react";
import logo from "../../../../assets/img/logo.png";
import "../styles/bill.css";
import { Table } from "@david.kucsai/react-pdf-table";

const ProBillContent = ({ ProBillInfo }) => {
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
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">Juan Perez</p>
          </span>
        </div>
        <div className="col-lg-6 p-r-0">
          <span className="row">
            <label className="txt-info-c txt-b">FACTURA #:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              000-111-22-33 444444
            </p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">FECHA:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">1/5/2020</p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">FECHA VENCIMIENTO:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">3/5/2020</p>
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
          <tr>
            <th className="text-center">Tomate Cherry</th>
            <th className="text-center">4</th>
            <th className="text-center">20 LPS.</th>
            <th className="text-center"></th>
          </tr>
          <tr>
            <th className="text-center">Papaya</th>
            <th className="text-center">5</th>
            <th className="text-center">40 LPS.</th>
            <th className="text-center"></th>
          </tr>
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
                <p className="p-bill-info"></p>
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
