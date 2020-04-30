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
          <div className="containerShipping2 row m-l-5 p-2">
            <span className="col-lg-12">N° ORDEN DE COMPRA EXENTA</span>
            <span className="col-lg-12">
              N° CONSTANCIA DE REGISTRO DE EXONERADO
            </span>
            <span className="col-lg-12">N° REGISTRO DE LA SAG</span>
          </div>

          <div className="col-12">
            <hr className="hr-sign" />
            <p className="text-center m-0 p-0">FIRMA AUTORIZADA</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="containerShipping2 pay-info-cont p-3">
            <span className="row">
              <div className="col-lg-6">DESCUENTOS OTORGADOS L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">REBAJAS OTORGADAS L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">FLETE L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">SUB-TOTAL L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">IMPORTE EXENTO L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">IMPORTE GRAVADO 18% L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">IMPORTE GRAVADO 15% L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">TASA ALÍCUOTA L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">I.S.V 15% L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">I.S.V 18% L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">IMOPRTE EXONERADO L.</div>
              <div className="col-lg-6"></div>
            </span>
            <span className="row">
              <div className="col-lg-6">TOTAL A PAGAR L.</div>
              <div className="col-lg-6"></div>
            </span>
          </div>
        </div>
      </div>

      <div className="row">
        <span>
          <p className="txt-num-fac">FACTURA N° 000-111-22-33 444444</p>
        </span>
      </div>
    </div>
  );
};

export default BillContent;
