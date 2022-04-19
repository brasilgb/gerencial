import React, { Fragment, useContext, useEffect, useState } from 'react';
import Kpi from '../../Components/Kpis';
import { AuthContext } from '../../contexts/auth';
import TopBar from '../../Components/TopBar';
import Footer from '../../Components/Footer';

const Gerencial = () => {

    const { user, logout, analiseFiliaisKpis, inadimplenciaKpis, giroEstoqueKpis, filialuser, allFiliais } = useContext(AuthContext);

    const [currentFilial, setCurrentFilial] = useState(user.Filial);

    useEffect(() => {
        filialuser(currentFilial);
    });
    // console.log(analiseFiliaisKpis);
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
                                {analiseFiliaisKpis.map((value) => (value.Filial))}
                            </span>
                        }

                    </div>

                    <div className="w-1/5">

                    </div>


                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {analiseFiliaisKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <div className="grid gap-2 grid-cols-3 mb-2">
                    {
                        inadimplenciaKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Inadimplência" value={`${((value.PercentInadimplencia) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                            </Fragment>
                        ))
                    }
                    {
                        giroEstoqueKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Giro estoque Loja" value={`${value.GiroEstoqueLoja}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Giro estoque Rede" value={`${value.GiroEstoqueRede}`} titleColor="text-gray-500" valColor="text-green-600" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor Faturado" value={`R$ ${value.Valor_Faturado}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Valor Meta" value={`R$ ${value.Valor_Meta}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% Meta Vendas" value={`${((value.Meta_Vendas) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Margem" value={`${((value.Margem) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-red-500" />
                                <Kpi title="Projeção Venda" value={value.ValorProjecaoVenda} titleColor="text-gray-500" valColor="text-red-400" />
                                <Kpi title="% Projeção Venda" value={`${((value.PercentProjecaoVenda) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-purple-400" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-5 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>

                                <Kpi title="Faturamento Dia" value={value.ValorFaturamentoDia} titleColor="text-gray-500" valColor="text-red-400" />
                                <Kpi title="Meta Dia" value={`R$ ${value.ValorMetaDia}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="Alcançado Dia" value={`${((value.ValorAlcancadoDia) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Taxa de Juros" value={`R$ ${value.ValorTaxaJuros}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% Taxa de Juros" value={`${((value.TaxaJurosFilial) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor GE" value={`R$ ${value.ValorGE}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Meta GE" value={`R$ ${value.MetaGE}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="Elegiveis GE" value={`${value.ElegiveisGE}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Vendas GE" value={`${value.VendasGE}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% GE Atingida" value={`${((value.Meta_GE_Atingida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="% GE Convertida" value={`${((value.GE_Convertida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-purple-400" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-4 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor AP" value={`R$ ${value.ValorAP}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Meta AP" value={`R$ ${value.MetaAP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="Vendas AP" value={`${value.VendasAP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% AP Atingida" value={`${((value.Meta_AP_Atingida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor PP" value={`R$ ${value.ValorPP}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Meta PP" value={`R$ ${value.MetaPP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="Elegiveis PP" value={`${value.ElegiveisPP}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Vendas PP" value={`${value.VendasPP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% PP Atingida" value={`${((value.Meta_PP_Atingida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="% PP Convertida" value={`${((value.PP_Convertida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-purple-400" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-3 mb-2">
                    {
                        analiseFiliaisKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Valor EP" value={`R$ ${value.ValorEP}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Meta EP" value={`R$ ${value.MetaEP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="% EP Atingida" value={`${((value.Meta_EP_Atingida) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                            </Fragment>
                        ))
                    }
                </div>

            </div>
            <Footer />
        </Fragment>
    )
}

export default Gerencial;