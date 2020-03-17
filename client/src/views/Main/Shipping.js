import React, { useState, Fragment } from 'react';
import "../../styles/util.css";
import FormShipping from './components/FormShipping';
import FormPayment from './components/FormPayment';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Shipping = ({ history }) => {

    const [showShipping, updateShowShipping] = useState(true);
    const [showPayment, updateShowPayment] = useState(true);

    const cart = useSelector(state => state.cart.cart);

    if (cart.length === 0) {
        return <Redirect to='/app/products' />
    }



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

                    ) : null
                )}


        </Fragment>



    );
}

export default Shipping;