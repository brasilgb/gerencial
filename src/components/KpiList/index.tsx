"use client"

import React, { Fragment } from "react";

interface KpiListProps {
    title?:string;
    value?:any;
    valColor?:string;
    bgColor?:string;
    titleColor?:string;
    }
const KpiList = ({ title, value, valColor, bgColor, titleColor }: KpiListProps) => {

    return (
            <div className="flex flex-col items-center justify-center bg-white border border-gray-200">
                <div className="flex items-center justify-center bg-gray-50 w-full border-b border-gray-200 py-1 mx-4" >
                    <h1 className={`${titleColor} drop-shadow font-normal text-lg`}>{title}</h1>
                </div>
                <div className="py-2 bg-white flex items-center justify-center w-full" >
                    <h1 className={`${valColor} drop-shadow-md font-semibold text-xl`}>
                        {value}
                    </h1>
                </div>
            </div>
    )
}

export default KpiList;