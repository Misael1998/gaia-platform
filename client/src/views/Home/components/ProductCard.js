import React from 'react';

const ProductCard = ({img, topClassName, alt, title, subtitle}) => {
    return (
        <div className={topClassName}>
            <div className="card">
                <img src={img} className="card-img-top" alt={alt} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text text-justify">{subtitle}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;