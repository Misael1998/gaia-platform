import React, { useState } from 'react';
import ImgList from './ImgList';


const Search = () => {






    const [term, saveTerm] = useState({ nombreProd: "", category: "" });


    //extrayendo los valores con el desctructuring
    const {nombreProd, category} = term;

    //funcion que se ejecuta cuando se escriba en el input
    const handleSaveTerm = e => {
        saveTerm({
            ...term,
            [e.target.name]: e.target.value
        });
    }

    //state para el error
    const [error, handleError] = useState(false);

    


    const submitProduct = e => {
        e.preventDefault();

        //validacion
        if (nombreProd.trim() === "") {
            handleError(true);
            return;
        }

        handleError(false);
    }



    return (
        <div className="container">
            <div >

                <form onSubmit={
                    submitProduct
                } >
                    <div className="row">
                        <div className="form group col-md-8">

                            <div className="form-group">

                                <select className="form-control form-control-lg" id="sel1" 
                                onChange={handleSaveTerm}  name="category">
                                    <option>Verduras</option>
                                    <option>Plantas</option>
                                    <option>Hierbas</option>
                                    <option>Pilones</option>
                                </select>
                            </div>

                            <input
                                type="text"
                                name='nombreProd'
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
                        <ImgList />
                    </div>



                </form>
            </div>

        </div>
    );
}

export default Search;