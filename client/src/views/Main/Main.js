import React from "react";
import Route from "../../modules/Route";
import items from "../../constants/mainNavigation";
import SideNavbar from "../../components/Layout/SideNavbar";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Products from "./Products";
import Orders from "./Orders";
import ShippingDetails from "./components/ShippingDetails";
import SuccessRequest from "./SuccessRequest";
import CancelRequest from "./CancelRequest";
import Profile from "./Profile/Profile";
import ReOrder from "./ReOrder";
import Title from "../../components/Title";
import { FaUserAlt } from 'react-icons/fa'
import { welcomeMessage } from "../../modules/helper";


const Main = ({ match }) => {



  return (
    <div className="row">
      <div className="col-2 bg-gray clg-container">
        <SideNavbar items={items} />
      </div>
      <div className="col-10">

        <div className='row p-5'>
          <Title title='Bienvenido a PYFLOR' icon={<FaUserAlt size={40} />} />
          <div className='col-12'>
            <div className='row'>
              <div className='col-12 font-weight-bold text-center mb-3'>
                <p className='font-xl'>
                  {welcomeMessage()}
                </p>
                <p className='font-xl'>
                  ¡Bienvenido {sessionStorage.getItem('uName')}!
                </p>
              </div>
              <div className='col-lg-6 col-md-12 text-center p-2'>
                <div className='primary-color mb-3'>
                  <h4 className='text-white'>¡Siempre frescos, siempre saludables!</h4>
                </div>
                <img src={require('../../assets/img/pyflor5.jpg')} alt='Tienda' className='img-fluid div-radius' />

              </div>
              <div className='col-lg-6 col-md-12 text-center p-2'>
                <div className='primary-color'>
                  <h4 className='text-white'>Mira nuestros ultimos post</h4>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Configuración de rutas */}
        <Route path={`${match.path}/orders`} isPrivate />
        <Route path={`${match.path}/profile`} isPrivate />
        <Route path={`${match.path}/cart`} component={Cart} isPrivate />
        <Route path={`${match.path}/products`} component={Products} isPrivate />
        <Route path={`${match.path}/requests`} component={Orders} isPrivate />
        <Route path={`${match.path}/product/:id`} component={ProductDetail} isPrivate />
        <Route exact path={`${match.path}/request/:id`} component={ShippingDetails} isPrivate />
        <Route exact path={`${match.path}/request/reorder/:id`} component={ReOrder} isPrivate />
        <Route path={`${match.path}/success-request`} component={SuccessRequest} isPrivate />
        <Route path={`${match.path}/cancel-request`} component={CancelRequest} isPrivate />
        <Route path={`${match.path}/profile`} component={Profile} isPrivate />

        {/* <Redirect to={`${match.path}/products`} /> */}
      </div>
    </div>
  );
};

export default Main;
