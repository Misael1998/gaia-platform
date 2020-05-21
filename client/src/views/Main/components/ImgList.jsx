import React from 'react'
import Image from './Image';

const ImgList = ({products}) => {
    return ( 
        <div className="col-16 p-5 row">
            {products.map(product => <Image key={product.idProducts} product={product}/> )}
            
        </div>
     );
}
 
export default ImgList;