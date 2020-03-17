import React, { useState, Fragment } from 'react';
import "../../styles/util.css";
import FormShipping from './components/FormShipping';
import FormPayment from './components/FormPayment';
import ShippingDetails from './components/ShippingDetails';

const Shipping = ({history}) => {

const [showShipping, updateShowShipping ] = useState(true);
const [showPayment, updateShowPayment] = useState (true);

    return ( 
        
        <Fragment>
              {showShipping ? (
        

         
        <div className="container">
            <FormShipping updateShowShipping={updateShowShipping} history={history} />
        </div>
           
        ) : (
            showPayment ? (

                <div className="container">
                    <FormPayment updateShowPayment={updateShowPayment} history={history} />
                </div>

            ) : (

                <div className="container">
                    <ShippingDetails />
                </div>
            )
        ) }


        </Fragment>

      

     );
}
 
export default Shipping;