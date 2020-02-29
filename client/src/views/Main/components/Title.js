import React from 'react';

const Title = ({ icon, title }) => {
    return (
        <>
            <div className='col-12'>
                <div className='row no-gutters'>
                    <div className='col-1 text-center text-white'>
                        <div className='primary-color app-header-icon'>
                            {icon}
                        </div>
                    </div>
                    <div className='col-11 d-flex align-items-center'>
                        <h2 className='m-1'>{title}</h2>
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