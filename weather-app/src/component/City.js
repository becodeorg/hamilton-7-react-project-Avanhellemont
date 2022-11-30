import React from 'react';

const City = ({forecast}) => {
    return (
        <div>
            <h2 className='text-center text-blue-200 p-10 text-2xl text-white font-black'>{forecast.city.name}</h2>
        </div>
    );
};

export default City;