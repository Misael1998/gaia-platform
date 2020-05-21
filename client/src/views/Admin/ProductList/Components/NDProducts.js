import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Spinner from "../../../../components/Spinner";
import Title from "../../../../components/Title";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import EditProducts from "./EditProducts";
import NoneEditProducts from "./NoneEditProducts";
import { getProductByID2 } from "../../../../services/Products";

const NDProducts = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  //State para alternar entre modo editar y ver info
  const [goEdit, setGoEdit] = useState(false);

  //State para guardar los datos que vienen de la BD:

  //componente didmount
  useEffect(() => {
    const { id } = match.params;
    getProductByID2(id)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire(
          "Oh",
          "Ocurrió un error al intentar conectar con el servidor.",
          "error"
        );
      });
  }, []);

  /* useEffect(() => {
    getIndividualData()
      .then((res) => {
        setData(res);

        setLoading(false);
      })

      .catch((err) => console.log(err));
  }, []); */

  //Funcion para editar:

  const goToEdit = () => {
    setGoEdit(true);
  };

  //Funcion para ver info:

  const goToInfo = () => {
    setGoEdit(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="row justify-content-center mt-2">
        <div className="container mt-5">
          <Title icon={<FiShoppingBag size={40} />} title="Producto" />
        </div>

        <div className="col-md-8 mt-3  container-edit">
          {goEdit ? (
            <EditProducts product={product} />
          ) : (
            <NoneEditProducts product={product} />
          )}
          <div className="row justify-content-center mt-4">
            <Link
              to={"/admin/lista-productos"}
              type="button"
              className="btn btn-lg btn-success btn-perfil m-r-10 mb-4"
            >
              Regresar
            </Link>

            <button
              onClick={goToEdit}
              type="button"
              className="btn btn-lg btn-success btn-edit m-l-10 mb-4"
            >
              Editar Información
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default NDProducts;
