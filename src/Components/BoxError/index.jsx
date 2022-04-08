import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { IoWarning } from 'react-icons/io5';
import 'animate.css';

const BoxError = ({ text }) => {
    return (
        <Fragment>
            <div className="animate__animated animate__fadeInDown animate__delay-0s flex items-center justify-start w-full bg-yellow-200 rounded-b px-2 py-2">
                <IconContext.Provider value={{ className: "text-md text-red-500" }}>
                    <div>
                        <IoWarning />
                    </div>
                </IconContext.Provider>
                <div className="ml-2 text-red-500 text-sm">{text}</div>
            </div>
        </Fragment>
    )
}

export default BoxError;