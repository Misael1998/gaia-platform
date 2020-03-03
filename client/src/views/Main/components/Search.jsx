import React, { useState, useEffect } from "react";
import ImgList from "./ImgList";
import { getProducts } from "../../../services/Products";
import Spinner from "../../../components/Spinner";

const Search = () => {
    //State de los productos
    const [products, handleProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [term, saveTerm] = useState({ nombreProd: "", category: "" });
    
    //state para la busqueda filtrada
    const [filter, handleFilter] =useState ([]);

    //extrayendo los valores con el desctructuring
     const { nombreProd, category } = term;



    const filterProducts = (term) => {
        let filterArray;
        let regex;

        let f=term.nombreProd+term.category;



        //switch
        switch(f){
            case  term.nombreProd + "1" :
                console.log(term.nombreProd, "categoría 1");
                regex=new RegExp(term.nombreProd, "i")
                filterArray=products.filter(item => {
                    if (regex.test(item.name)) return item;
                })
            break;
            case term.nombreProd + "2":
                console.log(term.nombreProd, "categoría 2");
                regex=new RegExp(term.nombreProd, "i")
                filterArray=products.filter(item => {
                    if (regex.test(item.name)) return item;
                })
            break;
            case term.nombreProd +"3":
                console.log(term.nombreProd, "categoría 3");
                regex=new RegExp(term.nombreProd, "i")
                filterArray=products.filter(item => {
                    if (regex.test(item.name)) return item;
                })
            break;
            case term.nombreProd +"4":
                console.log(term.nombreProd, "categoría 4");
                regex=new RegExp(term.nombreProd, "i")
                filterArray=products.filter(item => {
                    if (regex.test(item.name)) return item;
                })
            break;

        }

        handleFilter(filterArray);
        
    } 

    
    
    //Component Did Mount
    useEffect(() => {
      getProducts()
        .then(res => {
            console.log(res);
          handleProducts(res);
          handleFilter(res);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);




  //funcion que se ejecuta cuando se escriba en el input
  const handleSaveTerm = e => {
    saveTerm({
      ...term,
      [e.target.name]: e.target.value
    });
  };

  //state para el error
  const [error, handleError] = useState(false);

  

  const submitProduct = e => {
    e.preventDefault();

    //validacion
    if (nombreProd.trim() === "" || category=== "") {
      handleError(true);
      return;
    }

    handleError(false);

    //mandando a llamar la funcion de filtro
    filterProducts(term);

  };


  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="container">
        <div>
          <form onSubmit={submitProduct}>
            <div className="row">
              <div className="form group col-md-8">
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    id="sel1"
                    onChange={handleSaveTerm}
                    name="category"
                    value={category}
                  >
                    <option value="0" >Seleccione la categoría</option>
                    <option value="1" >Verduras</option>
                    <option value="2">Plantas</option>
                    <option value="3">Hierbas</option>
                    <option value="4">Pilones</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="nombreProd"
                  value={nombreProd}
                  className="form-control form-control-lg"
                  placeholder="Busca un producto"
                  onChange={handleSaveTerm}
                />
              </div>
              <div className="form group col-md-4 ">
                <input
                  type="submit"
                  className="btn- btn-lg btn-success btn-block"
                  value="Buscar"
                />
              </div>
              {error ? (
                <p className="alert alert-danger error-p text-white mt-3">
                  El Campo No Puede Estar Vacío
                </p>
              ) : null}
            </div>

            <div className="row justify-content-center">
            {
              filter.length === 0 ? <h2 className='text-center mt-4 '>Todavia no hay productos para la venta, espera un poco mas...</h2>: 
              <ImgList products={filter} />
            }
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default Search;
