import React from 'react'

const NoneEditProducts = ({data}) => {
    return ( 
        <div className="container-nonEdit">
      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-store txt-info icon-info">
            <span className="spn-icon">Producto:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.productName}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-pencil txt-info icon-info">
            <span className="spn-icon">Descripción:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.description}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-menu txt-info icon-info">
            <span className="spn-icon">Categoría:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.category}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-apartment txt-info icon-info">
            <span className="spn-icon">Precio Hotel:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.address}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-coffee-cup txt-info icon-info">
            <span className="spn-icon">Precio Restaurante:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.contact_name}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-5 p-r-0 p-l-0">
          <span className="lnr lnr-cart txt-info icon-info">
            <span className="spn-icon">Precio Supermercado:</span>
          </span>
        </div>

        <div className="col-md-7 p-l-30">
          <p className="txt-info">{data.contact_number}</p>
        </div>
      </div>
    </div>
     );
}
 
export default NoneEditProducts;