import React, { useEffect, useState } from "react";
import fresas from "../../../assets/img/fresas.png";
import { Link } from "react-router-dom";

const Image = ({ product }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
      <Link to={`product/${product.idProducts}`}>
        <div className="card p-2">
          <img src={fresas} alt={product.name} className="card-img-top " />
          <div className="card-body">
            <h5 className="card-title text-center">{product.name}</h5>
            <p className="card-text text-justify text-center">
              {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Image;
