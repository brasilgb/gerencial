"use client"
import React, { Fragment, useContext, useEffect, useState } from 'react'
import apiphpmysql from "../api/apiphpmysql";
import AppLoading from "@/components/AppLoading";
import BoxAnalise from "@/components/Boxes";
import Kpis from "@/components/Kpis";
import KpiList from "@/components/KpiList";
import FormatMoney from "@/components/FormatMoney";
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";

type Props = {}

const AnaliseVendedor = (props: Props) => {
  const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
  const [analiseVendedoresKpis, setAnaliseVendedoresKpis] = useState([]);
  const [conversaoVendedoresKpis, setConversaoVendedoresKpis] = useState([]);
  const [allFiliais, setAllFiliais] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;

  useEffect(() => {
    async function getAllFiliais() {
      await apiphpmysql.get(`analisekpis/${0}`)
        .then((filiais) => {
          const fsort = filiais.data.sort((a: any, b: any) => a.CodFilial > b.CodFilial ? 1 : -1);
          setAllFiliais(fsort);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAllFiliais();
  }, []);

  // Gerencial analise de vendedores
  useEffect(() => {
    setLoadingPage(true);
    async function getAnaliseVendedores() {
      await apiphpmysql.get(`analisevendedores/${atuFiliais}`)
        .then((analisevendedores) => {
          const vend = analisevendedores.data.sort((a: any, b: any) => parseInt(a.ValorVenda) < parseInt(b.ValorVenda) ? 1 : -1);
          setAnaliseVendedoresKpis(vend);
          setTimeout(() => {
            setLoadingPage(false);
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAnaliseVendedores();
  }, [atuFiliais]);

  // Gerencial Melhor Conversão de vendedores
  useEffect(() => {
    setLoadingPage(true);
    async function getConversaoVendedores() {
      await apiphpmysql.get(`conversaovendedores/${atuFiliais}`)
        .then((cvendedores) => {
          const vend = cvendedores.data.sort((a: any, b: any) => parseInt(a.ValorVenda) < parseInt(b.ValorVenda) ? 1 : -1);
          setConversaoVendedoresKpis(vend);
          setTimeout(() => {
            setLoadingPage(false);
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getConversaoVendedores();
  }, [atuFiliais]);

  const handleLoadFilial = (filial: any) => {
    setFilialAtiva(filial);
  }

  const colorKpi = ((value: any) => {
    if (value <= 90) return "text-red-600";
    if (value <= 98) return "text-orange-400";
    if (value > 90) return "text-emerald-500";
  });

  return (
    <Fragment>
      <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow cureo">
        <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Análise de Vendedores</h1>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end">
            {user?.type === "S" ?
              <select
                className="w-full bg-solar-gray-dark shadow border border-white h-9 ml-2 uppercase text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light"
                name="cities"
                value={filialAtiva}
                onChange={(e) => handleLoadFilial(e.target.value)}
              >
                <option value="" className="text-sm font-semibold">Selecione a filial</option>
                {allFiliais.map((filial: any, idxFil: any) => (
                  <option key={idxFil} value={filial.CodFilial} className="text-sm font-medium">{("00" + filial.CodFilial).slice(-2)} - {filial.Filial}</option>
                ))}
              </select>
              : <div className="w-full flex items-center justify-center bg-solar-gray-dark shadow border border-white h-9 ml-2 uppercase text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light">
                {allFiliais.filter((sf: any) => (sf.CodFilial == atuFiliais)).map((lf: any) => (lf.CodFilial + ' - ' + lf.Filial))}
              </div>
            }
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">

        </div>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {analiseVendedoresKpis.map((value: any) => (value.Atualizacao)).filter((value, index, self) => self.indexOf(value) === index)}</h1>
        </div>
      </div>

      {loadingPage
        ? <AppLoading />
        : <div className="animate__animated animate__fadeIn mx-4 mb-2">
          <BoxAnalise title="Desempenho" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
            <div className="grid gap-2 grid-cols-3">
              {
                conversaoVendedoresKpis.map((value: any, key: any) => (
                  <Fragment key={key}>
                    <Kpis
                      title="Melhor Conversão"
                      rotulo={value.RotuloMelhorVenda} value={`${((value.ValorMelhorVenda > 0 ? value.ValorMelhorVenda : 0) * 100).toFixed(2)}%`}
                      titleColor="text-gray-500"
                      valueColor="text-green-500"
                      classname="!bg-white !shadow-none !border-gray-200"
                    />
                    <Kpis
                      title="Melhor Taxa Juros"
                      rotulo={value.ValorMelhorJuro > 0 ? value.RotuloMelhorJuro : '****'}
                      value={`${((value.ValorMelhorJuro > 0 ? value.ValorMelhorJuro : 0) * 100).toFixed(2)}%`}
                      titleColor="text-gray-500"
                      valueColor="text-green-500"
                      classname="!bg-white !shadow-none !border-gray-200"
                    />
                    <Kpis
                      title="Melhor PP"
                      rotulo={value.ValorMelhorPP > 0 ? value.RotuloMelhorPP : '****'}
                      value={`${((value.ValorMelhorPP > 0 ? value.ValorMelhorPP : 0) * 100).toFixed(2)}%`}
                      titleColor="text-gray-500"
                      valueColor="text-green-500"
                      classname="!bg-white !shadow-none !border-gray-200"
                    />
                  </Fragment>
                ))
              }
            </div>
          </BoxAnalise>

          {
            analiseVendedoresKpis
              .filter((val: any) => (val.ValorVenda > 0))
              .map((value: any, key: any) => (
                <Fragment key={key}>
                  <BoxAnalise title={value.CodigoVendedor + ' - ' + value.NomeVendedor} textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                    <div className="grid gap-2 grid-cols-9">
                      <KpiList
                        title="Valor Faturado"
                        value={<FormatMoney value={value.ValorVenda} />}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentualVenda) * 100).toFixed())}
                      />
                      <KpiList
                        title="Valor Meta"
                        value={<FormatMoney value={value.MetaVenda} />}
                        titleColor="text-gray-500"
                        valColor="text-blue-500"
                      />
                      <KpiList
                        title="Meta"
                        value={`${((value.PercentualVenda) * 100).toFixed(2)}%`}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentualVenda) * 100).toFixed())}
                      />
                      <KpiList
                        title="Margem"
                        value={`${((value.Margem) * 100).toFixed(2)}%`}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.Margem) * 100).toFixed())}
                      />

                      <KpiList
                        title="Valor PP"
                        value={value.ValorPP}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentualPP) * 100).toFixed())}
                      />
                      <KpiList
                        title="Meta PP"
                        value={value.MetaPP}
                        titleColor="text-gray-500"
                        valColor="text-blue-500"
                      />
                      <KpiList
                        title="Rep. PP"
                        value={`${((value.PercentualPP) * 100).toFixed(2)}%`}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentualPP) * 100).toFixed())}
                      />

                      <KpiList
                        title="Juros Vendidos"
                        value={<FormatMoney value={value.ValorJurosVendidos} />}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentJurosVendidos) * 100).toFixed())}
                      />
                      <KpiList
                        title="Rep. Juros"
                        value={`${((value.PercentJurosVendidos) * 100).toFixed(2)}%`}
                        titleColor="text-gray-500"
                        valColor={colorKpi(((value.PercentJurosVendidos) * 100).toFixed())}
                      />
                    </div>
                  </BoxAnalise>
                </Fragment>
              ))
          }
        </div>
      }
    </Fragment>
  )
}

export default AnaliseVendedor;