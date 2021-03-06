import React, { Fragment, useContext } from 'react';
import Kpi from '../../../Components/Kpis';
import { AuthContext } from '../../../contexts/auth';
import TopBar from '../../../Components/TopBar';
import Footer from '../../../Components/Footer';
import Progress from '../../../Components/Charts/Progress';
import FormatMoney from '../../../Components/FormatMoney';
import ProgressBar from '../../../Components/Charts/ProgressBar';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';
import SSelect from '../../../Components/Forms/SSelect';
import NoSelect from '../../../Components/NoSelect';

const AnaliseFiliais = () => {

    const { user, logout, analiseFiliaisKpis, inadimplenciaKpis, giroEstoqueKpis } = useContext(AuthContext);

    const colorBar = ((value) => {
        if (value <= 90) return "#DC2626";
        if (value <= 98) return "#FB923C";
        if (value > 90) return "#10B981";
    });

    const colorKpi = ((value) => {
        if (value <= 90) return "text-red-600";
        if (value <= 98) return "text-orange-400";
        if (value > 90) return "text-emerald-500";
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
                            <SSelect />
                            :
                            <NoSelect>
                                {analiseFiliaisKpis.map((value) => (value.Filial))}
                            </NoSelect>
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
                                            <Kpi
                                                title="Valor Faturado"
                                                value={<FormatMoney value={value.Valor_Faturado} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.Meta_Vendas) * 100).toFixed())}
                                            />
                                            <Kpi
                                                title="Valor Meta"
                                                value={<FormatMoney
                                                    value={value.Valor_Meta} />}
                                                titleColor="text-gray-500"
                                                valColor="text-blue-500"
                                            />
                                            <Progress
                                                value={((value.Meta_Vendas) * 100).toFixed(2)}
                                                title="Alcançada"
                                                colorBar={colorBar(((value.Meta_Vendas) * 100).toFixed())}
                                                colorText={colorBar(((value.Meta_Vendas) * 100).toFixed())}
                                            />
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
                                            <Kpi
                                                title="Projeção Venda"
                                                value={<FormatMoney value={value.ValorProjecaoVenda > 0 ? value.ValorProjecaoVenda : 0} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorProjecaoVenda > 0 ? value.PercentProjecaoVenda : 0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.ValorProjecaoVenda > 0 ? value.PercentProjecaoVenda : 0) * 100).toFixed(2)}
                                                title="Projeção"
                                                colorBar={colorBar(((value.ValorProjecaoVenda > 0 ? value.PercentProjecaoVenda : 0) * 100).toFixed())}
                                                colorText={colorBar(((value.ValorProjecaoVenda > 0 ? value.PercentProjecaoVenda : 0) * 100).toFixed())}
                                            />
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
                                            <Kpi
                                                title="Faturamento Dia"
                                                value={<FormatMoney value={value.ValorFaturamentoDia} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorAlcancadoDia > 0 ? value.ValorAlcancadoDia : 0) * 100).toFixed())}
                                            />
                                            <Kpi
                                                title="Meta Dia"
                                                value={<FormatMoney value={value.ValorMetaDia > 0 ? value.ValorMetaDia : 0} />}
                                                titleColor="text-gray-500"
                                                valColor="text-blue-500"
                                            />
                                            <ProgressBar
                                                value={((value.ValorAlcancadoDia) * 100).toFixed(2)}
                                                title="Meta"
                                                colorBar={colorBar(((value.ValorAlcancadoDia) * 100).toFixed())}
                                                colorText="#241d09"
                                            />
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
                                            <Kpi
                                                title="Taxa de Juros"
                                                value={<FormatMoney
                                                    value={value.ValorTaxaJuros} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.TaxaJurosFilial) * 100).toFixed())}
                                            />
                                            <ProgressBar
                                                value={((value.TaxaJurosFilial) * 100).toFixed(2)}
                                                title="Juros"
                                                colorBar={colorBar(((value.TaxaJurosFilial) * 100).toFixed())}
                                                colorText="#241d09"
                                            />
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
                                        <ProgressBar
                                            value={((value.PercentInadimplencia) * 100).toFixed(2)}
                                            title="Inadimplência"
                                            colorBar={((value.PercentInadimplencia) * 100).toFixed() < 2 ? "#10B981" : "#DC2626"}
                                            colorText="#241d09"
                                        />
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
                                            <Kpi
                                                title="Giro estoque Loja"
                                                value={`${value.GiroEstoqueLoja}`}
                                                titleColor="text-gray-500"
                                                valColor="text-blue-600"
                                            />
                                            <Kpi
                                                title="Giro estoque Rede"
                                                value={`${(value.GiroEstoqueRede * 1).toFixed()}`}
                                                titleColor="text-gray-500"
                                                valColor="text-green-600"
                                            />
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
                                            <Kpi
                                                title="Valor EP"
                                                value={<FormatMoney value={value.ValorEP} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.Meta_EP_Atingida) * 100).toFixed())}
                                            />
                                            <Kpi
                                                title="Meta EP"
                                                value={<FormatMoney value={value.MetaEP} />}
                                                titleColor="text-gray-500"
                                                valColor="text-blue-500"
                                            />
                                            <ProgressBar
                                                value={((value.Meta_EP_Atingida) * 100).toFixed(2)}
                                                title="% EP Atingida"
                                                colorBar={colorBar(((value.Meta_EP_Atingida) * 100).toFixed())}
                                                colorText="#241d09"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                </div>

                <BoxAnalise title="Operações AP - Acidentes Pessoais" textColor="text-gray-500" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-4 mb-3">
                        {
                            analiseFiliaisKpis.map((value, key) => (
                                <Fragment key={key}>
                                    <Kpi
                                        title="Valor AP"
                                        value={<FormatMoney value={value.ValorAP} />}
                                        titleColor="text-gray-500"
                                        valColor={colorKpi(((value.Meta_AP_Atingida) * 100).toFixed())}
                                    />
                                    <Kpi
                                        title="Meta AP"
                                        value={<FormatMoney value={value.MetaAP} />}
                                        titleColor="text-gray-500"
                                        valColor="text-blue-500"
                                    />
                                    <Kpi
                                        title="Vendas AP"
                                        value={`${value.VendasAP}`}
                                        titleColor="text-gray-500"
                                        valColor={colorKpi(((value.Meta_AP_Atingida) * 100).toFixed())}
                                    />
                                    <ProgressBar
                                        value={((value.Meta_AP_Atingida) * 100).toFixed(2)}
                                        title="% AP Atingida"
                                        colorBar={colorBar(((value.Meta_AP_Atingida) * 100).toFixed())}
                                        colorText="#241d09"
                                    />
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
                                    <Kpi
                                        title="Valor PP"
                                        value={<FormatMoney value={value.ValorPP} />}
                                        titleColor="text-gray-500"
                                        valColor={colorKpi(((value.Meta_PP_Atingida) * 100).toFixed())}
                                    />
                                    <Kpi
                                        title="Meta PP"
                                        value={<FormatMoney value={value.MetaPP} />}
                                        titleColor="text-gray-500"
                                        valColor="text-blue-500"
                                    />
                                    <Kpi
                                        title="Elegiveis PP"
                                        value={`${value.ElegiveisPP}`}
                                        titleColor="text-gray-500"
                                        valColor="text-blue-500"
                                    />
                                    <Kpi
                                        title="Vendas PP"
                                        value={`${value.VendasPP}`}
                                        titleColor="text-gray-500"
                                        valColor={colorKpi(((value.Meta_PP_Atingida) * 100).toFixed())}
                                    />
                                    <ProgressBar
                                        value={((value.Meta_PP_Atingida) * 100).toFixed(2)}
                                        title="% PP Atingida"
                                        colorBar={colorBar(((value.Meta_PP_Atingida) * 100).toFixed())}
                                        colorText="#241d09"
                                    />
                                    <ProgressBar
                                        value={((value.PP_Convertida) * 100).toFixed(2)}
                                        title="% PP Convertida"
                                        colorBar={colorBar(((value.PP_Convertida) * 100).toFixed())}
                                        colorText="#241d09"
                                    />
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