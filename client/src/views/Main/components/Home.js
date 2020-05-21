import React from 'react';
import Title from "../../../components/Title";
import { FaUserAlt } from 'react-icons/fa'
import { welcomeMessage } from "../../../modules/helper";


const Home = () => {
    return (
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
                        <img src={require('../../../assets/img/pyflor5.jpg')} alt='Tienda' className='img-fluid div-radius' />

                    </div>
                    <div className='col-lg-6 col-md-12 text-center p-2'>
                        <div className='primary-color'>
                            <h4 className='text-white'>Mira nuestros ultimos post</h4>
                        </div>
                        <div
                            className="fb-page"
                            data-href="https://www.facebook.com/Pyflor"
                            data-tabs="timeline"
                            data-small-header="false"
                            data-adapt-container-width="true"
                            data-hide-cover="false"
                        >
                            <blockquote
                                cite="https://www.facebook.com/Pyflor"
                                className="fb-xfbml-parse-ignore">
                                <a href="https://www.facebook.com/Pyflor">Pyflor</a>
                            </blockquote>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;