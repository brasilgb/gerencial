import React, { Fragment } from 'react';

const BoxLoginRegister = ({ children }) => {

  return (

    <Fragment>

      <div className="antialiased flex flex-col h-screen bg-gray-100"
        style={{
          backgroundImage: `url('images/chart.jpg')`,
          backgroundPosition: 'center',
          backgroundColor: '#5897f5',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>

          {children}

      </div>
    </Fragment>
  )
}

export default BoxLoginRegister;