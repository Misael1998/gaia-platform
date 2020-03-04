import React, { useState, useEffect } from "react";
import fruit from "../../assets/img/fresas.png";
import { MdAdd, MdRemove, MdShoppingBasket } from "react-icons/md";
import "./styles/main.css";
import Swal from "sweetalert2";
import Title from "../../components/Title";
import { getProductByID } from "../../services/Products";
import Spinner from "../../components/Spinner";

const ProductDetail = ({ match }) => {

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const { id } = match.params
    getProductByID(id)
      .then(res => { setProduct(res); setLoading(false); })
      .catch(err => {
        Swal.fire(
          'Oh oh',
          'Ocurrió un error al intentar conectar con el servidor',
          'error')
      });
  }, [])

  const substractQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1);
    } else {
      Swal.fire({
        icon: "error",
        title: "Cantidad minima",
        text: "La cantidad minima para agregar un producto es de uno"
      });
    }
  };

  const addQuantity = () => {
    setQuantity(prevState => prevState + 1);
  };

  if (loading) {
    return <Spinner />
  } else {

    return (
      <div className="row p-5">
        <Title
          icon={<MdShoppingBasket size={40} />}
          title="Detalle de producto"
        />
        <div className="col-3">
          <img src={fruit} alt="Fruta" className="img-fluid" />
        </div>
        <div className="col-9">
          <div className="row">
            <div className="col-12 mb-2">
              <h3>{product.productName}</h3>
            </div>
            <div className="col-12 mb-2">
              <h6 className='d-inline'>Categoria:</h6><span className="text-black-50 ml-2">{product.category}</span>
            </div>
            <div className="col-12">
            <h6 className='d-inline'>Descripcion: </h6>
              <span className="text-justify ml-1">
               {product.productDescription}
              </span>
            </div>
            <div className="col-12 mt-4 mb-4 text-center">
              <h4>LPS. {product.unit_price}</h4>
            </div>
            <div className="col-12 d-inline text-center ">
              <button
                className="btn btn-sm btn-success"
                onClick={substractQuantity}
              >
                <MdRemove size={30} />
              </button>
              <div className="form-control quantity-input">{quantity}</div>
              <button className="btn btn-sm btn-success" onClick={addQuantity}>
                <MdAdd size={30} />
              </button>
            </div>
            <div className="offset-3 col-6 mt-5">
              <button className="btn btn-block btn-success">
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default ProductDetail;
