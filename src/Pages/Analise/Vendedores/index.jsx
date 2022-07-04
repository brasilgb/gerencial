import React, { Fragment, useContext } from 'react';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';
import Footer from '../../../Components/Footer';
import FormatMoney from '../../../Components/FormatMoney';
import SSelect from '../../../Components/Forms/SSelect';
import KpiList from '../../../Components/KpiList';
import Kpi from '../../../Components/Kpis';
import NoSelect from '../../../Components/NoSelect';
import TopBar from '../../../Components/TopBar';
import { AuthContext } from '../../../contexts/auth';

const AnaliseVendedores = () => {

    const { user, logout, analiseVendedoresKpis, conversaoVendedoresKpis, margemVendedor } = useContext(AuthContext);

    const colorKpi = ((value) => {
        if (value <= 90) return "bg-red-600";
        if (value <= 98) return "bg-orange-400";
        if (value > 90) return "bg-emerald-500";
    });

 

    // const filterVendedor = (idvendedor) => {
    //     return margemVendedor.filter((m) => (parseInt(m.vendedor) === parseInt(idvendedor))).map((i) => (i.margem));
    // } 

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
                            <SSelect />
                            :
                            <NoSelect>
                                {conversaoVendedoresKpis.map((value) => (value.DescricaoFilial))}
                            </NoSelect>
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
                                    <Kpi
                                        title="Melhor Conversão"
                                        rotulo={value.RotuloMelhorVenda} value={`${((value.ValorMelhorVenda > 0 ? value.ValorMelhorVenda : 0) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-green-500"
                                    />
                                    <Kpi
                                        title="Melhor Taxa Juros"
                                        rotulo={value.ValorMelhorJuro > 0 ? value.RotuloMelhorJuro : '-'}
                                        value={`${((value.ValorMelhorJuro > 0 ? value.ValorMelhorJuro : 0) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-green-500"
                                    />
                                    <Kpi
                                        title="Melhor PP"
                                        rotulo={value.ValorMelhorPP > 0 ? value.RotuloMelhorPP : '-'}
                                        value={`${((value.ValorMelhorPP > 0 ? value.ValorMelhorPP : 0) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-green-500"
                                    />
                                </Fragment>
                            ))
                        }
                    </div>
                </BoxAnalise>

                {
                    analiseVendedoresKpis.map((value, key) => (
                        <Fragment key={key}>
                            <BoxAnalise title={value.CodigoVendedor + ' - ' + value.NomeVendedor} textColor="text-gray-500" borderColor="border-gray-200">
                                <div className="grid gap-2 grid-cols-9">
                                    <KpiList
                                        title="Valor Faturado"
                                        value={<FormatMoney value={value.ValorVenda} />}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentualVenda) * 100).toFixed())}
                                    />
                                    <KpiList
                                        title="Valor Meta"
                                        value={<FormatMoney value={value.MetaVenda} />}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor="bg-blue-500"
                                    />
                                    <KpiList
                                        title="Meta"
                                        value={`${((value.PercentualVenda) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentualVenda) * 100).toFixed())}
                                    />
                                   <KpiList
                                        title="Margem"
                                        value={`${( ( margemVendedor.filter((m) => (parseInt(m.vendedor) === parseInt(value.CodigoVendedor))).map((i) => (i.margem)) ) * 1).toFixed()}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(( ( margemVendedor.filter((m) => (parseInt(m.vendedor) === parseInt(value.CodigoVendedor))).map((i) => (i.margem)) ) * 1).toFixed())}
                                    />
                                   
                                    <KpiList
                                        title="Valor PP"
                                        value={value.ValorPP}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentualPP) * 100).toFixed())}
                                    />
                                    <KpiList
                                        title="Meta PP"
                                        value={value.MetaPP}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor="bg-blue-500"
                                    />
                                    <KpiList
                                        title="Rep. PP"
                                        value={`${((value.PercentualPP) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentualPP) * 100).toFixed())}
                                    />

                                    <KpiList
                                        title="Juros Vendidos"
                                        value={<FormatMoney value={value.ValorJurosVendidos} />}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentJurosVendidos) * 100).toFixed())}
                                    />
                                    <KpiList
                                        title="Rep. Juros"
                                        value={`${((value.PercentJurosVendidos) * 100).toFixed(2)}%`}
                                        titleColor="text-gray-500"
                                        valColor="text-gray-50"
                                        bgColor={colorKpi(((value.PercentJurosVendidos) * 100).toFixed())}
                                    />
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