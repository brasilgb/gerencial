import React, { Fragment, useContext, useState } from 'react'
import BoxAnalise from '../../Components/Boxes/BoxAnalise';
import Footer from '../../Components/Footer'
import { STable, STd, STh, STr } from '../../Components/Tables';
import TopBar from '../../Components/TopBar';
import { AuthContext } from '../../contexts/auth';
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

const UserAccess = () => {

    const { user, logout, conversaoKpis, userAccess, allFiliais } = useContext(AuthContext);

    const [value, onChange] = useState(new Date());

    const filialName = ((numFilial) => {
        const fil = allFiliais.filter((cven) => (parseInt(cven.CodFilial) === parseInt(numFilial)));
        return fil[0].Filial;
    });

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">

                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Log de Acesso de Filiais
                    </div>
                    <div className="w-1/5 text-md text-gray-500 px-4 rounded text-shadow">

                        <div className="col-span-6 sm:col-span-4">

                            <label className="block text-sm font-medium text-gray-700">
                                Data de cadastro
                            </label>
                            <DateTimePicker
                                onChange={onChange}
                                value={value}
                                disableClock={true}
                                format="dd/MM/yyyy"
                                className="mt-1 w-full"
                                autoFocus={false}
                                locale="pt-BR"
                                clearIcon=""
                            />
                        </div>

                    </div>
                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {conversaoKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <BoxAnalise>
                    <STable>
                        <STr thead={true}>
                            <STh>
                                Id Usuário
                            </STh>
                            <STh>
                                Nome Usuário
                            </STh>
                            <STh>
                                Código Vendedor
                            </STh>
                            <STh>
                                Número Filial
                            </STh>
                            <STh>
                                Nome Filial
                            </STh>
                            <STh>
                                IP
                            </STh>
                            <STh>
                                Data Cadastro
                            </STh>
                            <STh>
                                Data Acesso
                            </STh>
                        </STr>

                        {userAccess.map((user, index) => (
                            <STr key={index} colorRow={(index % 2)}>
                                <STd>{user.IdUsuario}</STd>
                                <STd>{user.usuario.Name}</STd>
                                <STd>{user.usuario.Code}</STd>
                                <STd>{user.usuario.Filial}</STd>
                                <STd>{filialName(user.usuario.Filial)}</STd>
                                <STd>{user.Ip}</STd>
                                <STd>{moment(user.usuario.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                                <STd>{moment(user.created_at).format('DD/MM/YYYY HH:mm:ss')}</STd>
                            </STr>
                        ))}

                    </STable>
                </BoxAnalise>

            </div>
            <Footer />
        </Fragment>
    )
}

export default UserAccess