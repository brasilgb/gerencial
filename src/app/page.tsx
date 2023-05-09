"use client"

import React, { Fragment, useContext, useEffect, useState } from 'react';
import AnaliseVencidos from "@/components/Charts/Combinations/AnaliseVencidos";
import ProjecaoVencidos from "@/components/Charts/Lines/ProjecaoVencidos";
import Kpis from "@/components/Kpis";
import apiphpmysql from "./api/apiphpmysql";
import AppLoading from "@/components/AppLoading";
import { IconContext } from "react-icons";
import { IoBarChartSharp, IoStorefront } from "react-icons/io5";
import "animate.css";
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";

type Props = {}

const Home = (props: Props) => {
  const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
  const [analiseRede, setAnaliseRede] = useState(false);
  const [valuesKpis, setValuesKpis] = useState([]);
  const [totalValuesKpis, setTotalValuesKpis] = useState([]);
  const [graficoVencidos, setGraficoVencidos] = useState([]);
  const [totalGraficoVencidos, setTotalGraficoVencidos] = useState([]);
  const [graficoProjecao, setGraficoProjecao] = useState([]);
  const [totalGraficoProjecao, setTotalGraficoProjecao] = useState([]);
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

  useEffect(() => {
    async function getKpis() {
      setLoadingPage(true)
      await apiphpmysql.get(`analisekpis/${atuFiliais}`)
        .then((kpis) => {
          const kpi = kpis.data.sort((a: any, b: any) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
          setValuesKpis(kpi);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getKpis();
  }, [atuFiliais]);

  // Analise Vencidos Fiiais
  useEffect(() => {
    setLoadingPage(true)
    async function getVencidos() {
      await apiphpmysql.get(`analisevencidos/${atuFiliais}`)
        .then((vencidos) => {
          const venc = vencidos.data.sort((a: any, b: any) => parseInt(a.uid) > parseInt(b.uid) ? 1 : -1);
          setGraficoVencidos(venc);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getVencidos();
  }, [atuFiliais]);

  // Analise projeções Filial
  useEffect(() => {
    setLoadingPage(true)
    async function getProjecoes() {
      await apiphpmysql.get(`analiseprojecao/${atuFiliais}`)
        .then((projecoes) => {
          const proj = projecoes.data.sort((a: any, b: any) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
          setGraficoProjecao(proj);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getProjecoes();
  }, [atuFiliais]);

  // Kpis total
  useEffect(() => {
    setLoadingPage(true)
    async function getKpisTotal() {
      await apiphpmysql.get('analisekpistotal')
        .then((kpis) => {
          setTotalValuesKpis(kpis.data);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getKpisTotal();
  }, []);

  // Analise Vencidos total
  useEffect(() => {
    setLoadingPage(true)
    async function getVencidosTotal() {
      await apiphpmysql.get('analisevencidostotal')
        .then((vencidos) => {
          vencidos.data.sort((a: any, b: any) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
          setTotalGraficoVencidos(vencidos.data);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getVencidosTotal();
  }, []);

  // Analise projeções Totais
  useEffect(() => {
    setLoadingPage(true)
    async function getProjecoesTotal() {
      await apiphpmysql.get('analiseprojecaototal')
        .then((projecoes) => {
          projecoes.data.sort((a: any, b: any) => parseInt(a.uid) < parseInt(b.uid) ? 1 : -1);
          setTotalGraficoProjecao(projecoes.data);
          setTimeout(() => {
            setLoadingPage(false)
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getProjecoesTotal();
  }, []);

  const handleLoadFilial = (filial: any) => {
    setFilialAtiva(filial);
  }
  return (
    <Fragment>

      <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
        <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Análise de Vencidos e á Vencer x Crediário</h1>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end">
            {user?.type === "S" ?
              <select
                className="w-full bg-solar-gray-dark shadow border border-white h-9 ml-2 uppercase text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light"
                name="cities"
                value={filialAtiva}
                onChange={(e: any) => handleLoadFilial(e.target.value)}
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
          {user?.type === "S" &&
            <button
              className={`${!analiseRede ? "bg-solar-orange-dark hover:bg-solar-yellow-dark" : "bg-solar-yellow-dark hover:bg-solar-orange-dark"} w-48 h-9 border border-white shadow px-4 flex items-center justify-center`}
              type="button"
              value="Ver analise de rede"
              onClick={() => setAnaliseRede(!analiseRede)}
            >
              <IconContext.Provider value={{ className: "text-xl text-solar-gray-light" }}>
                <div>
                  {analiseRede ? <IoStorefront /> : <IoBarChartSharp />}
                </div>
              </IconContext.Provider>
              <span className="text-xs uppercase font-semibold text-solar-gray-light ml-2">{!analiseRede ? "Análise da rede" : "Análise  por filial"}</span>
            </button>
          }
        </div>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {(analiseRede ? totalValuesKpis : valuesKpis).map((value: any) => (value.Atualizacao))}</h1>
        </div>
      </div>

      {loadingPage
        ? <AppLoading />
        : <div className="animate__animated animate__fadeIn mb-2">
          {
            (analiseRede ? totalValuesKpis : valuesKpis).map((value: any, idxKpi: any) => (
              <div key={idxKpi} className="grid grid-cols-6 gap-4 mx-4 my-3">
                <Kpis classname="" title="Valor Crediário" value={`R$ ${value.ValorCrediario}`} valueColor="text-blue-600" />
                <Kpis classname="" title="Valor à Vencer" value={`R$ ${value.ValorVencer}`} valueColor="text-green-600" />
                <Kpis classname="" title="% Rep. à Vencer S/ Crediário" value={value.RepVencer} valueColor="text-teal-500" />
                <Kpis classname="" title="Valor Vencido" value={`R$ ${value.ValorVencido}`} valueColor="text-red-500" />
                <Kpis classname="" title="% Rep. Vencido S/ Crediário" value={value.RepVencido} valueColor="text-red-500" />
                <Kpis classname="" title="% Rep. Proj. Venc. S/ Crediário" value={value.RepProjVencido} valueColor="text-purple-500" />
              </div>
            ))}
          <div className="bg-solar-gray-light mx-4 shadow p-2 mb-3 border border-white">
            <div className="mb-2 flex items-center justify-center bg-solar-gray-light">
              <AnaliseVencidos data={(analiseRede ? totalGraficoVencidos : graficoVencidos)} />
            </div>
          </div>
          <div className="bg-solar-gray-light mx-4 shadow p-4 border border-white">
            <div className="mb-2 flex items-center justify-center bg-solar-gray-light">
              <ProjecaoVencidos data={(analiseRede ? totalGraficoProjecao : graficoProjecao)} />
            </div>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default Home;