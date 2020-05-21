import React from 'react';

const Title = ({ icon, title }) => {
    return (
        <>
            <div className='col-12'>
                <div className='row no-gutters'>
                    <div className='col-lg-1 col-md-1 col-md-1 col-sm-12 d-flex align-items-center text-white title-container'>
                        <div className='primary-color app-header-icon'>
                            {icon}
                        </div>
                    </div>
                    <div className='col-lg-11 col-md-11 col-sm-12 col-12 d-flex align-items-center title-container '>
                        <h2 className='m-1 header-title'>{title}</h2>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <hr />
            </div>
        </>
    );
};

export default Title;