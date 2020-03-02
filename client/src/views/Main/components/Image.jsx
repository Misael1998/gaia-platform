import React, {useEffect} from 'react'
import fresas from '../../../assets/img/fresas.png';
import { getProducts } from "../../../services/Products";
import Spinner from "../../../components/Spinner";
import { map } from 'mssql';

const Image = () => {

  //State de los productos
  const [products, handleProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  //funcion
  useEffect(() => {
    getProducts()
      .then(res => {
        handleProducts(res);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
            {products.map(producto => (
                <div className="card p-2">
                    <img key={producto.id}  src={producto.imagen} alt={producto.nombre} className="card-img-top "  />
                    <div className="card-body">
                        <h5 className="card-title text-center">{producto.nombre}</h5>
                        <p className="card-text text-justify text-center">{producto.precio}</p>
                    </div>
                </div>
            ))}
        </div>
        
     );
  }
    
}
 
export default Image;