"use client"

import React, { Fragment } from 'react'
import { CgSearch } from 'react-icons/cg';
import { IconContext } from 'react-icons';

const ButtonSearch = () => {
    return (
        <Fragment>
            <button
                type="submit"
                className={`flex items-center justify-center text-gray-50 w-20 mx-2 py-1 text-sm `}
            >
                <span>
                    <IconContext.Provider value={{ className: "text-xl text-solar-blue-dark text-center" }}>
                        <CgSearch />
                    </IconContext.Provider>
                </span>

            </button>
        </Fragment>
    )
}

export default ButtonSearch;