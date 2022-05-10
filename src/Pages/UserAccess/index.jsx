import React, { Fragment, useContext, useRef, useState } from 'react'
import BoxAnalise from '../../Components/Boxes/BoxAnalise';
import Footer from '../../Components/Footer'

import TopBar from '../../Components/TopBar';
import { AuthContext } from '../../contexts/auth';

import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { Pagination } from '../../Components/Pagination/Users';
import moment from 'moment';

import ButtonSearch from '../../Components/Forms/Buttons';

const UserAccess = () => {

    const { user, logout, conversaoKpis, userAccess, allFiliais, dataSearch, loadButton } = useContext(AuthContext);

    const [dateInicial, setDateInicial] = useState(new Date());
    const [dateFinal, setDateFinal] = useState(new Date());
    const refSearchFilial = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        dataSearch(moment(dateInicial).format('YYYY-MM-DD'), moment(dateFinal).format('YYYY-MM-DD'), refSearchFilial.current.value);
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
                                    onChange={setDateInicial}
                                    value={dateInicial}
                                    disableClock={true}
                                    format="dd/MM/yyyy"
                                    className="w-56 mr-2 border border-gray-200 rounded text-sm"
                                    autoFocus={false}
                                    locale="pt-BR"
                                    clearIcon=""
                                />

                                <DateTimePicker
                                    onChange={setDateFinal}
                                    value={dateFinal}
                                    disableClock={true}
                                    format="dd/MM/yyyy"
                                    className="w-56 mr-2 border border-gray-200 rounded text-sm"
                                    autoFocus={false}
                                    locale="pt-BR"
                                    clearIcon=""
                                />

                                <div>
                                    <select
                                        ref={refSearchFilial}
                                        className="w-56 bg-white border rounded-md text-sm shadow"
                                        style={{padding: "8px"}}
                                        value={user.Filial}
                                    >
                                        <option value="false">Selecione a Filial</option>
                                        {allFiliais.map((value, key) => (
                                            <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                        ))}
                                    </select>
                                </div>
                                <ButtonSearch loadButton={loadButton} />
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