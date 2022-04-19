
import React, { Fragment } from 'react';
const Kpi = ({ title, value, valColor, titleColor, rotulo }) => {

    return (
        <Fragment>

            <div className="flex flex-col items-center justify-center py-6 bg-white rounded-md shadow">
                <div className="">
                    <h1 className={`${titleColor} font-normal text-lg pb-2`}>{title}</h1>
                </div>
                <div className={`${rotulo && "pb-1"}`}>
                    <h1 className="text-shadow-md font-semibold text-xl text-gray-500">{rotulo}</h1>
                </div>
                <div className="">
                    <h1 className={`${valColor} text-shadow-md font-semibold text-3xl`}>{value}</h1>
                </div>
            </div>

        </Fragment>
    )
}

export default Kpi;