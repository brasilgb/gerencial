import React, { Fragment, useContext, useEffect, useState } from 'react';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';
import Footer from '../../../Components/Footer';
import FormatMoney from '../../../Components/FormatMoney';
import KpiList from '../../../Components/KpiList';
import Kpi from '../../../Components/Kpis';
import TopBar from '../../../Components/TopBar';
import { AuthContext } from '../../../contexts/auth';

const AnaliseVendedores = () => {

    const { user, logout, analiseVendedoresKpis, conversaoVendedoresKpis, filialuser, allFiliais } = useContext(AuthContext);

    const [currentFilial, setCurrentFilial] = useState(user.Filial);

    useEffect(() => {
        filialuser(currentFilial);
    });

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Análise Gerencial
                    </div>

                    <div className="w-2/5 text-md text-gray-500 px-4 rounded text-shadow">
                        Análise para a filial:

                        {user.Type === "S" ?
                            <select
                                name="filiais"
                                id="filiais"
                                value={currentFilial}
                                onChange={(e) => setCurrentFilial(e.target.value)}
                                className="bg-white border mx-2 px-4 py-1 rounded-md text-sm"
                            >
                                {allFiliais.map((value, key) => (
                                    <option key={key} value={value.CodFilial}>{value.Filial} - {value.CodFilial}</option>
                                ))}
                            </select>
                            :
                            <span className="mx-2 px-8 py-1 rounded text-white text-sm border border-rose-600 bg-rose-500">
                                {analiseVendedoresKpis.map((value) => (value.Filial))}
                            </span>
                        }

                    </div>

                    <div className="w-1/5"></div>

                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {analiseVendedoresKpis.map((value) => (value.Atualizacao)).filter((value, index, self) => self.indexOf(value) === index)}
                    </div>

                </div>
                <BoxAnalise title="Desempenho" textColor="text-gray-500" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-3 mb-2">
                        {
                            conversaoVendedoresKpis.map((value, key) => (
                                <Fragment key={key}>
                                    <Kpi title="Melhor Conversão" rotulo={value.RotuloMelhorVenda} value={`${((value.ValorMelhorVenda) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-blue-500" />
                                    <Kpi title="Melhor GE" rotulo={value.ValorMelhorGE > 0 ? value.RotuloMelhorGE : '-'} value={`${((value.ValorMelhorGE) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-blue-500" />
                                    <Kpi title="Melhor PP" rotulo={value.ValorMelhorPP > 0 ? value.RotuloMelhorPP : '-'} value={`${((value.ValorMelhorPP) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-blue-500" />
                                </Fragment>
                            ))
                        }
                    </div>
                </BoxAnalise>

                {
                    analiseVendedoresKpis.map((value, key) => (
                        <Fragment key={key}>
                            <BoxAnalise title={value.NomeVendedor} textColor="text-gray-500" borderColor="border-gray-200">
                                <div className="grid gap-2 grid-cols-11">
                                    <KpiList title="Valor Faturado" value={<FormatMoney value={value.ValorVenda} />} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-blue-500" />
                                    <KpiList title="Valor Meta" value={<FormatMoney value={value.MetaVenda} />} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-blue-500" />
                                    <KpiList title="Meta" value={`${((value.PercentualVenda) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-blue-500" />

                                    <KpiList title="Valor GE" value={value.ValorGE} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-orange-400" />
                                    <KpiList title="Meta GE" value={value.MetaGE} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-orange-400" />
                                    <KpiList title="Rep. GE" value={`${((value.PercentualGE) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-orange-400" />

                                    <KpiList title="Valor PP" value={value.ValorPP} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-emerald-500" />
                                    <KpiList title="Meta PP" value={value.MetaPP} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-emerald-500" />
                                    <KpiList title="Rep. PP" value={`${((value.PercentualPP) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-emerald-500" />

                                    <KpiList title="Juros Vendidos" value={<FormatMoney value={value.ValorJurosVendidos} />} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-red-600" />
                                    <KpiList title="Rep. Juros" value={`${((value.PercentJurosVendidos) * 100).toFixed(2)}%`} titleColor="text-gray-500" valColor="text-gray-50" bgColor="bg-red-600" />
                                </div>
                            </BoxAnalise>
                        </Fragment>
                    ))
                }


            </div>
            <Footer />
        </Fragment>
    )
}

export default AnaliseVendedores;