import React, { Fragment, useEffect, useState } from 'react'

const InputSearch = ({ refInput, disabled }) => {

    const [cleanText, setCleanText] = useState();

    useEffect(() => {
        if (disabled) {
            setCleanText(refInput.current.value = "");
        }
    },[disabled]);

    return (
        <Fragment>
            <input
                id="text"
                ref={refInput}
                type="text"
                disabled={disabled}
                className="w-64 bg-white border mx-2 px-4 pt-2 py-1 rounded-md text-sm shadow"
                placeholder="Código ou Descrição do SubGrupo"
            />
        </Fragment>
    )

}

const InputCheck = ({ onchange, refCheck }) => {

    return (
        <Fragment>
            <label className="">Giros Zerados:</label>
            <input
                ref={refCheck}
                onChange={onchange}
                type="checkbox"
                className="w-4 h-4 bg-white border border-gray-100 mx-1 pt-2 rounded-md text-sm shadow"
            />
        </Fragment>
    )

}

export { InputSearch, InputCheck };