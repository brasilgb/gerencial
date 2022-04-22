import React, { Fragment, useContext, useEffect, useState } from 'react';
import Kpi from '../../../Components/Kpis';
import { AuthContext } from '../../../contexts/auth';
import TopBar from '../../../Components/TopBar';
import Footer from '../../../Components/Footer';
import FormatMoney from '../../../Components/FormatMoney';
import Progress from '../../../Components/Charts/Progress';
import BoxAnalise from '../../../Components/Boxes/BoxAnalise';

const DesempenhoFiliais = () => {

    const { user, logout, conversaoKpis } = useContext(AuthContext);

    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Melhor Desempenho da Rede
                    </div>
                    <div className="w-2/5 text-md text-gray-500 px-4 rounded text-shadow">
                        Análise de filiais
                    </div>
                    <div className="w-1/5">

                    </div>
                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {conversaoKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>

                <div className="grid gap-2 grid-cols-4">
                    <div className="col-span-2">
                    <BoxAnalise title="Operações EP - Empréstimo Pessoal" textColor="text-gray-500" borderColor="border-gray-200">
                            <div className="grid gap-2 grid-cols-3">
                        {
                            conversaoKpis.map((value, key) => (
                                <Fragment key={key}>

                                    <Kpi title="Maior Faturamento" rotulo={value.RotuloFaturado} value={<FormatMoney value={value.MelhorFaturado} />} titleColor="text-gray-500" valColor="text-blue-500" />
                                    <Kpi title="Valor Meta" rotulo="" value={<FormatMoney value={value.ValorMeta} />} titleColor="text-gray-500" valColor="text-blue-500" />
                                    <Progress value={((value.MetaAlcancada) * 100).toFixed(2)} title="Meta" colorBar="#1a95fa" colorText="#4fb6fa" />
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

                                    <Kpi title="Melhor PP" rotulo={value.RotuloMelhorPP} value={`${((value.ValorMelhorPP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-yellow-500" />
                                    <Progress value={((value.MediaMelhorPP) * 100).toFixed(2)} title="Média" colorBar="#e4a548" colorText="#f0c129" />
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

                                    <Kpi title="Melhor GE" rotulo={value.RotuloMelhorGE} value={`${((value.ValorMelhorGE) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-600" />
                                    <Progress value={((value.MediaMelhorGE) * 100).toFixed(2)} title="Média" colorBar="#248f20" colorText="#5ab44e" />
                                </Fragment>
                            ))
                        }
                        </div>
                        </BoxAnalise>
                    </div>
                </div>

                <div className="grid gap-2 grid-cols-7 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>

                                <Kpi title="Maior Faturamento" rotulo={value.RotuloFaturado} value={<FormatMoney value={value.MelhorFaturado} />} titleColor="text-gray-500" valColor="text-blue-500" />
                                <Kpi title="Valor Meta" rotulo="" value={<FormatMoney value={value.ValorMeta} />} titleColor="text-gray-500" valColor="text-blue-500" />
                                <Progress value={((value.MetaAlcancada) * 100).toFixed(2)} title="Meta" colorBar="#1a95fa" colorText="#4fb6fa" />

                                <Kpi title="Melhor PP" rotulo={value.RotuloMelhorPP} value={`${((value.ValorMelhorPP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-yellow-500" />
                                <Progress value={((value.MediaMelhorPP) * 100).toFixed(2)} title="Média" colorBar="#e4a548" colorText="#f0c129" />

                                <Kpi title="Melhor GE" rotulo={value.RotuloMelhorGE} value={`${((value.ValorMelhorGE) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Progress value={((value.MediaMelhorGE) * 100).toFixed(2)} title="Média" colorBar="#248f20" colorText="#5ab44e" />
                            </Fragment>
                        ))
                    }
                </div>

                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Melhor Desempenho" rotulo={value.RotuloMelhorVenda} value={`${((value.ValorMelhorVenda) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Progress value={((value.MediaMelhorVenda) * 100).toFixed(2)} title="Média" colorBar="#248f20" colorText="#5ab44e" />
                                <Kpi title="Melhor AP" rotulo={value.RotuloMelhorAP} value={`${((value.ValorMelhorAP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-500" />
                                <Progress value={((value.MediaMelhorAP) * 100).toFixed(2)} title="Média" colorBar="#1a95fa" colorText="#4fb6fa" />
                                <Kpi title="Melhor EP" rotulo={value.RotuloMelhorEP} value={`${((value.ValorMelhorEP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-yellow-500" />
                                <Progress value={((value.MediaMelhorEP) * 100).toFixed(2)} title="Média" colorBar="#e4a548" colorText="#f0c129" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-5 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Taxa de Juros" rotulo={value.RotuloTaxaJuros} value={`${((value.ValorTaxaJuros) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-yellow-500" />
                                <Progress value={((value.MediaTaxaJuros) * 100).toFixed(2)} title="Média" colorBar="#e4a548" colorText="#f0c129" />
                                <Kpi title="Melhor Projeção" rotulo={value.RotuloProjecao} value={`${((value.ValorProjecao) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Progress value={((value.MediaProjecao) * 100).toFixed(2)} title="Média" colorBar="#248f20" colorText="#5ab44e" />
                                <Kpi title="Meta Dia" rotulo={value.RotuloMetaDia} value={`${((value.MetaAlcancadaDia) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-500" />
                            </Fragment>
                        ))
                    }
                </div>

            </div>
            <Footer />
        </Fragment>
    )
}

export default DesempenhoFiliais;