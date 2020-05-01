import React from "react";
import logo from "../../../../assets/img/logo.png";
import "../styles/bill.css";
import { Table } from "@david.kucsai/react-pdf-table";

const BillContent = () => {
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
      <div className="row r-a">
        <div className="col-lg-6 p-r-0">
          <p className="txt-2bill">
            Puede hacer su depósito a nombre de PYFLOR en
          </p>
          <p className="txt-2bill">Banco Ficohsa: 001-101-408834</p>
          <p className="txt-2bill">
            Banco Banpais Cuenta de Cheque: 015990008396
          </p>
          <p className="txt-2bill txt-b">
            CAI: XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX-XXXXXX
          </p>
        </div>
        <div className="col-lg-6 p-r-0">
          <p className="txt-2bill txt-r">
            Aldea El Molino, Contiguo a Campo Scout, Valle de Angeles, F.M
          </p>
          <p className="txt-2bill txt-r">
            Tel: (504) 2221-9747, Cel: (504) 9958-3362
          </p>
          <p className="txt-2bill txt-r">representantelegal.pyflor@gmail.com</p>
          <p className="txt-2bill txt-r txt-b">R.T.N: 08239006014946</p>
        </div>
      </div>
      <div className="row r-i">
        <div className="col-lg-6 p-r-0">
          <span className="row">
            <label className="txt-info-c txt-b">CLIENTE:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">Juan Perez</p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">R.T.N:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">08011900112233</p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">DIRECCIÓN:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">
              Res. C.A Bloque 22
            </p>
          </span>
        </div>
        <div className="col-lg-6 p-r-0">
          <span className="row">
            <label className="txt-info-c txt-b">FECHA DEL DÍA:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">29/4/2020</p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">FECHA VENCIMIENTO:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">3/5/2020</p>
          </span>
          <span className="row">
            <label className="txt-info-c txt-b">VENDEDOR:</label>
            <p className="txt-info-c col-lg-6 p-l-3 p-r-0">PYFLOR</p>
          </span>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="primary-color text-white text-center">
          <tr>
            <th>CANT.</th>
            <th>DESCRIPCIÓN</th>
            <th>P. UNITARIO</th>
            <th>DESCUENTOS Y REBAJAS OTORGADOS</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="text-center">4</th>
            <th className="text-center">Tomate Cherry</th>
            <th className="text-center">20 LPS.</th>
            <th className="text-center"></th>
            <th className="text-center">80 LPS.</th>
          </tr>
          <tr>
            <th className="text-center">5</th>
            <th className="text-center">Papaya</th>
            <th className="text-center">40 LPS.</th>
            <th className="text-center"></th>
            <th className="text-center">200 LPS.</th>
          </tr>
          <tr>
            <th className="text-center" colSpan="2">
              La Factura es beneficio de todos "EXIJALA"
            </th>
            <th className="text-center">TOTAL L.</th>
            <th className="text-center"></th>
            <th className="text-center">280 LPS.</th>
          </tr>
        </tbody>
      </table>

      <div className="row">
        <div className="col-lg-6">
          <div className="containerShipping2">
            <div className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">N° ORDEN DE COMPRA EXENTA</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">N° CONSTANCIA REGISTRO EXONERADO</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">N° REGISTRO DE LA SAG</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <hr className="hr-sign" />
            <p className="text-center m-0 p-0">FIRMA AUTORIZADA</p>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="containerShipping2 pay-info-cont">
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">DESCUENTOS OTORGADOS L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">REBAJAS OTORGADAS L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">FLETE L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">SUB-TOTAL L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">IMPORTE EXENTO L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">IMPORTE GRAVADO 18% L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">IMPORTE GRAVADO 15% L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">TASA ALÍCUOTA L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">I.S.V 15% L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">I.S.V 18% L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">IMOPRTE EXONERADO L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
            <span className="row">
              <div className="col-lg-6 verticalLine">
                <p className="p-bill-info">TOTAL A PAGAR L.</p>
              </div>
              <div className="col-lg-6">
                <p className="p-bill-info"></p>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <span>
          <p className="txt-num-fac">FACTURA N° 000-111-22-33 444444</p>
        </span>
      </div>
    </div>
  );
};

export default BillContent;
