import React, { useEffect, useState, Fragment } from "react";
import Title from "../../../components/Title";
import CardHello from "./components/CardHello";
import Carousel from "react-bootstrap/Carousel";
import { IoIosPerson } from "react-icons/io";
import { getOrdersToday } from "../../../services/OrdersToday";
import SessionStorageService from "../../../services/Storage";
import Swal from "sweetalert2";
import "./style/styleME.css";

const MainEmployee = () => {
  //State para pasar la info a la card de saludo:
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState("");

  //State para guardar el numero de pedidos al dia:
  const [numPed, setNumPed] = useState();

  //Funcion que establece el mensaje segun la hora;
  const hiFunction = () => {
    let d = new Date();
    let h = d.getHours();
    let u = SessionStorageService.getItem("uName");

    if (h >= 0 && h < 12) {
      setMsg("Buenos Días!");
      setUser(`Bienvenid@ ${u}`);
    } else {
      if (h >= 12 && h < 18) {
        setMsg("Buenas Tardes!");
        setUser(`Bienvenid@ ${u}`);
      } else {
        setMsg("Buenas Noches!");
        setUser(`Bienvenid@ ${u}`);
      }
    }
  };

  //Funcion que muestra el mensaje de bienvenida:
  useEffect(() => {
    hiFunction();

    getOrdersToday()
      .then((res) => {
        setNumPed(res);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrio un error al traer los pedidos realizados del día.",
        });
        setNumPed(0);
      });
  }, []);

  return (
    <Fragment>
      <div className="row p-5">
        <Title title="Bienvenido a PYFLOR" icon={<IoIosPerson size={40} />} />
        <div className="col-lg-12">
          <div className="container-card">
            <CardHello msg={msg} user={user} numPed={numPed} />
          </div>
        </div>
      </div>

      <div className="container">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100 img-dim"
              src={require("../../../assets/img/pyflor1.jpg")}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 className="h-card">Respeto</h3>
              <p className="text-white slide-text">
                "Todo es posible en la medida que tú lo creas posible."
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-dim"
              src={require("../../../assets/img/pyflor2.jpg")}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="h-card">Trabajo Duro</h3>
              <p className="text-white slide-text">
                "El hombre que no comete errores usualmente no hace nada."
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-dim"
              src={require("../../../assets/img/pyflor4.jpg")}
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3 className="h-card">Honestidad</h3>
              <p className="text-white slide-text">
                "No intentes ser tú el mejor de tu equipo, intenta que tu equipo
                sea el mejor."
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 img-dim"
              src={require("../../../assets/img/pyflor5.jpg")}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="h-card">Integridad</h3>
              <p className="text-white slide-text">
                "El éxito no se da de la noche a la mañana. Es cuando cada día
                eres un poco mejor que el anterior."
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </Fragment>
  );
};

export default MainEmployee;
