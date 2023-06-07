"use client"

import React, { Fragment, useEffect, useState } from "react";
import apiphpmysql from "../api/apiphpmysql";
import AppLoading from "@/components/AppLoading";
import Kpis from "@/components/Kpis";
import Progress from "@/components/Charts/Progress";
import BoxAnalise from "@/components/Boxes";
import FormatMoney from "@/components/FormatMoney";

type Props = {}

const DesempenhoFiliais = (props: Props) => {
  const [loadingPage, setLoadingPage] = useState(false);
  const [conversaoKpis, setConversaoKpis] = useState([]);

  useEffect(() => {
    const getConversao = (async () => {
      setLoadingPage(true);
      await apiphpmysql.get('conversaofiliais')
        .then((conversao) => {
          setConversaoKpis(conversao.data);
          setTimeout(() => {
            setLoadingPage(false);
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    });
    getConversao();

  }, []);

  const colorBar = ((value: any) => {
    if (value <= 90) return "#DC2626";
    if (value <= 98) return "#FB923C";
    if (value > 90) return "#10B981";
  });

  const colorKpi = ((value: any) => {
    if (value <= 90) return "text-red-600";
    if (value <= 98) return "text-orange-400";
    if (value > 90) return "text-emerald-500";
  });

  return (
    <Fragment>
      <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
        <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Análise de Vencidos e á Vencer x Crediário</h1>
        </div>
        <div className="flex-1">

        </div>
        <div className="flex flex-1 items-center justify-center">

        </div>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {conversaoKpis.map((value: any) => (value.Atualizacao))}</h1>
        </div>
      </div>

      {loadingPage
        ? <AppLoading />
        : <div className="animate__animated animate__fadeIn mx-4">
          <div className="grid gap-2 grid-cols-3">
            <div className="col-span-2">
              <BoxAnalise title="Faturamento" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-3">
                  {
                    conversaoKpis.map((value: any, key: any) => (
                      <Fragment key={key}>
                        <Kpis
                          title="Maior Faturamento"
                          rotulo={value.RotuloFaturado}
                          value={<FormatMoney value={value.MelhorFaturado} />}
                          titleColor="text-gray-500"
                          valueColor={colorKpi(((value.MetaAlcancada > 0 ? value.MetaAlcancada : 0) * 100).toFixed(2))}
                          classname="!bg-white !shadow-none !border-gray-200"
                        />
                        <Kpis
                          title="Valor Meta"
                          value={<FormatMoney value={value.ValorMeta} />}
                          titleColor="text-gray-500"
                          valueColor="text-blue-500"
                          classname="!bg-white !shadow-none !border-gray-200"
                        />
                        <Progress
                          value={((value.MetaAlcancada > 0 ? value.MetaAlcancada : 0) * 100).toFixed(2)}
                          title="Alcançado"
                          colorBar={colorBar(((value.MetaAlcancada > 0 ? value.MetaAlcancada : 0) * 100).toFixed(2))}
                          colorText={colorBar(((value.MetaAlcancada > 0 ? value.MetaAlcancada : 0) * 100).toFixed(2))}
                        />
                      </Fragment>
                    ))
                  }
                </div>
              </BoxAnalise>
            </div>
            <div>
              <BoxAnalise title="Projeção" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-2">
                  {
                    conversaoKpis.map((value: any, key: any) => (
                      <Fragment key={key}>
                        <Kpis
                          title="Melhor Projeção"
                          rotulo={value.RotuloProjecao}
                          value={`${((value.ValorProjecao > 0 ? value.ValorProjecao : 0) * 100).toFixed(2).replace('.', ',')}%`}
                          titleColor="text-gray-500"
                          valueColor={colorKpi(((value.ValorProjecao > 0 ? value.ValorProjecao : 0) * 100).toFixed())}
                          classname="!bg-white !shadow-none !border-gray-200"
                        />
                        <Progress
                          value={((value.MediaProjecao > 0 ? value.MediaProjecao : 0) * 100).toFixed(2)}
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

          <div className="grid gap-2 grid-cols-3">
            <div>
              <BoxAnalise title="Desempenho" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-2">
                  {
                    conversaoKpis.map((value: any, key: any) => (
                      <Fragment key={key}>
                        <Kpis
                          title="Melhor Desempenho"
                          rotulo={value.RotuloMelhorVenda}
                          value={`${((value.ValorMelhorVenda > 0 ? value.ValorMelhorVenda : 0) * 100).toFixed(2).replace('.', ',')}%`}
                          titleColor="text-gray-500"
                          valueColor={colorKpi(((value.ValorMelhorVenda > 0 ? value.ValorMelhorVenda : 0) * 100).toFixed())}
                          classname="!bg-white !shadow-none !border-gray-200"
                        />
                        <Progress
                          value={((value.MediaMelhorVenda > 0 ? value.MediaMelhorVenda : 0) * 100).toFixed(2)}
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
              <BoxAnalise title="Taxa de Juros" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-2">
                  {
                    conversaoKpis.map((value: any, key: any) => (
                      <Fragment key={key}>
                        <Kpis
                          title="Taxa de Juros"
                          rotulo={value.RotuloTaxaJuros}
                          value={`${((value.ValorTaxaJuros > 0 ? value.ValorTaxaJuros : 0) * 100).toFixed(2).replace('.', ',')}%`}
                          titleColor="text-gray-500"
                          valueColor={colorKpi(((value.ValorTaxaJuros > 0 ? value.ValorTaxaJuros : 0) * 100).toFixed())}
                          classname="!bg-white !shadow-none !border-gray-200"
                        />
                        <Progress
                          value={((value.MediaTaxaJuros > 0 ? value.MediaTaxaJuros : 0) * 100).toFixed(2)}
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
            <BoxAnalise title="Meta Diária" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
              <div>
                {
                  conversaoKpis.map((value: any, key: any) => (
                    <Fragment key={key}>
                      <Kpis
                        title="Meta Dia"
                        rotulo={value.RotuloMetaDia}
                        value={`${((value.MetaAlcancadaDia > 0 ? value.MetaAlcancadaDia : 0) * 100).toFixed(2).replace('.', ',')}%`}
                        titleColor="text-gray-500"
                        valueColor={colorKpi(((value.MetaAlcancadaDia > 0 ? value.MetaAlcancadaDia : 0) * 100).toFixed())}
                        classname="!bg-white !shadow-none !border-gray-200 !py-[50px]"
                      />
                    </Fragment>
                  ))
                }
              </div>
            </BoxAnalise>
          </div>
        </div>
      }

    </Fragment>
  )
}

export default DesempenhoFiliais;