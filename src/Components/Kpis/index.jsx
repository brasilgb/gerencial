
import React, { Fragment } from 'react';
const Kpi = ({ title, value, valColor, titleColor, rotulo, padding }) => {

    return (
        <Fragment>

            <div className={`flex flex-col items-center justify-center bg-white rounded-md border-gray-300 border ${padding?padding:"py-8"}`}>
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