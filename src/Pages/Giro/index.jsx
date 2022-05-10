import React, { Fragment, useContext, useRef, useState } from 'react'
import BoxAnalise from '../../Components/Boxes/BoxAnalise';
import Footer from '../../Components/Footer'

import TopBar from '../../Components/TopBar';
import { AuthContext } from '../../contexts/auth';
import 'react-datetime-picker/dist/DateTimePicker.css';
import { Pagination } from '../../Components/Pagination/Giro';
import NoSelect from '../../Components/NoSelect';
import { InputSearch, InputCheck } from '../../Components/Forms/Input';
import ButtonSearch from '../../Components/Forms/Buttons';
import { CgSpinnerTwo } from 'react-icons/cg';
import { IconContext } from 'react-icons';

const GiroSubGrupo = () => {

    const { user, logout, analiseFiliaisKpis, giroSubGrupo, giroSearch, loadButton, allFiliais } = useContext(AuthContext);

    const refFilial = useRef();
    const refSub = useRef();
    const refGiro = useRef();

    const [defaultCheck, setDefaultCheck] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        giroSearch(refFilial.current.value, refSub.current.value, refGiro.current.checked);
    }

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between my-2">
                        <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                            Análise de Giro de Estoque
                        </div>

                        <div className="w-3/5 flex items-center text-md text-gray-500 px-4 rounded text-shadow">
                            Análise para a filial:
                            {user.Type === "S" ?
                                <select
                                    ref={refFilial}
                                    className="w-56 bg-white border rounded-md text-sm shadow"
                                    style={{ padding: "8px" }}
                                    defaultValue={user.Filial}
                                >
                                    {allFiliais.map((value, key) => (
                                        <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                    ))}
                                </select>
                                :
                                <>
                                <input type="hidden" value={user.Filial} ref={refFilial}/>
                                    <NoSelect>
                                        {analiseFiliaisKpis.map((value) => (value.Filial))}
                                    </NoSelect>
                                </>

                            }

                            <InputSearch
                                refInput={refSub}
                                disabled={defaultCheck}
                            />

                            <InputCheck
                                refCheck={refGiro}
                                onchange={() => setDefaultCheck(!defaultCheck)}
                            />

                            <ButtonSearch loadButton={loadButton} />
                        </div>

                        <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                            Atualização de dados:&nbsp;
                            {analiseFiliaisKpis.map((value) => (value.Atualizacao))}
                        </div>

                    </div>
                </form>

                <BoxAnalise>
                    {giroSubGrupo &&
                        <div className="py-2">
                            <span className="w-1/6 flex items-center justify-center px-8 py-1 rounded text-white text-sm border bg-solar-yellow-300 bg-border-solar-yellow-200">

                                {loadButton ?
                                    <IconContext.Provider value={{ className: "text-xl text-gray-50 text-center animate-spin" }}>
                                        <CgSpinnerTwo />
                                    </IconContext.Provider>
                                    :
                                    giroSubGrupo.map((value) => (value.Filial)).filter((value, index, self) => self.indexOf(value) === index)
                                }
                            </span>
                        </div>
                    }
                    <Pagination data={giroSubGrupo} />
                </BoxAnalise>

            </div>
            <Footer />
        </Fragment>
    )
}

export default GiroSubGrupo;