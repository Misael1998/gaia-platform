import React from 'react';
import {MdSubject} from 'react-icons/md'
const BuySummary = ({subtotal, isv15, isv18, excent, grav, total}) => {

    

    return (
        <div>
            <div className="mb-4 d-flex flex-row">
            <span className='bubble-style primary-color mr-2'><MdSubject className='text-white'/></span>
                <h4 className="text-center">Resumen de compra</h4>
            </div>
            <div className="mb-2">
                <span className="font-weight-bold m-r-170">Subtotal:</span>L {subtotal || 0.00}

            </div>
            <div className="mb-2">
                <span className="font-weight-bold m-r-173">ISV 15%:</span>L {isv15 || 0.00}
            </div>
            <div className="mb-2">
                <span className="font-weight-bold m-r-173">ISV 18%:</span>L {isv18 || 0.00}
            </div>
            <div className="mb-2">
                <span className="font-weight-bold m-r-135">Total Excento:</span>L {excent || 0.00}
            </div>
            <div className="mb-2">
                <span className="font-weight-bold m-r-130">Total Gravado:</span>L {grav || 0.00}
            </div>
            <div>
                <hr />
            </div>
            <div className="mt-3 text-center fa-lg">
                <span className="font-weight-bold ">Total:</span> L {total || 0.00}
            </div>
        </div>
    );
};

export default BuySummary;