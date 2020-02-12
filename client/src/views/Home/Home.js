import React, { useRef } from 'react';
import './style/home.css'
import logo from '../../assets/img/logo.png'
import img from '../../assets/img/pyflor1.jpg'
import img1 from '../../assets/img/pyflor4.jpg'
import lechugas from '../../assets/img/lechugas.png'
import flores from '../../assets/img/flores.png'
import tomates from '../../assets/img/Tomates.png'
import zuccini from '../../assets/img/Zuccini.png'
import pepino from '../../assets/img/Pepino.png'
import NavbarHome from './components/NavbarHome';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard'



const Home = () => {
    const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

    const aboutRef = useRef(null)
    const ourProductsRef = useRef(null);
    const contactRef = useRef(null)

    const executeScroll = (ref) => scrollToRef(ref);

    return (
        <div className='row d-flex justify-content-center'>
            <div className='box'></div>
            <div className='col-12 top-header'>
                <div className='d-flex justify-content-center'>
                    <div className='logo text-center'>
                        <img src={logo} alt='logo' className='img-fluid' />
                    </div>
                </div>
            </div>
            <div className='col-12 p-0'>
                <NavbarHome toSection={executeScroll} about={aboutRef} ourProducts={ourProductsRef} contact={contactRef} />
            </div>
            <div className='col-lg-6 col-12 p-0'>
                <img src={img} alt='Finca' className='img-fluid' />
            </div>
            <div ref={aboutRef} className='col-lg-6 col-12 bg-gray p-5'>
                <h2>¿Quienes somos?</h2>
                <p className='text-justify'>
                    Somos una empresa especializada en producir vegetales de alta calidad para restaurantes Gourmet.
                </p>
                <p className='text-justify'>
                    Producimos hortalizas: lechugas, tomate cherry, albahacas, arúgula, tomillo, orégano; para restaurantes y supermercados.
                </p>
                <p className='text-justify'>
                    Producimos plantulas para trasplante de tomate, chile, cebolla, cebollin, brócoli, coliflor, repollo, melón, sandia, maracuyá, papaya etc. para productores y agroexportadores.
                </p>
                <h4 className='text-center'>¡Entregamos sus plantas en todo el país!</h4>
                <h3 className='text-center text-black-50 m-4'>Siempre fresco siempre saludable PYFLOR</h3>
            </div>
            <div ref={ourProductsRef} className='col-12 text-center p-2 mt-2'>
                <h2>Nuestros Productos</h2>
            </div>
            <ProductCard
                topClassName='col-lg-4 mt-2 p-3'
                img={img1}
                alt='Maquila de plantulas'
                title='Maquila de plantulas'
                subtitle='Maquilamos plantas para los productores y agroexportadores, tu nos compras o das las semilla y nosotros te la producimos.'
            />
            <ProductCard
                topClassName='col-lg-3 mt-2 p-3'
                img={lechugas}
                alt='Lechugas'
                title='Variedad de lechugas'
                subtitle='Producimos diferentes tipos de lechugas: escarola, romana, arúgula, para que prepares buenas ensaladas.'
            />
            <ProductCard
                topClassName='col-lg-3 mt-2 p-3'
                img={flores}
                alt='Flores'
                title='Flores comestibles'
                subtitle='Decora tu jardin con nuestras flores o prepara paltillos con ellas.'
            />
            <ProductCard
                topClassName='col-lg-3 mt-2 p-3'
                img={tomates}
                alt='Tomates'
                title='Tomates cherry y grape'
                subtitle='Tomates igual de pequeños que una cereza o una uva, puedes comertelos como bocadillos.'
            />

            <ProductCard
                topClassName='col-lg-3 mt-2 p-3'
                img={pepino}
                alt='Pepino'
                title='Pepinos coctel'
                subtitle='Para esas reuniones donde llegan todos tus amigos, preparalos con un poco de aceite y especies..'
            />
            <ProductCard
                topClassName='col-lg-3 mt-2 p-3'
                img={zuccini}
                alt='Zuccini'
                title='Variedad de zucchini'
                subtitle='>Mejor conocidos como calabacines, puedes prepararlos como gustes, asados, al vapor, etc.'
            />

            <div ref={contactRef} className='col-12'>
                <Footer />
            </div>
        </div>
    );
};

export default Home;