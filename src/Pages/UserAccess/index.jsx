import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import BoxAnalise from '../../Components/Boxes/BoxAnalise';
import Footer from '../../Components/Footer'

import TopBar from '../../Components/TopBar';
import { AuthContext } from '../../contexts/auth';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { Pagination } from '../../Components/Pagination';
import moment from 'moment';

const UserAccess = () => {

    const { user, logout, conversaoKpis, userAccess, allFiliais, calendarDate, filialuser } = useContext(AuthContext);

    const [valueInicial, onChangeInicial] = useState(new Date());
    const [valueFinal, onChangeFinal] = useState(new Date());

    // const [currentFilial, setCurrentFilial] = useState('');
    const refFilial = useRef();

    // useEffect(() => {
    //     filialuser(currentFilial);
    // });

    const filialName = ((numFilial) => {
        const fil = allFiliais.filter((cven) => (parseInt(cven.CodFilial) === parseInt(numFilial)));
        return fil[0].Filial;
    });

    useEffect(() => {
        calendarDate(moment(valueInicial).format('YYYY-MM-DD'), moment(valueFinal).format('YYYY-MM-DD'));
    }, [valueInicial, valueFinal])

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Um nome foi enviado: ' + refFilial.current.value);
    }

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">

                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Log de Acesso de Filiais
                    </div>
                    <div className="w-3/5 text-md text-gray-500 px-4 rounded">

                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center">
                                <label className="w-44 text-right text-md mr-2 text-gray-700 text-shadow">

                                </label>

                                <DateTimePicker
                                    onChange={onChangeInicial}
                                    value={valueInicial}
                                    disableClock={true}
                                    format="dd/MM/yyyy"
                                    className="w-56 mr-2 border border-gray-200 rounded text-sm"
                                    autoFocus={false}
                                    locale="pt-BR"
                                    clearIcon=""
                                />

                                <DateTimePicker
                                    onChange={onChangeFinal}
                                    value={valueFinal}
                                    disableClock={true}
                                    format="dd/MM/yyyy"
                                    className="w-56 mr-2 border border-gray-200 rounded text-sm"
                                    autoFocus={false}
                                    locale="pt-BR"
                                    clearIcon=""
                                />

                                <div>
                                    <select
                                        name="filiais"
                                        id="filiais"
                                        // value={refFilial}
                                        ref={refFilial}
                                        className="w-56 bg-white border px-2 pt-2 py-2 rounded-md text-sm shadow"
                                    >
                                        <option value={false}>Selecione a Filial</option>
                                        {allFiliais.map((value, key) => (
                                            <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    className="mx-2 py-2 px-4 border border-gray-200 rounded text-sm shadow"
                                >
                                    Pesquisar
                                </button>
                            </div>
                        </form>

                    </div>

                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {conversaoKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <BoxAnalise>
                    <Pagination data={userAccess} />
                </BoxAnalise>

            </div>
            <Footer />
        </Fragment>
    )
}

export default UserAccess