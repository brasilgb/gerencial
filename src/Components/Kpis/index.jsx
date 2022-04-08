
import React, { Fragment } from 'react';
const Kpi = ({ title, value, valColor, titleColor }) => {

    return (
        <Fragment>

            <div className="flex flex-col items-center justify-center py-4 bg-white rounded-md shadow">
                <div className="">
                    <h1 className={`${titleColor} font-normal text-lg pb-2`}>{title}</h1>
                </div>
                <div className="">
                    <h1 className={`${valColor} text-shadow-md font-semibold text-3xl`}>{value}</h1>
                </div>
            </div>

        </Fragment>
    )
}

export default Kpi;