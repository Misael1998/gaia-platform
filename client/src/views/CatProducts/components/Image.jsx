import React from 'react'
import fresas from '../../../assets/img/fresas.png';




const Image = () => {
    return ( 
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-5">
            <div className="card">
                <img src={fresas} alt="Fresas" className="card-img-top"  />
                <div className="card-body">
                    <h5 className="card-title text-center">Fresas</h5>
                    <p className="card-text text-justify text-center">50LPS</p>
                </div>
                
            </div>
        </div>
        
     );
}
 
export default Image;