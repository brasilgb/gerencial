
import React, { Fragment, useContext } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg'
import { IconContext } from 'react-icons/lib';
import { AuthContext } from '../../contexts/auth';
const KpiList = ({ title, value, valColor, bgColor, titleColor, rotulo }) => {

    const { loadList } = useContext(AuthContext);

    return (
        <Fragment>

            <div className="flex flex-col items-center justify-center py-2 rounded-md">
                <div className="w-full text-center">
                    <h1 className={`${titleColor} font-normal text-md pb-2`}>{title}</h1>
                </div>
                <div className="w-full text-center ">

                    {loadList ?
                        <h1 className={`${valColor} ${bgColor} text-shadow-md font-semibold text-xl rounded-full p-3 border border-white shadow-md flex justify-center`}>
                            <IconContext.Provider value={{ className: "text-xl text-gray-50 text-center animate-spin" }}>
                                    <CgSpinnerTwo />
                            </IconContext.Provider>
                        </h1>
                        :
                        <h1 className={`${valColor} ${bgColor} text-shadow-md font-semibold text-xl rounded-full p-2 border border-white shadow-md`}>
                            {value}
                        </h1>
                    }
                </div>
            </div>

        </Fragment>
    )
}

export default KpiList;