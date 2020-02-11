import React from 'react';
import { MdPhone, MdEmail, MdMap } from 'react-icons/md'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import FooterItem from './FooterItem'
const Footer = () => {
    return (
        <div className='primary-color row'>
            <div className='col-12 pl-5 pt-3 mt-4 mb-4 text-white text-center'>
                <h2 className='text-white'>Contactanos</h2>

            </div>
            <div className='col-12 p-2'>
                <div className='row text-white no-gutters'>
                    <div className='col-lg-4 col-12 text-center'>
                        <FooterItem
                            Icon={MdPhone}
                            title='Servicio al cliente'
                            subtitle='+504 98577128'
                        />
                        <FooterItem 
                            Icon={MdPhone}
                            title='Oficina'
                            subtitle='+504 27402499'
                        />

                    </div>
                    <div className='col-lg-4 col-12 text-center'>
                        <p className='font-lg font-weight-bold'>
                            <MdEmail size={26} className='mr-2' />Correo electronico
                        </p>
                        <p className='mt-3'>
                            <a href='mailto:pedidospyflor@gmail.com' className='font-weight-normal text-decoration-none text-white'>pedidospyflor@gmail.com</a>
                        </p>
                        <FooterItem
                            Icon={MdMap}
                            title='Ubicados en:'
                            subtitle='Valle de Ángeles Finca La Soledad'
                        />
                    </div>
                    <div className='col-lg-4 col-12 text-center'>
                        <h5 className='mb-4'>Siguenos en nuestras redes sociales</h5>
                        <p className='font-lg font-weight-bold'>
                            <FaFacebook size={26} className='mr-2' />Facebook
                            <span className='ml-4'>
                                <a href='https://www.facebook.com/Pyflor/' target='' className='font-weight-normal text-decoration-none text-white'>@Pyflor</a>
                            </span>
                        </p>
                        <p className='font-lg font-weight-bold'>
                            <FaInstagram size={26} className='mr-2' />Instagram
                            <span className='ml-4'>
                                <a href='https://www.instagram.com/pyflorhn/?hl=es-la' className='font-weight-normal text-decoration-none text-white'>@pyflorhn</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;