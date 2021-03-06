import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Title from "../../../components/Title";
import { Link } from "react-router-dom";

const Cartg = ({ match }) => {
  const cart = useSelector((state) => state.cart.cart);
  let sum = 0,
    isv = 0,
    sumExcent = 0,
    sumGrav = 0;

  cart.forEach((product) => {
    sum += product.unit_price * product.quantity;
    if (product.sarType === "E") {
      sumExcent += product.unit_price * product.quantity;
    } else {
      sumGrav += product.unit_price * product.quantity;
    }
  });
  sum = sum.toFixed(2);
  sumExcent = sumExcent.toFixed(2);
  sumGrav = sumGrav.toFixed(2);
  isv = (sum * 0.15).toFixed(2);
  let total = (Number(sum) + Number(isv)).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="row p-5">
        <Title icon={<MdShoppingCart size={40} />} title="Carrito" />
        <div className="col-12">
          <h4>No hay productos en el carrito actualmente</h4>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row p-5">
        <Title icon={<MdShoppingCart size={40} />} title="Carrito" />
        <div className="col-lg-8 col-md-8 col-sm-12">
          {cart.map((product) => (
            <CartItem key={product.idProducts} product={product} />
          ))}
        </div>
        <div className="col-lg-4 col-md-4 col-sm-12">
          <div className="mb-4">
            <h4 className="text-center">Resumen de compra</h4>
          </div>
          <div className="mb-2">
            <span className="font-weight-bold m-r-170">Subtotal:</span>L{sum}
          </div>
          <div className="mb-2">
            <span className="font-weight-bold m-r-173">ISV 15%:</span>L {isv}
          </div>
          <div className="mb-2">
            <span className="font-weight-bold m-r-173">ISV 18%:</span>L 0.00
          </div>
          <div className="mb-2">
            <span className="font-weight-bold m-r-135">Total Excento:</span>L
            {sumExcent}
          </div>
          <div className="mb-2">
            <span className="font-weight-bold m-r-130">Total Gravado:</span>L
            {sumGrav}
          </div>
          <div>
            <hr />
          </div>
          <div className="mt-3 text-center fa-lg">
            <span className="font-weight-bold ">Total:</span> L {total}
          </div>
          <div className="mt-5">
            <Link
              className="btn btn-success btn-block"
              to={`${match.path}/shipping`}
            >
              Proceder con el pago
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Cartg;
