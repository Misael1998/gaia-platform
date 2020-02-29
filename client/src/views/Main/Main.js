import React from 'react';
import SessionStorageService from '../../services/Storage';
import ProductDetail from './ProductDetail'
import Route from '../../modules/Route'
import items from '../../constants/mainNavigation'
import SideNavbar from '../../components/Layout/SideNavbar';
import Cart from './Cart';


const Main = ({ match }) => {


    const token = SessionStorageService.getToken();

    return (
        <div className='row'>
            <div className='col-2'>
                <SideNavbar items={items} />
            </div>
            <div className='col-10'>

                <Route exact path={`${match.path}/product/:id`} component={ProductDetail} />
                <Route path={`${match.path}/orders`} />
                <Route path={`${match.path}/profile`} />
                <Route path={`${match.path}/cart`} component={Cart}/>
                <Route path={`${match.path}/products`} />
            </div>

        </div>
    );
};

export default Main;