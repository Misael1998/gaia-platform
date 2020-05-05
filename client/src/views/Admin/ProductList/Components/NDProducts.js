import React, { useState, useEffect } from "react";
import Spinner from "../../../../components/Spinner";
import Title from "../../../../components/Title";
import { FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router-dom";
import EditProducts from "./EditProducts";
import NoneEditProducts from "./NoneEditProducts";


const NDProducts = () => {
  //State para alternar entre modo editar y ver info:

  const [goEdit, setGoEdit] = useState(false);

  //State para guardar los datos que vienen de la BD:

  const [data, setData] = useState({
    productName: "",

    description: "",

    category: "",

    address: "",

    phone: "",
  });

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

  
    return (
      <div className="row justify-content-center mt-2">
        <div className="container mt-5">
          <Title
            icon={<FiShoppingBag size={40} />}
            title="Producto"
          />
        </div>

        <div className="col-md-8 mt-3 containerShipping">
          {goEdit ? (
            <EditProducts data={data} />
          ) : (
            <NoneEditProducts data={data} />
          )}

          <div className="row justify-content-center mt-4">
            <Link
              to={'lista-productos'}
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
  
};

export default NDProducts;
