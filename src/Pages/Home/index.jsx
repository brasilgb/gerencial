import React, { Fragment, useContext, useState } from 'react';
import AnaliseVencidos from '../../Components/Charts/Combinations/AnaliseVencidos';
import ProjecaoVencidos from '../../Components/Charts/Lines/ProjecaoVencidos';
import Kpi from '../../Components/Kpis';
import { AuthContext } from '../../contexts/auth';
import TopBar from '../../Components/TopBar';
import Footer from '../../Components/Footer';
import { IconContext } from 'react-icons';
import { IoBarChart, IoStorefrontSharp } from 'react-icons/io5';
import SSelect from '../../Components/Forms/SSelect';
import NoSelect from '../../Components/NoSelect';

const Home = () => {

    const { user, logout, valuesKpis, graficoVencidos, graficoProjecao, totalValuesKpis, totalGraficoVencidos, totalGraficoProjecao } = useContext(AuthContext);

    const [analiseRede, setAnaliseRede] = useState(false);

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Análise de Vencidos e á Vencer x Crediário
                    </div>
                    {analiseRede ?

                        <div className=" w-2/5 text-md text-gray-500 px-4 py-1 rounded text-shadow">
                            Análise de Crédito total da rede
                        </div>
                        :

                        <div className="w-2/5 text-md text-gray-500 px-4 rounded text-shadow">
                            Análise para a filial:

                            {user.Type === "S" ?
                            <SSelect/>
                                // <select
                                //     name="filiais"
                                //     id="filiais"
                                //     value={currentFilial}
                                //     onChange={(e) => setCurrentFilial(e.target.value)}
                                //     className="bg-white border mx-2 px-4 py-1 rounded-md text-sm"
                                // >
                                //     {allFiliais.map((value, key) => (
                                //         <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                //     ))}
                                // </select>
                                :
                                <NoSelect>
                                    {(analiseRede ? totalValuesKpis : valuesKpis).map((value) => (value.Filial))}
                                </NoSelect>
                            }

                        </div>
                    }

                    <div className="w-1/5">

                        {user.Type === "S" &&
                            <>{analiseRede ?
                                <button
                                    onClick={() => setAnaliseRede(false)}
                                    className="w-50 flex items-center px-4 py-1 text-sm tracking-wide text-white shadow shadow-gray-700/40 transition-colors duration-200 transform border border-rose-400 bg-rose-500 rounded-md hover:bg-rose-600 focus:outline-none">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-50" }}>
                                        <div className="flex items-center justify-center">
                                            <IoStorefrontSharp />
                                        </div>
                                    </IconContext.Provider>
                                    <div className="pl-2 text-md">Ver análise por filial</div>
                                </button>
                                :
                                <button
                                    onClick={() => setAnaliseRede(true)}
                                    className="w-50 flex items-center px-4 py-1 text-sm tracking-wide text-white shadow shadow-gray-700/40 transition-colors duration-200 transform border border-orange-400 bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none">
                                    <IconContext.Provider value={{ className: "text-xl text-gray-50" }}>
                                        <div className="flex items-center justify-center">
                                            <IoBarChart />
                                        </div>
                                    </IconContext.Provider>
                                    <div className="pl-2 text-md">Ver análise da rede</div>
                                </button>
                            }</>
                        }
                    </div>


                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {(analiseRede ? totalValuesKpis : valuesKpis).map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        (analiseRede ? totalValuesKpis : valuesKpis).map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor Crediário" value={`R$ ${value.ValorCrediario}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Valor à Vencer" value={`R$ ${value.ValorVencer}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% Rep. à Vencer S/ Crediário" value={value.RepVencer} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Valor Vencido" value={`R$ ${value.ValorVencido}`} titleColor="text-gray-500" valColor="text-red-500" />
                                <Kpi title="% Rep. Vencido S/ Crediário" value={value.RepVencido} titleColor="text-gray-500" valColor="text-red-400" />
                                <Kpi title="% Rep. Proj. Venc. S/ Crediário" value={value.RepProjVencido} titleColor="text-gray-500" valColor="text-purple-400" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="flex flex-col">
                    <div className="mb-2 flex items-center justify-center bg-white rounded-md shadow py-1">
                        <AnaliseVencidos data={(analiseRede ? totalGraficoVencidos : graficoVencidos)} />
                    </div>
                    <div className="mb-2 flex items-center justify-center bg-white rounded-md shadow py-1">
                        <ProjecaoVencidos data={(analiseRede ? totalGraficoProjecao : graficoProjecao)} />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Home;