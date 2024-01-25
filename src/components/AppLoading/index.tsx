"use client"

import React from 'react'
import { IconContext } from "react-icons";
import { CgSpinnerTwo } from "react-icons/cg";

const AppLoading = () => {
    return (
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#0000000] z-10 flex items-center justify-center">
            <IconContext.Provider value={{ className: "" }}>
                <div className="bg-solar-gray-dark p-4 rounded-lg shadow-md border border-white">
                    <CgSpinnerTwo size={30} color="#EC6608" className="animate-spin"/>
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default AppLoading;