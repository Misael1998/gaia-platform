import React from "react";

const NoneEditProducts = ({ product }) => {
  return (
    <div className="container-nonEdit">
      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-store txt-info icon-info">
            <span className="spn-icon">Producto:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{product.name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-pencil txt-info icon-info">
            <span className="spn-icon">Descripción:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{product.description}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-menu txt-info icon-info">
            <span className="spn-icon">Categoría:</span>
          </span>
        </div>


        {product.prices.map((reg) => (
        <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-pencil txt-info icon-info">
            <span className="spn-icon">{reg.companyDescription}:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{reg.price}</p>
        </div>
      </div>
      ))}

          
        
      </div>

      
    </div>
  );
};

export default NoneEditProducts;
