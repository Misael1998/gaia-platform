import React from "react";

const NoneEditProducts = ({ product }) => {
  return (
    <div className="">
      <div className="row mt-4">
        <div className="col-lg-6">
          <span className="lnr lnr-store txt-info icon-info">
            <span className="spn-icon">Producto:</span>
          </span>
        </div>

        <div className="col-lg-6">
          <p className="txt-info">{product.name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <span className="lnr lnr-pencil txt-info icon-info">
            <span className="spn-icon">Descripción:</span>
          </span>
        </div>

        <div className="col-lg-6">
          <p className="txt-info">{product.description}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <span className="lnr lnr-menu txt-info icon-info">
            <span className="spn-icon">Categoría:</span>
          </span>
        </div>

        <div className="col-lg-6">
          <p className="txt-info">{product.categoryName}</p>
        </div>
      </div>

      {product.prices.map((reg) => (
        <div className="row mt-4">
          <div className="col-lg-6">
            <span className="lnr lnr-apartment txt-info icon-info">
              <span className="spn-icon">{reg.companyDescription}:</span>
            </span>
          </div>

          <div className="col-lg-6">
            <p className="txt-info">{reg.price} LPS</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoneEditProducts;
