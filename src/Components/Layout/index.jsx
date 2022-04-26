import React, { Fragment, useContext } from 'react'
import SessionTimeOut from '../SessionTimeOut';


const Layout = ({ children }) => {

    return (
        <Fragment>
            
            <div className="flex flex-row min-h-screen bg-gray-100 font-roboto">
                <div className="flex flex-col flex-grow">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

export default Layout;