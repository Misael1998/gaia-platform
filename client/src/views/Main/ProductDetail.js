import React, { useState } from 'react';
import fruit from '../../assets/img/fresas.png'
import { MdAdd, MdRemove } from 'react-icons/md';
import './styles/main.css'
import Swal from 'sweetalert2';

const ProductDetail = () => {

    const [quantity, setQuantity] = useState(1);

    const substractQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevState) => prevState - 1);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cantidad minima',
                text: 'La cantidad minima para agregar un producto es de uno',
            })
        }
    }

    const addQuantity = () => {
        setQuantity((prevState)=> prevState + 1);
    }

    return (
        <div className='row p-5'>
            <div className='col-3'>
                <img src={fruit} alt='Fruta' className='img-fluid' />
            </div>
            <div className='col-9'>
                <div className='row'>
                    <div className='col-12 mb-2'>
                        <h3>Nombre del producto</h3>
                    </div>
                    <div className='col-12 mb-2'>
                        <p className='text-black-50'>Categoria del producto</p>
                    </div>
                    <div className='col-12'>
                        <p className='text-justify' >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ante sem, gravida ac sapien a, suscipit mattis risus. Vivamus non pulvinar enim. Fusce vel bibendum sapien. Cras ornare scelerisque lacus, vel fermentum quam maximus eu.</p>
                    </div>
                    <div className='col-12 mt-4 mb-4 text-center'>
                        <h4>Precio del producto</h4>
                    </div>
                    <div className='col-12 d-inline text-center '>
                        <button className='btn btn-sm btn-success' onClick={substractQuantity}>
                            <MdRemove size={30} />
                        </button>
                        <div className='form-control quantity-input' >{quantity}</div>
                        <button className='btn btn-sm btn-success' onClick={addQuantity}>
                            <MdAdd size={30} />
                        </button>
                    </div>
                    <div className='offset-3 col-6 mt-5'>
                        <button className='btn btn-block btn-success'>Añadir al carrito</button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;