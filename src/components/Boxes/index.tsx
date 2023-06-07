"use client"

import React, { Fragment } from 'react';
interface BoxesProps {
    children: React.ReactNode;
    title: string;
    textColor: string;
    borderColor: string;
}
const BoxAnalise = ({ children, title, textColor, borderColor }: BoxesProps) => {
    return (
        <Fragment>
            <div className="bg-solar-gray-middle border border-white shadow mt-3 p-2">
                {title &&
                    <div className={`border-b ${borderColor} mb-2`}>
                        <h1 className={`font-medium text-sm text-shadow uppercase drop-shadow-md ${textColor} `}>
                            {title}
                        </h1>
                    </div>
                }
                {children}
            </div>
        </Fragment>
    )
}

export default BoxAnalise;