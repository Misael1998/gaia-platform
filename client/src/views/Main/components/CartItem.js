import React from "react";
import { useDispatch } from "react-redux";
import { MdAdd, MdRemove, MdClose } from "react-icons/md";
import fruit from "../../../assets/img/fresas.png";
import {
  addQuantityToProduct,
  substractQuantityToProduct,
  removeProductFromCart,
} from "../../../actions/cartActions";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const add = () => dispatch(addQuantityToProduct(product.idProducts));
  const sub = () => dispatch(substractQuantityToProduct(product.idProducts));
  const deleteProduct = () =>
    dispatch(removeProductFromCart(product.idProducts));

  return (
    <div className="col-lg-10 col-sm-12 d-flex flex-row cart-item mt-3 mb-3">
      <div className="mr-2 ml-2">
        <img src={fruit} alt="fruta" className="cart-image" />
      </div>
      <div className="ml-2 mr-2">
        <h5>{product.productName}</h5>
        <p>{product.category}</p>
        <p>
          <span className="font-weight-bold m-1">Precio:</span>
          {product.unit_price}
        </p>
      </div>
      <div className="ml-3 mr-3  d-flex justify-content-center align-items-center">
        <h4 className="text-center">
          {product.quantity} {product.quantity === 1 ? "paquete" : "paquetes"}
        </h4>

        <div className="col-4 ml-3 mr-3 p-0">
          <button className="btn btn-success btn-sm mb-4 mr-3" onClick={add}>
            <MdAdd size={25} />
          </button>

          <button className="btn btn-success btn-sm" onClick={sub}>
            <MdRemove size={25} />
          </button>
        </div>
      </div>

      <div className="position-absolute right-0">
        <div
          className="primary-color app-header-icon-xs text-white"
          onClick={deleteProduct}
        >
          <MdClose size={30} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
