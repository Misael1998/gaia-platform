import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/FooterLog.css";

const FooterLog = () => {
  return (
    <footer className="page-footer font-small main-footerlog pt-4">
      <div className="container text-center text-md-left">
        <div className="row">
          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">
              PyFlor
            </h5>
            <p className="blck-txt">Contenido del footer</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p className="blck-txt">Link 1</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p className="blck-txt">Link 1</p>
          </div>

          <div className="col-md-3">
            <h5 className="font-weight-bold text-uppercase mt-4 mb-4">Link</h5>
            <p className="blck-txt">Link 1</p>
          </div>
        </div>

        <hr />

        <div className="row">
          <ul className="list-unstyled list-inline text-center ml-2">
            <li className="list-inline-item mr-4">
              <Link
                className="btn-floating btn-fb mx-1 blck-txt"
                to="https://www.facebook.com/Pyflor//"
              >
                <FaFacebook size={26} className="mr-2" />
                Facebook
              </Link>
            </li>
            <li className="list-inline-item">
              <Link
                className="btn-floating btn-gplus mx-1 blck-txt"
                to="https://www.instagram.com/pyflorhn/?hl=es-la"
              >
                <FaInstagram size={26} className="mr-2" />
                Instagram
              </Link>
            </li>
          </ul>
        </div>

        <hr />

        <div className="row">
          <div className="footer-copyright text-center py-3 ml-2">
            © 2020 Copyright Ingeniería del Software:
            <Link className="blue-txt ml-2" to="/">
              Regresar a la pagina de Inicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLog;
