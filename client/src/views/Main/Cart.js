import React from "react";
import Route from "../../modules/Route";
import { MdShoppingCart } from "react-icons/md";
import { useSelector } from 'react-redux'
import CartItem from "./components/CartItem";
import Title from "../../components/Title";
import Shipping from "../Main/Shipping";
import {Link} from "react-router-dom";
import Cartg from "./components/Cartg";
import {Switch} from "react-router-dom";


const Cart = ({match}) => {

  /*const cart = useSelector(state => state.cart.cart);
  let sum = 0, isv = 0, sumExcent = 0, sumGrav = 0;

  cart.forEach(product => {
    sum += product.unit_price * product.quantity
    if (product.sarType === 'E') {
      sumExcent += product.unit_price * product.quantity;
    } else {
      sumGrav += product.unit_price * product.quantity;
    }
  })

  isv = (sum * 0.15).toFixed(2);
  let total = Number(sum) + Number(isv);


  if (cart.length === 0) {
    return (
      <div className='row p-5'>
        <Title icon={<MdShoppingCart size={40} />} title="Carrito" />
        <div className='col-12'>
          <h4>No hay productos en el carrito actualmente</h4>
        </div>
      </div>
    )
  } else { */

    return (
      <div className="row p-5">
        <Title icon={<MdShoppingCart size={40} />} title="Carrito" />
        <div className="col-12 mt-4 ">
          

         <Switch>

         <Route exact path={`${match.path}`} component={Cartg} isPrivate/>
         <Route exact path={`${match.path}/shipping`} component={Shipping} isPrivate/>

         </Switch>
           
         
           
         
        
          

          

        </div>
      </div>



    );
  };



export default Cart;
