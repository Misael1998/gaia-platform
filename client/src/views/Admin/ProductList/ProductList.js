import React,{useState, useEffect} from "react";
import Swal from "sweetalert2";
import Title from "../../../components/Title";
import Spinner from "../../../components/Spinner";
import { MdShoppingBasket } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAllProductsData } from "../../../services/ProductsAdmin";

const ProductList = ( ) => {

  //State de los productos
  const [products, handleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //state para guardar los datos
  const [data, setData] = useState({
    productName: "",

    description: "",

    category: "",

    
  });

  //FUNCION AL AHCER CLICK EN VER MAS
  const captureData = () => {
    console.log("jejejeje");
  }

  //función para traer todos los productos
  useEffect(() => {
    getAllProductsData()
      .then((res) => {
        handleProducts(res);
        setLoading(false);
      })
      .catch((err) => console.log("El error es:", err));
  }, []);




  if (loading){
    return <Spinner />
  }else{
    return (
      <div className="row p-5">
        <Title title="Productos" icon={<MdShoppingBasket size={40} />} />
        
        
        <div className="offset-10 col-2 mt-4">
          <Link className="btn btn-success btn-block" to ={`formulario-productos`}>
              + Crear Nuevo Producto
          </Link>
        </div>
        <div className="col-12 mt-2">
          <table className="table table-bordered table-striped">
            <thead className="primary-color text-white">
              <tr>
                <th scope="col">N° de producto</th>
                <th scope="col">Nombre del producto</th>
                <th scope="col">Categoría</th>
                <th scope="col">Precio</th>
                <th scope="col"></th>
                
              </tr>
            </thead>
            <tbody className="">
             
            {products.map((product) => (
                      <tr key={product.idProduct} >
                      <th scope="row">{product.idProduct}</th>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>
                      {product.prices.map((asd) => (
                        
                        <ul>{asd.company}: {asd.unit_price} LPS</ul>

                      ))}
                      </td> 
                      <td>
                      <Link className="btn btn-success btn-block" to ={`productov`} onClick={captureData()}>
                        Ver más  
                      </Link>
                      </td>

                    </tr>
                    ))}
  
                
              
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  
};

export default ProductList;
