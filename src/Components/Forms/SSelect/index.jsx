import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/auth';

const SSelect = () => {
    const { filialuser, allFiliais, numFilial } = useContext(AuthContext);
    const [currentFilial, setCurrentFilial] = useState(numFilial);

    const changeFilial = (e) => {
        filialuser(e.target.value);
    }

    useEffect(() => {
        setCurrentFilial(numFilial);
    },[numFilial]);

    return (
        <Fragment>
            <select
                name="filiais"
                id="filiais"
                defaultValue={currentFilial}
                onChange={changeFilial}
                className="bg-white border mx-2 px-4 pt-2 py-1 rounded-md text-sm shadow"
            >
                {allFiliais.map((value, key) => (
                    <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                ))}
            </select>
        </Fragment>
    )
}

export default SSelect;