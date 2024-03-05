"use client"

import React, { Fragment, useContext, useEffect, useState } from 'react'
import apiphpmysql from "../api/apiphpmysql";
import AppLoading from "@/components/AppLoading";
import BoxAnalise from "@/components/Boxes";
import { STable, STd, STh, STr } from "@/components/Tables";
import { AuthContext } from "@/contexts/auth";
import apiiscobol from "../api/apiiscobol";
import { dreListDataValue } from "@/function/der-list-data-value";
import { listUserAuthenticated } from "@/function/list-user-autenticated";
import moment from "moment";

type Props = {}

const Dre = (props: Props) => {
  const {
    user,
    filialAtiva,
    setFilialAtiva,
    yearExists,
    setYearSelected,
    yearSelected } = useContext(AuthContext);

  const [allFiliais, setAllFiliais] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingFilial, setLoadingFilial] = useState(false);
  const [dreEstrutura, setDreEstrutura] = useState([]);
  const [dreData, setDreData] = useState([]);
  const [dreDataTotal, setDreDataTotal] = useState([]);
  const [dreDataTotalAnterior, setDreDataTotalAnterior] = useState([]);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;

  useEffect(() => {
    async function getAllFiliais() {
      setLoadingFilial(true);
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

  useEffect(() => {
    const getDreEstrutura = (async () => {
      setLoadingPage(true);
      await apiiscobol.get(`(DRE_ESTRU)`)
        .then((response) => {
          setDreEstrutura(response.data.bi058.bidata);
          setLoadingPage(false);
        }).catch((error) => {
          console.log(error);
        })
    });
    getDreEstrutura();
  }, [])

  useEffect(() => {
    const getDreData = (async () => {
      setLoadingPage(true);
      await apiiscobol.post(`(DRE_REL)`,
        {
          "dreidenti": 3,
          "dredepto": 1,
          "drefilial": atuFiliais,
          "dreano": `${yearSelected}`
        })
        .then((response) => {
          setDreData(response.data.bi057.bidata);
          setLoadingPage(false);
        }).catch((error) => {
          console.log(error);
        })
    });
    getDreData();
  }, [atuFiliais, yearSelected]);

  useEffect(() => {
    const getDreDataTotal = (async () => {
      setLoadingPage(true);
      await apiiscobol.post(`(DRE_REL)`,
        {
          "dreidenti": 6,
          "dredepto": 1,
          "drefilial": atuFiliais,
          "dreano": `${yearSelected}`
        })
        .then((response) => {
          setDreDataTotal(response.data.bi057.bidata);
          setLoadingPage(false);
        }).catch((error) => {
          console.log(error);
        })
    });
    getDreDataTotal();
  }, [atuFiliais, yearSelected]);

  useEffect(() => {
    const getDreDataTotalAnterior = (async () => {
      await apiiscobol.post(`(DRE_REL)`,
        {
          "dreidenti": 9,
          "dredepto": 1,
          "drefilial": atuFiliais,
          "dreano": `${yearSelected}`
        })
        .then((response) => {
          const { success, bidata } = response.data.bi057;
          if (!success) {
            setDreDataTotalAnterior([]);
            return;
          }
          setDreDataTotalAnterior(bidata);
        }).catch((error) => {
          console.log(error);
        })
    });
    getDreDataTotalAnterior();
  }, [atuFiliais, yearSelected]);

  const handleChangeFilial = (filial: any) => {
    setFilialAtiva(filial);
  }

  const headerClass = {
    default: "text-center border-r border-t text-xs font-semibold bg-solar-blue-light text-white",
    conta: "w-44 text-left border-r text-xs",
    line: "text-right border-r text-xs !px-2",
    total: "text-center border-r border-t text-sm font-semibold bg-orange-200 text-solar-orange-dark",
    lineTotal: "text-right border-r text-xs bg-orange-200 px-2",
  }

  const lineTotal = ((EstruturaId: any) => {
    let line;
    switch (EstruturaId) {
      case 1: line = true;
        break;
      case 10: line = true;
        break;
      case 12: line = true;
        break;
      case 21: line = true;
        break;
      case 26: line = true;
        break;
      case 29: line = true;
        break;
      case 31: line = true;
        break;
      case 32: line = true;
        break;
    };
    return line;
  })
  const anoAtual: any = yearExists ? moment().format("YYYY") : moment().add(-1, "y").format("YYYY");
  return (
    <Fragment>
      <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
        <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">DRE</h1>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-end">
            {user?.type === "S" ?
              <select
                className={`w-full duration-300 bg-solar-gray-dark shadow border border-white h-9 ml-2 text-sm font-semibold ${loadingFilial ? 'text-gray-500' : 'text-solar-blue-dark'} focus:ring-0 focus:border-solar-gray-light`}
                name="cities"
                value={filialAtiva}
                onChange={(e: any) => handleChangeFilial(e.target.value)}
              >
                {loadingFilial && <option className="text-sm font-semibold">Carregando filiais ...</option>}

                {allFiliais?.map((filial: any, idxFil: any) => (
                  <option key={idxFil} value={filial.CodFilial} className="text-sm font-medium">{("00" + filial.CodFilial).slice(-2)} - {filial.NomeFilial}</option>
                ))}
              </select>
              : <div className="w-full flex items-center justify-center bg-solar-gray-dark shadow border border-white h-9 ml-2 text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light">
                {allFiliais.filter((sf: any) => (sf.CodFilial == atuFiliais))?.map((lf: any) => (lf.CodFilial + ' - ' + lf.NomeFilial))}
              </div>
            }
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <ul className="flex items-center justify-center gap-4">
            <li>
              <button
                onClick={() => setYearSelected(anoAtual - 1)}
                className={`${yearSelected === anoAtual - 1 ? 'bg-solar-blue-light text-solar-gray-light py-0.5 px-3 rounded shadow border-2 border-white' : 'text-gray-500 py-0.5 px-3 rounded shadow border-2 border-white'}`}
              >
                {anoAtual - 1}
              </button>
            </li>
            <li>
              <button
                onClick={() => setYearSelected(anoAtual)}
                className={`${yearSelected === anoAtual ? 'bg-solar-blue-light text-solar-gray-light py-0.5 px-3 rounded shadow border-2 border-white' : 'text-gray-500 py-0.5 px-3 rounded shadow border-2 border-white'}`}
              >
                {anoAtual}
              </button>
            </li>
          </ul>
        </div>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {dreEstrutura?.map((value: any) => (value.Atualizacao)).filter((value, index, self) => self.indexOf(value) === index)}</h1>
        </div>
      </div>

      {loadingPage
        ? <AppLoading />
        : <div className="table-fixed animate__animated animate__fadeIn mx-4 mb-2 overflow-auto">
          <BoxAnalise title="" textColor="!font-semibold" borderColor="border-transparent">
            <STable>
              <tbody>
                <STr>
                  <STd rowspan={2} classname="align-middle text-sm text-center border font-semibold bg-solar-blue-light text-white uppercase"><div className="w-52">Conta</div></STd>
                  <STh colspan={2} classname={`${headerClass.total} border-r-4 border-r-orange-500 pr-1`}><div className="w-32">Total ({yearSelected - 1})</div></STh>
                  <STh colspan={2} classname={headerClass.total}>Total ({yearSelected})</STh>
                  <STd colspan={2} classname={headerClass.default}>Janeiro</STd>
                  <STd colspan={2} classname={headerClass.default}>Fevereiro</STd>
                  <STd colspan={2} classname={headerClass.default}>Março</STd>
                  <STd colspan={2} classname={headerClass.default}>Abril</STd>
                  <STd colspan={2} classname={headerClass.default}>Maio</STd>
                  <STd colspan={2} classname={headerClass.default}>Junho</STd>
                  <STd colspan={2} classname={headerClass.default}>Julho</STd>
                  <STd colspan={2} classname={headerClass.default}>Agosto</STd>
                  <STd colspan={2} classname={headerClass.default}>Setembro</STd>
                  <STd colspan={2} classname={headerClass.default}>Outubro</STd>
                  <STd colspan={2} classname={headerClass.default}>Novembro</STd>
                  <STd colspan={2} classname={headerClass.default}>Dezembro</STd>
                </STr>
                <STr>
                  <td className={headerClass.total}>Valor</td>
                  <td className={`${headerClass.total} border-r-4 border-r-orange-500 pr-1`}>%</td>
                  <STd classname={headerClass.total}>Valor</STd>
                  <STd classname={headerClass.total}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                  <STd classname={headerClass.default}>Valor</STd>
                  <STd classname={headerClass.default}>%</STd>
                </STr>
                {dreEstrutura?.sort((a: any, b: any) => (a.Ordem > b.Ordem ? 1 : -1)).map((est: any, idxEst: any) => (
                  <STr key={idxEst} colorRow={idxEst % 2} total={lineTotal(est.EstruturaId)}>
                    <STd classname={`${headerClass.conta}`}>{est.Estrutura}</STd>
                    <STd classname={headerClass.lineTotal}>{dreListDataValue({ data: dreDataTotalAnterior, estrutura: est.EstruturaId, mes: 0, ano: yearSelected - 1, valor: 1 })}</STd>
                    <STd classname={`${headerClass.lineTotal} border-r-4 border-r-orange-500 pr-1`}>{dreListDataValue({ data: dreDataTotalAnterior, estrutura: est.EstruturaId, mes: 0, ano: yearSelected - 1, valor: 0 })}</STd>
                    <STd classname={headerClass.lineTotal}>{dreListDataValue({ data: dreDataTotal, estrutura: est.EstruturaId, mes: 0, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.lineTotal}>{dreListDataValue({ data: dreDataTotal, estrutura: est.EstruturaId, mes: 0, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 1, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 1, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 2, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 2, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 3, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 3, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 4, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 4, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 5, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 5, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 6, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 6, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 7, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 7, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 8, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 8, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 9, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 9, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 10, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 10, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 11, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 11, ano: yearSelected, valor: 0 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 12, ano: yearSelected, valor: 1 })}</STd>
                    <STd classname={headerClass.line}>{dreListDataValue({ data: dreData, estrutura: est.EstruturaId, mes: 12, ano: yearSelected, valor: 0 })}</STd>
                  </STr>
                ))}
              </tbody>
            </STable>

          </BoxAnalise>
        </div>

      }
    </Fragment>
  )
}

export default Dre;