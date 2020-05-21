import React from 'react';
import Title from "../../components/Title";
import { FaUserAlt } from "react-icons/fa";
import { welcomeMessage } from "../../modules/helper";

const Home = () => {
    return (
        <div className="row p-5">
            <Title title="Bienvenido a PYFLOR" icon={<FaUserAlt size={40} />} />

            <div className="col-12">
                <div className="row">
                    <div className="col-12 font-weight-bold text-center mb-3">
                        <p className="font-xl">{welcomeMessage()}</p>

                        <p className="font-xl">
                            ¡Bienvenido {sessionStorage.getItem("uName")}!
              </p>
                    </div>

                    <div className="col-lg-12 col-md-12 text-center p-2">
                        <img
                            src={require("../../assets/img/header.jpg")}
                            alt="Tienda"
                            className="img-fluid div-radius"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;