import React, { Fragment } from 'react';

const BoxAnalise = ({ children, title, textColor, borderColor }) => {
    return (
        <Fragment>
            <div className="bg-gray-50 rounded-md shadow mb-3 p-2">
                <div className={`border-b ${borderColor} mb-2`}>
                    <h1 className={`${textColor} font-medium text-sm text-shadow uppercase`}>
                        {title}
                    </h1>
                </div>
                {children}
            </div>
        </Fragment>
    )
}

export default BoxAnalise;