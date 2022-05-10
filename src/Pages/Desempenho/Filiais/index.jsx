import React, { Fragment, useContext } from 'react';
import Kpi from '../../../Components/Kpis';
import { AuthContext } from '../../../contexts/auth';
import TopBar from '../../../Components/TopBar';
import Footer from '../../../Components/Footer';
import FormatMoney from '../../../Components/FormatMoney';
import Progress from '../../../Components/Charts/Progress';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';

const DesempenhoFiliais = () => {

    const { user, logout, conversaoKpis } = useContext(AuthContext);

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
                        Melhor Desempenho da Rede
                    </div>
                    <div className="w-2/5 text-md text-gray-500 px-4 rounded text-shadow">

                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {conversaoKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>

                <div className="grid gap-2 grid-cols-3">
                    <div className="col-span-2">
                        <BoxAnalise title="Faturamento" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-3">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Maior Faturamento"
                                                rotulo={value.RotuloFaturado}
                                                value={<FormatMoney value={value.MelhorFaturado} />}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.MetaAlcancada>0?value.MetaAlcancada:0) * 100).toFixed(2))}
                                            />
                                            <Kpi
                                                title="Valor Meta"
                                                rotulo=""
                                                value={<FormatMoney value={value.ValorMeta} />}
                                                titleColor="text-gray-500"
                                                valColor="text-blue-500"
                                            />
                                            <Progress
                                                value={((value.MetaAlcancada>0?value.MetaAlcancada:0) * 100).toFixed(2)}
                                                title="Alcançado"
                                                colorBar={colorBar(((value.MetaAlcancada>0?value.MetaAlcancada:0) * 100).toFixed(2))}
                                                colorText={colorBar(((value.MetaAlcancada>0?value.MetaAlcancada:0) * 100).toFixed(2))}
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div>
                        <BoxAnalise title="Operações PP - Prestação Protegida" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Melhor PP"
                                                rotulo={value.RotuloMelhorPP}
                                                value={`${((value.ValorMelhorPP>0?value.ValorMelhorPP:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorMelhorPP>0?value.ValorMelhorPP:0) * 100).toFixed(2))}
                                            />
                                            <Progress
                                                value={((value.MediaMelhorPP>0?value.MediaMelhorPP:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    {/* <div>
                        <BoxAnalise title="Operações GE - Garantia Estendida" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>

                                            <Kpi title="Melhor GE" rotulo={value.RotuloMelhorGE} value={`${((value.ValorMelhorGE) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-600" />
                                            <Progress value={((value.MediaMelhorGE) * 100).toFixed(2)} title="Média" colorBar="#248f20" colorText="#5ab44e" />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div> */}
                </div>

                <div className="grid gap-2 grid-cols-3">
                    <div>
                        <BoxAnalise title="Desempenho" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Melhor Desempenho"
                                                rotulo={value.RotuloMelhorVenda}
                                                value={`${((value.ValorMelhorVenda>0?value.ValorMelhorVenda:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorMelhorVenda>0?value.ValorMelhorVenda:0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.MediaMelhorVenda>0?value.MediaMelhorVenda:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div>
                        <BoxAnalise title="Operações AP - Acidentes Pessoais" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Melhor AP"
                                                rotulo={value.RotuloMelhorAP}
                                                value={`${((value.ValorMelhorAP>0?value.ValorMelhorAP:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorMelhorAP>0?value.ValorMelhorAP:0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.MediaMelhorAP>0?value.MediaMelhorAP:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>

                    <div>
                        <BoxAnalise title="Operações EP - Empréstimo Pessoal" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Melhor EP"
                                                rotulo={value.RotuloMelhorEP}
                                                value={`${((value.ValorMelhorEP>0?value.ValorMelhorEP:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorMelhorEP>0?value.ValorMelhorEP:0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.MediaMelhorEP>0?value.MediaMelhorEP:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                </div>

                <div className="grid gap-2 grid-cols-5">
                    <div className="col-span-2">
                        <BoxAnalise title="Projeção" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Melhor Projeção"
                                                rotulo={value.RotuloProjecao}
                                                value={`${((value.ValorProjecao>0?value.ValorProjecao:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorProjecao>0?value.ValorProjecao:0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.MediaProjecao>0?value.MediaProjecao:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div className="col-span-2">
                        <BoxAnalise title="Taxa de Juros" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-2">
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Taxa de Juros"
                                                rotulo={value.RotuloTaxaJuros}
                                                value={`${((value.ValorTaxaJuros>0?value.ValorTaxaJuros:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.ValorTaxaJuros>0?value.ValorTaxaJuros:0) * 100).toFixed())}
                                            />
                                            <Progress
                                                value={((value.MediaTaxaJuros>0?value.MediaTaxaJuros:0) * 100).toFixed(2)}
                                                title="Média"
                                                colorBar="#e4a548"
                                                colorText="#f0c129"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                    <div>
                        <BoxAnalise title="Meta Diária" textColor="text-gray-500" borderColor="border-gray-200">
                            <div>
                                {
                                    conversaoKpis.map((value, key) => (
                                        <Fragment key={key}>
                                            <Kpi
                                                title="Meta Dia"
                                                rotulo={value.RotuloMetaDia}
                                                value={`${((value.MetaAlcancadaDia>0?value.MetaAlcancadaDia:0) * 100).toFixed(2).replace('.', ',')}%`}
                                                titleColor="text-gray-500"
                                                valColor={colorKpi(((value.MetaAlcancadaDia>0?value.MetaAlcancadaDia:0) * 100).toFixed())}
                                                padding="pb-14 pt-12"
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </BoxAnalise>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}

export default DesempenhoFiliais;