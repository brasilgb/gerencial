import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
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
import FormatMoney from '../../Components/FormatMoney';

const GiroSubGrupo = () => {

    const { user, logout, analiseFiliaisKpis, giroSubGrupo, giroSubGrupoFilial, dataDoGiro, giroSearch, loadButton, allFiliais, numFilial, searchFilial } = useContext(AuthContext);
    const [currentFilial, setCurrentFilial] = useState(numFilial);

    useEffect(() => {
        setCurrentFilial(numFilial);
    }, [numFilial]);

    const refFilial = useRef();
    const refSub = useRef();
    const refGiro = useRef();

    const [defaultCheck, setDefaultCheck] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        giroSearch(refFilial.current.value, refSub.current.value, refGiro.current.checked);//searchFilial
    }

    const filialEstoque = allFiliais.filter((value) => (parseInt(value.CodFilial) === (parseInt(value.CodFilial) === searchFilial ? parseInt(searchFilial) : parseInt(numFilial)))).map((value) => (value.Filial));
    const subGrupoEstoque = giroSubGrupoFilial.filter((fil) => (parseInt(fil.codigoSubgrupo) === 0));
    //    console.log(subGrupoEstoque.length > 0 ? subGrupoEstoque.map((ve) => (ve.valorEstoque)) : 0 );
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
                                    defaultValue={currentFilial}
                                >
                                    {allFiliais.map((value, key) => (
                                        <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                    ))}
                                </select>
                                :
                                <>
                                    <input type="hidden" value={user.Filial} ref={refFilial} />
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
                            Atualização de dados:&nbsp; {dataDoGiro}

                            {/* {giroSubGrupo.map((value) => (value.Atualizacao)).filter((value, index, self) => self.indexOf(value) === index)} */}
                        </div>

                    </div>
                </form>

                <BoxAnalise>
                    {giroSubGrupo &&
                        <div className="py-2">

                            <span className={`w-4/12 flex items-center justify-center py-1 uppercase font-medium rounded text-gray-700 text-sm border bg-solar-yellow-200 bg-border-solar-yellow-200`}>
                                {loadButton ?
                                    <IconContext.Provider value={{ className: "text-xl text-gray-50 text-center animate-spin" }}>
                                        <CgSpinnerTwo />
                                    </IconContext.Provider>
                                    :
                                    <>
                                        <span className="text-sm">Valor do estoque para </span> 
                                        <span className="text-gray-200 text-md ml-1"> {filialEstoque}</span>:
                                        <span className="mx-2 font-bold text-gray-900">

                                            <FormatMoney value={subGrupoEstoque.length > 0 ? subGrupoEstoque.map((ve) => (ve.valorEstoque)) : 0} />

                                        </span>
                                    </>

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