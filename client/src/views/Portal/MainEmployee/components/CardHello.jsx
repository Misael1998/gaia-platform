import React from "react";
import "../style/styleME.css";

const CardHello = ({ msg, user, numPed }) => {
  return (
    <div class="card card-hi mt-2 mb-1">
      <div class="card-body text-center">
        <h4 class="card-title text-white">{msg}</h4>
        <p class="card-text text-white">{user}</p>
        <h6 className="text-white">
          El número de pedidos para hoy es: {numPed}
        </h6>
      </div>
    </div>
  );
};

export default CardHello;
