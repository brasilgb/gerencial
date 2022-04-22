
import React, { Fragment } from 'react';
const KpiList = ({ title, value, valColor, bgColor, titleColor, rotulo }) => {

    return (
        <Fragment>

            <div className="flex flex-col items-center justify-center py-2 bg-white rounded-md">
                <div className="w-full text-center">
                    <h1 className={`${titleColor} font-normal text-md pb-2`}>{title}</h1>
                </div>
                <div className="w-full text-center ">
                    <h1 className={`${valColor} ${bgColor} text-shadow-md font-semibold text-xl rounded-full p-2 border border-white shadow-md`}>{value}</h1>
                </div>
            </div>

        </Fragment>
    )
}

export default KpiList;