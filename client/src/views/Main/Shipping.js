import React, { useState, Fragment } from 'react';
import "../../styles/util.css";
import FormShipping from './components/FormShipping';
import FormPayment from './components/FormPayment';

const Shipping = () => {

const [showShipping, updateShowShipping ] = useState(true);
const [showPayment, updateShowPayment] = useState (true);

    return ( 
        
        <Fragment>
              {showShipping ? (
        

         
        <div className="container">
            <FormShipping updateShowShipping={updateShowShipping} />
        </div>
           
        ) : (
            showPayment ? (

                <div className="container">
                    <FormPayment updateShowPayment={updateShowPayment} />
                </div>

            ) : <h1> hola </h1>
        ) }


        </Fragment>

      

     );
}
 
export default Shipping;