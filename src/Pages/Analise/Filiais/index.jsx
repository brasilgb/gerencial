import React, { Fragment, useContext, useEffect, useState } from 'react';
import Kpi from '../../../Components/Kpis';
import { AuthContext } from '../../../contexts/auth';
import TopBar from '../../../Components/TopBar';
import Footer from '../../../Components/Footer';
import Progress from '../../../Components/Charts/Progress';
import FormatMoney from '../../../Components/FormatMoney';
import ProgressBar from '../../../Components/Charts/ProgressBar';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';

const AnaliseFiliais = () => {

    const { user, logout, analiseFiliaisKpis, inadimplenciaKpis, giroEstoqueKpis, filialuser, allFiliais } = useContext(AuthContext);

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
                        Análise de Filiais
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

                    <div className="w-1/5"></div>

                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {analiseFiliaisKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <div className="grid gap-2 grid-cols-3">
                <div className="col-span-2">
                        <BoxAnalise title="Faturamento" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-4">
                                {
                                    analiseFiliaisKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Valor Faturado" value={<FormatMoney value={value.Valor_Faturado} />} titleColor="text-gray-500" valColor="text-blue-600" />
                                            <Kpi title="Valor Meta" value={<FormatMoney value={value.Valor_Meta} />} titleColor="text-gray-500" valColor="text-green-600" />
                                            <Progress value={((value.Meta_Vendas) * 100).toFixed(2)} title="Alcançada" colorBar="#1a95fa" colorText="#4fb6fa" />
                                            <Progress value={((value.Margem) * 100).toFixed(2)} title="Margem" colorBar="#e4a548" colorText="#f0c129" />
                                            </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div>
                        <BoxAnalise title="Projeção" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    analiseFiliaisKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Projeção Venda" value={<FormatMoney value={value.ValorProjecaoVenda} />} titleColor="text-gray-500" valColor="text-red-400" />
                                            <Progress value={((value.PercentProjecaoVenda) * 100).toFixed(2)} title="Alcançado" colorBar="#248f20" colorText="#5ab44e" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    
                </div>

                <div className="grid gap-2 grid-cols-3">
                    <div className="col-span-2">
                        <BoxAnalise title="Faturamento Diário" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-3">
                                {
                                    analiseFiliaisKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Faturamento Dia" value={<FormatMoney value={value.ValorFaturamentoDia} />} titleColor="text-gray-500" valColor="text-red-400" />
                                            <Kpi title="Meta Dia" value={<FormatMoney value={value.ValorMetaDia} />} titleColor="text-gray-500" valColor="text-green-600" />
                                            <ProgressBar value={((value.ValorAlcancadoDia) * 100).toFixed(2)} title="Meta" colorBar="#a71a71" colorText="#241d09" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>

                    <div>
                        <BoxAnalise title="Taxa de Juros" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    analiseFiliaisKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Taxa de Juros" value={<FormatMoney value={value.ValorTaxaJuros} />} titleColor="text-gray-500" valColor="text-orange-500" />
                                            <ProgressBar value={((value.TaxaJurosFilial) * 100).toFixed(2)} title="Juros" colorBar="#f16b12" colorText="#241d09" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>

                </div>
                <div className="grid gap-2 grid-cols-6">
                    <div>
                        <BoxAnalise title="Inadimplência" textColor="text-gray-500" borderColor="border-gray-200">
                            {
                                inadimplenciaKpis.map((value, key) => (
                                    <Fragment key={key}>
                                        <ProgressBar value={((value.PercentInadimplencia) * 100).toFixed(2)} title="Inadimplência" colorBar="#15ddb2" colorText="#241d09" />
                                    </Fragment>
                                ))
                            }
                        </BoxAnalise>
                    </div>
                    <div className="col-span-2">
                        <BoxAnalise title="Giro Estoque" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    giroEstoqueKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Giro estoque Loja" value={`${value.GiroEstoqueLoja}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                            <Kpi title="Giro estoque Rede" value={`${value.GiroEstoqueRede}`} titleColor="text-gray-500" valColor="text-green-600" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div className="col-span-3">
                        <BoxAnalise title="Operações EP - Empréstimo Pessoal" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-3">
                                {
                                    analiseFiliaisKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi title="Valor EP" value={<FormatMoney value={value.ValorEP} />} titleColor="text-gray-500" valColor="text-blue-600" />
                                            <Kpi title="Meta EP" value={<FormatMoney value={value.MetaEP} />} titleColor="text-gray-500" valColor="text-green-600" />
                                            <ProgressBar value={((value.Meta_EP_Atingida) * 100).toFixed(2)} title="% EP Atingida" colorBar="#93ee6f" colorText="#241d09" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                </div>

                <BoxAnalise title="Operações GE - Garantia Estendida" textColor="text-gray-500" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-6 mb-3">
                        {
                            analiseFiliaisKpis.map((value, key) => (
                                <Fragment key={key}>
                                    <Kpi title="Valor GE" value={<FormatMoney value={value.ValorGE !== '-' ? value.ValorGE : 0} />} titleColor="text-gray-500" valColor="text-blue-600" />
                                    <Kpi title="Meta GE" value={<FormatMoney value={value.MetaGE} />} titleColor="text-gray-500" valColor="text-green-600" />
                                    <Kpi title="Elegiveis GE" value={`${value.ElegiveisGE}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                    <Kpi title="Vendas GE" value={`${value.VendasGE}`} titleColor="text-gray-500" valColor="text-green-600" />
                                    <ProgressBar value={((value.Meta_GE_Atingida) * 100).toFixed(2)} title="% GE Atingida" colorBar="#aa52f1" colorText="#241d09" />
                                    <ProgressBar value={((value.GE_Convertida) * 100).toFixed(2)} title="% GE Convertida" colorBar="#5547cc" colorText="#241d09" />
                                </Fragment>
                            ))
                        }
                    </div>
                </BoxAnalise>

                <BoxAnalise title="Operações AP - Acidentes Pessoais" textColor="text-gray-500" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-4 mb-3">
                        {
                            analiseFiliaisKpis.map((value, key) => (
                                <Fragment key={key}>
                                    <Kpi title="Valor AP" value={<FormatMoney value={value.ValorAP} />} titleColor="text-gray-500" valColor="text-blue-600" />
                                    <Kpi title="Meta AP" value={<FormatMoney value={value.MetaAP} />} titleColor="text-gray-500" valColor="text-green-600" />
                                    <Kpi title="Vendas AP" value={`${value.VendasAP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                    <ProgressBar value={((value.Meta_AP_Atingida) * 100).toFixed(2)} title="% AP Atingida" colorBar="#15ddb2" colorText="#241d09" />
                                </Fragment>
                            ))
                        }
                    </div>
                </BoxAnalise>

                <BoxAnalise title="Operações PP - Prestação Protegida" textColor="text-gray-500" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-6 mb-3">
                        {
                            analiseFiliaisKpis.map((value, key) => (
                                <Fragment key={key}>
                                    <Kpi title="Valor PP" value={<FormatMoney value={value.ValorPP} />} titleColor="text-gray-500" valColor="text-blue-600" />
                                    <Kpi title="Meta PP" value={<FormatMoney value={value.MetaPP} />} titleColor="text-gray-500" valColor="text-green-600" />
                                    <Kpi title="Elegiveis PP" value={`${value.ElegiveisPP}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                    <Kpi title="Vendas PP" value={`${value.VendasPP}`} titleColor="text-gray-500" valColor="text-green-600" />
                                    <ProgressBar value={((value.Meta_PP_Atingida) * 100).toFixed(2)} title="% PP Atingida" colorBar="#488aec" colorText="#241d09" />
                                    <ProgressBar value={((value.PP_Convertida) * 100).toFixed(2)} title="% PP Convertida" colorBar="#719ee2" colorText="#241d09" />
                                </Fragment>
                            ))
                        }
                    </div>
                </BoxAnalise>

            </div>
            <Footer />
        </Fragment>
    )
}

export default AnaliseFiliais;