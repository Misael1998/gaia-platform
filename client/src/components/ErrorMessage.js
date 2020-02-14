import React from 'react';

const ErrorMessage = ({message, className}) => {
    return (
        <div className={`alert alert-danger bg-danger text-white ${className}`} >
            {message}
        </div>
    );
};

export default ErrorMessage;