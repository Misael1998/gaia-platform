import React from "react";
import "../styles/style.css";

const NoneEdit = ({ data }) => {
  return (
    <div className="container-nonEdit">
      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-user txt-info icon-info">
            <span className="spn-icon">Usuario</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.company_name}</p>
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

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-user txt-info icon-info">
            <span className="spn-icon">Nombre de Contacto</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.contact_name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-phone-handset txt-info icon-info">
            <span className="spn-icon">Número de Contacto</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.contact_number}</p>
        </div>
      </div>
    </div>
  );
};

export default NoneEdit;
