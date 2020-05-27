import React from "react";
import "../style/styleME.css";

const CardHello = ({ msg, user, numPed }) => {
  return (
    <div className="card card-hi mt-2">
      <div className="card-body text-center">
        <h3 className="card-title text-white">{msg}</h3>
        <p className="card-text-cus text-white">{user}</p>
        <h5 className="text-white">
          El número de pedidos para hoy es: {numPed}
        </h5>
      </div>
    </div>
  );
};

export default CardHello;
