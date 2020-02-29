    import React, { useState } from 'react';
import ImgList from './imgList';


const Search = () => {

    



    const [term, saveTerm] = useState({nombreProd:""});
    
    //funcion que se ejecuta cuando se escriba en el input
    const handleSaveTerm = e => {
        saveTerm({...term,
        [e.target.name]: e.target.value
        });
    }

    //state para el error
    const [error, handleError] = useState(false);

    const {nombreProd} = term;


    const submitProduct = e => {
        e.preventDefault();

        //validacion
        if (nombreProd.trim() === "" ) {
            handleError(true);
            return;
        }

        handleError(false);
    }

    

    return(
        <div className="container">
            <div className="jumbotron">
                <h1 className=" text-center mb-5">Buscador de productos</h1>
                <form onSubmit={
                    submitProduct
                } >
            <div className="row">
                <div className="form group col-md-8">

                <div class="form-group">
                
                <select class="form-control" id="sel1">
                    <option>Verduras</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                </div>

                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca un producto"
                        onChange={handleSaveTerm}
                    />
                </div>
                <div className="form group col-md-4">
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
                <ImgList />
            </div>

           

        </form>
            </div>

        </div>
    );
}

export default Search;