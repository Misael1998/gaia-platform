import React from "react";
import Title from "../../../components/Title";
import { MdShoppingBasket } from "react-icons/md";

const ProductList = () => {
  return (
    <div className="row p-5">
      <Title title="Productos" icon={<MdShoppingBasket size={40} />} />
      
      
      <div className="offset-10 col-2 mt-4">
        <button className="btn btn-large btn-success" >
            + Crear Nuevo Producto
        </button>
      </div>
      <div className="col-12 mt-2">
        <table className="table table-bordered table-striped">
          <thead className="primary-color text-white">
            <tr>
              <th scope="col">N° de producto</th>
              <th scope="col">Nombre del producto</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              
            </tr>
          </thead>
          <tbody className="">
           
              <tr key="sjjk">
                <th scope="row">1</th>
                <td>Albahaca Criolla</td>
                <td>Planta</td>
                <td>
                    <ul>Precio Restaurante: 25.0 LPS</ul>
                    <ul>Precio Hotel:25.0 LPS</ul>
                    <ul>Precio Super mercado: 25.0 LPS</ul>
                </td>
          
              </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
