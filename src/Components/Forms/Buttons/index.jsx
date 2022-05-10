import React, { Fragment } from 'react'
import { CgSearch, CgSpinnerTwo } from 'react-icons/cg';
import { IconContext } from 'react-icons';

const ButtonSearch = ({loadButton}) => {
    return (
        <Fragment>
            <button
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-gray-50 w-24 mx-2 py-2 border border-gray-50 rounded text-sm shadow"
            >
                {loadButton ?
                    <IconContext.Provider value={{ className: "text-xl text-gray-50 text-center animate-spin" }}>
                        <CgSpinnerTwo />
                    </IconContext.Provider>
                    :
                    <span>
                        <IconContext.Provider value={{ className: "text-xl text-gray-50 text-center" }}>
                            <CgSearch />
                        </IconContext.Provider>
                    </span>
                }
            </button>
        </Fragment>
    )
}

export default ButtonSearch;