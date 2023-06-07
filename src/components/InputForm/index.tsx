"use client"

import React, { Fragment, useEffect, useState } from 'react'

interface InputProps {
    refInput?: any;
    disabled?: any;
    onchange?: any;
    refCheck?: any;
}
const InputSearch = ({ refInput, disabled }: InputProps) => {

    const [cleanText, setCleanText] = useState<any>();

    useEffect(() => {
        if (disabled) {
            setCleanText(refInput.current.value = "");
        }
    }, [disabled, refInput]);

    return (
        <Fragment>
            <input
                id="text"
                ref={refInput}
                type="text"
                // disabled={disabled}
                readOnly={disabled}
                className="w-56 bg-solar-gray-light mr-2 px-4 py-1 border-0 text-sm placeholder:text-sm text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent disabled:bg-gray-400"
                placeholder="Cód/Desc. SubGrupo"
            />
        </Fragment>
    )
}

const InputCheck = ({ onchange, refCheck }: InputProps) => {

    return (
        <Fragment>
            <label className="text-sm text-gray-500">Zerados:</label>
            <input
                ref={refCheck}
                onChange={onchange}
                type="checkbox"
                className="w-4 h-4 bg-white border border-gray-100 mx-1 pt-2 rounded-md text-sm shadow focus:outline-none focus:ring-0 focus:border-transparent"
            />
        </Fragment>
    )

}

export { InputSearch, InputCheck };