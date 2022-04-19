import React, { Fragment, useContext, useEffect, useState } from 'react';
import Kpi from '../../Components/Kpis';
import { AuthContext } from '../../contexts/auth';
import TopBar from '../../Components/TopBar';
import Footer from '../../Components/Footer';

const Desempenho = () => {

    const { user, logout, conversaoKpis, filialuser, allFiliais } = useContext(AuthContext);

    const [currentFilial, setCurrentFilial] = useState(user.Filial);

    useEffect(() => {
        filialuser(currentFilial);
    });
    // console.log(conversaoKpis);
    return (
        <Fragment>
            <TopBar user={user} logout={logout} />
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center justify-between my-2">
                    <div className=" w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Melhor Desempenho da Rede
                    </div>

                    <div className="w-1/5 text-md text-gray-50 bg-solar-blue-200 px-4 py-1 rounded text-shadow text-md">
                        Atualização de dados:&nbsp;
                        {conversaoKpis.map((value) => (value.Atualizacao))}
                    </div>

                </div>
                <div className="grid gap-2 grid-cols-7 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Maior Faturamento" rotulo={value.RotuloFaturado} value={`R$ ${value.MelhorFaturado}`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Valor Meta" rotulo="" value={`R$ ${value.ValorMeta}`} titleColor="text-gray-500" valColor="text-green-600" />
                                <Kpi title="Meta Alcançada" rotulo="" value={`${((value.MetaAlcancada) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Melhor PP" rotulo={value.RotuloMelhorPP} value={`${((value.ValorMelhorPP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media PP" rotulo="" value={`${((value.MediaMelhorPP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Melhor GE" rotulo={value.RotuloMelhorGE} value={`${((value.ValorMelhorGE) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media GE" rotulo="" value={`${((value.MediaMelhorGE) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-6 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Melhor Desempenho" rotulo={value.RotuloMelhorVenda} value={`${((value.ValorMelhorVenda) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media Desempenho" rotulo="" value={`${((value.MediaMelhorVenda) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Melhor AP" rotulo={value.RotuloMelhorAP} value={`${((value.ValorMelhorAP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media AP" rotulo="" value={`${((value.MediaMelhorAP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Melhor EP" rotulo={value.RotuloMelhorEP} value={`${((value.ValorMelhorEP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media EP" rotulo="" value={`${((value.MediaMelhorEP) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                            </Fragment>
                        ))
                    }
                </div>
                <div className="grid gap-2 grid-cols-5 mb-2">
                    {
                        conversaoKpis.map((value, key) => (
                            <Fragment key={key}>
                                <Kpi title="Taxa de Juros" rotulo={value.RotuloTaxaJuros} value={`${((value.ValorTaxaJuros) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media Taxa Juros" rotulo="" value={`${((value.MediaTaxaJuros) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Melhor Projeção" rotulo={value.RotuloProjecao} value={`${((value.ValorProjecao) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                                <Kpi title="Media Projeção" rotulo="" value={`${((value.MediaProjecao) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-green-500" />
                                <Kpi title="Meta Dia" rotulo={value.RotuloMetaDia} value={`${((value.MetaAlcancadaDia) * 100).toFixed(2).replace('.', ',')}%`} titleColor="text-gray-500" valColor="text-blue-600" />
                            </Fragment>
                        ))
                    }
                </div>

            </div>
            <Footer />
        </Fragment>
    )
}

export default Desempenho;