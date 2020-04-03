import React from "react";
import "../styles/style.css";

const NoneEditIndividual = ({ data }) => {
  return (
    <div className="container-nonEdit">
      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-user txt-info icon-info">
            <span className="spn-icon">Usuairo</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-envelope txt-info icon-info">
            <span className="spn-icon">Correo</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.email}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-phone-handset txt-info icon-info">
            <span className="spn-icon">Teléfono</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.phone}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-home txt-info icon-info">
            <span className="spn-icon">Dirección</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.address}</p>
        </div>
      </div>
    </div>
  );
};

export default NoneEditIndividual;
