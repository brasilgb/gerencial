"use client"

import React, { Fragment, useContext, useEffect, useState } from "react";
import AppLoading from "@/components/AppLoading";
import apiphpmysql from "../api/apiphpmysql";
import Kpis from "@/components/Kpis";
import BoxAnalise from "@/components/Boxes";
import FormatMoney from "@/components/FormatMoney";
import Progress from "@/components/Charts/Progress";
import ProgressBar from "@/components/Charts/ProgressBar";
import 'animate.css';
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";

type Props = {

}

const AnaliseFiliais = (props: Props) => {
  const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingFilial, setLoadingFilial] = useState(false);
  const [allFiliais, setAllFiliais] = useState([]);
  const [analiseFiliaisKpis, setAnaliseFiliaisKpis] = useState([]);
  const [inadimplenciaKpis, setInadimplenciaKpis] = useState([]);
  const [giroEstoqueKpis, setGiroEstoqueKpis] = useState([]);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;

  useEffect(() => {
    async function getAllFiliais() {
      setLoadingFilial(true)
      await apiphpmysql.get(`filiaisativas`)
        .then((filiais) => {
          const fsort = filiais.data.sort((a: any, b: any) => a.CodFilial > b.CodFilial ? 1 : -1);
            setLoadingFilial(false);
          setAllFiliais(fsort);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAllFiliais();
  }, []);

  // Gerencial analise de filiais
  useEffect(() => {
    setLoadingPage(true)
    async function getAnaliseFiliais() {
      await apiphpmysql.get(`analisefiliais/${atuFiliais}`)
        .then((analisefiliais) => {
          const venc = analisefiliais.data.sort((a: any, b: any) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
          setAnaliseFiliaisKpis(venc);
            setLoadingPage(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAnaliseFiliais();
  }, [atuFiliais]);

  // Gerencial Inadimplencia
  useEffect(() => {
    setLoadingPage(true)
    async function getInadimplencia() {
      await apiphpmysql.get(`inadimplencia/${atuFiliais}`)
        .then((inadimplencia) => {
          const inad = inadimplencia.data.sort((a: any, b: any) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
          setInadimplenciaKpis(inad);
            setLoadingPage(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getInadimplencia();
  }, [atuFiliais]);

  // Gerencial Giro Estoque
  useEffect(() => {
    setLoadingPage(true)
    async function getGiroEstoque() {
      await apiphpmysql.get(`giroestoque/${atuFiliais}`)
        .then((giro) => {
          const gir = giro.data.sort((a: any, b: any) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
          setGiroEstoqueKpis(gir);
            setLoadingPage(false);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getGiroEstoque();
  }, [atuFiliais]);

  const handleLoadFilial = (filial: any) => {
    setFilialAtiva(filial);
  }

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
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Análise de filiais</h1>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end">
            {user?.type === "S" ?
              <select
                className={`w-full duration-300 bg-solar-gray-dark shadow border border-white h-9 ml-2 text-sm font-semibold ${loadingFilial ? 'text-gray-500' : 'text-solar-blue-dark'} focus:ring-0 focus:border-solar-gray-light`}
                name="cities"
                value={filialAtiva}
                onChange={(e: any) => handleLoadFilial(e.target.value)}
              >
                {loadingFilial && <option className="text-sm font-semibold">Carregando filiais ...</option>}

                {allFiliais.map((filial: any, idxFil: any) => (
                  <option key={idxFil} value={filial.CodFilial} className="text-sm font-medium">{("00" + filial.CodFilial).slice(-2)} - {filial.NomeFilial}</option>
                ))}
              </select>
              : <div className="w-full flex items-center justify-center bg-solar-gray-dark shadow border border-white h-9 ml-2 text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light">
                {allFiliais.filter((sf: any) => (sf.CodFilial == atuFiliais)).map((lf: any) => (lf.CodFilial + ' - ' + lf.NomeFilial))}
              </div>
            }
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">

        </div>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {analiseFiliaisKpis?.map((value: any) => (value.Atualizacao))}</h1>
        </div>
      </div>
      {loadingPage
        ? <AppLoading />
        :
        <div className="animate__animated animate__fadeIn">
          <div className="grid gap-2 grid-cols-3 px-4">
            <div className="col-span-2">
              <BoxAnalise title="Faturamento" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-4">
                  {
                    analiseFiliaisKpis?.map((value: any, idxOne: any) => (
                      <Fragment key={idxOne}>

                        <Kpis
                          title="Valor Faturado"
                          value={<FormatMoney value={value.Valor_Faturado} />}
                          titleColor="text-gray-500"
                          classname="!bg-white !shadow-none !border-gray-200"
                          valueColor={colorKpi(((value.Meta_Vendas) * 100).toFixed())}
                        />
                        <Kpis
                          title="Valor Meta"
                          value={<FormatMoney value={value.Valor_Meta} />}
                          titleColor="text-gray-500"
                          classname="!bg-white !shadow-none !border-gray-200"
                          valueColor="text-blue-500"
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
              <BoxAnalise title="Projeção" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-2">
                  {
                    analiseFiliaisKpis?.map((value: any, idxTwo: any) => (
                      <Fragment key={idxTwo}>
                        <Kpis
                          title="Projeção Venda"
                          value={< FormatMoney value={value.ValorProjecaoVenda > 0 ? value.ValorProjecaoVenda : 0} />}
                          titleColor="text-gray-500"
                          valueColor={colorKpi(((value.ValorProjecaoVenda > 0 ? value.PercentProjecaoVenda : 0) * 100).toFixed())}
                          classname="!bg-white !shadow-none !border-gray-200"
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

          <div className="grid gap-2 grid-cols-3 px-4">
            <div className="col-span-2">
              <BoxAnalise title="Faturamento diário" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                <div className="grid gap-2 grid-cols-3">
                  {
                    analiseFiliaisKpis?.map((value: any, idxThree: any) => (
                      <Fragment key={idxThree}>

                        <Kpis
                          title="Valor Faturado"
                          value={<FormatMoney value={value.ValorFaturamentoDia} />}
                          titleColor="text-gray-500"
                          classname="!bg-white !shadow-none !border-gray-200"
                          valueColor={colorKpi(((value.ValorAlcancadoDia > 0 ? value.ValorAlcancadoDia : 0) * 100).toFixed())}
                        />
                        <Kpis
                          title="Valor Meta"
                          value={<FormatMoney value={value.ValorMetaDia > 0 ? value.ValorMetaDia : 0} />}
                          titleColor="text-gray-500"
                          classname="!bg-white !shadow-none !border-gray-200"
                          valueColor="text-blue-500"
                        />
                        <ProgressBar
                          value={((value.ValorAlcancadoDia) * 100).toFixed(2)}
                          title="Alcançada"
                          colorBar={colorBar(((value.ValorAlcancadoDia) * 100).toFixed())}
                          colorText={''}
                        // width={410}
                        />
                      </Fragment>
                    ))
                  }
                </div>
              </BoxAnalise>
            </div>

            <div>
              <BoxAnalise title="Inadimplência" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
                {
                  inadimplenciaKpis.map((value: any, idxFive: any) => (
                    <Fragment key={idxFive}>
                      <ProgressBar
                        value={((value.PercentInadimplencia) * 100).toFixed(2)}
                        title="Inadimplência"
                        colorBar={((value.PercentInadimplencia) * 100).toFixed() < '2' ? "#10B981" : "#DC2626"}
                        colorText="#241d09"
                      // width={590}
                      />
                    </Fragment>
                  ))
                }
              </BoxAnalise>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-2 px-4">
            <BoxAnalise title="Taxa de juros" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
              <div className="grid gap-2 grid-cols-2">
                {
                  analiseFiliaisKpis?.map((value: any, idxFour: any) => (
                    <Fragment key={idxFour}>
                      <Kpis
                        title="Taxa de juros"
                        value={<FormatMoney value={value.ValorTaxaJuros} />}
                        titleColor="text-gray-500"
                        valueColor={colorKpi(((value.TaxaJurosFilial) * 100).toFixed())}
                        classname="!bg-white !shadow-none !border-gray-200"
                      />
                      <ProgressBar
                        value={((value.TaxaJurosFilial) * 100).toFixed(2)}
                        title="Juros"
                        colorBar={colorBar(((value.TaxaJurosFilial) * 100).toFixed())}
                        colorText={"#000"}
                      />
                    </Fragment>
                  ))
                }
              </div>
            </BoxAnalise>

            <BoxAnalise title="Giro Estoque" textColor="!font-semibold text-solar-blue-dark" borderColor="border-gray-200">
              <div className="grid gap-2 grid-cols-2">
                {
                  giroEstoqueKpis?.map((value: any, idxSix: any) => (
                    <Fragment key={idxSix}>
                      <Kpis
                        title="Giro estoque Loja"
                        value={`${value.GiroEstoqueLoja}`}
                        titleColor="text-gray-500"
                        valueColor="text-blue-600"
                        classname="!bg-white !shadow-none !border-gray-200 !py-[43.4px]"
                      />
                      <Kpis
                        title="Giro estoque Rede"
                        value={`${(value.GiroEstoqueRede * 1).toFixed()}`}
                        titleColor="text-gray-500"
                        valueColor="text-green-600"
                        classname="!bg-white !shadow-none !border-gray-200 !py-[43.4px]"
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

export default AnaliseFiliais;