'use client'
import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import apiphpmysql from "../api/apiphpmysql";
import moment from "moment";
import AppLoading from "@/components/AppLoading";
import apiiscobol from "../api/apiiscobol";
import BoxAnalise from "@/components/Boxes";
import { IconContext } from "react-icons";
import FormatMoney from "@/components/FormatMoney";
import { BiRefresh } from 'react-icons/bi';
import { Pagination } from "@/components/Pagination/Giro";
import ButtonSearch from "@/components/Buttons";
import { InputCheck, InputSearch } from "@/components/InputForm";
import { CgSpinnerTwo } from "react-icons/cg";
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";
import { headers } from "next/dist/client/components/headers";

type Props = {}

const GiroEstoque = (props: Props) => {

  const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
  const [allFiliais, setAllFiliais] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchSubGrupo, setSearchSubGrupo] = useState('');
  const [searchGiro, setSearchGiro] = useState(false);
  const [atualizaDados, setAtualizaDados] = useState(false);
  const [giroSubGrupoFilial, setGiroSubGrupoFilial] = useState<any>([]);
  const [dataDoGiro, setDataDoGiro] = useState(moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
  const [giroSubGrupo, setGiroSubGrupo] = useState([]);
  const [searchFilial, setSearchFilial] = useState<any>(null);
  const [message, setMessage] = useState<any>(false);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;
  // console.log(giroSubGrupo);
  useEffect(() => {
    async function getAllFiliais() {
      setLoadingPage(true);
      await apiphpmysql.get(`analisekpis/${0}`)
        .then((filiais) => {
          const fsort = filiais.data.sort((a: any, b: any) => a.CodFilial > b.CodFilial ? 1 : -1);
          setAllFiliais(fsort);
          setTimeout(() => {
            setLoadingPage(false);
          }, 200);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAllFiliais();
  }, []);

  const changeFilial = (nvalue: any) => {
    setFilialAtiva(nvalue);
    setSearchFilial(nvalue);
  }

  const refSub = useRef<any>();
  const refGiro = useRef<any>();

  const [defaultCheck, setDefaultCheck] = useState(false);

  const filialEstoque = allFiliais.filter((value: any) => (value.CodFilial == (value.CodFilial == searchFilial ? searchFilial : atuFiliais))).map((value: any) => (value.Filial));
  const subGrupoEstoque = giroSubGrupoFilial.filter((fil: any) => (parseInt(fil.codigoSubgrupo) === 0));


  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchSubGrupo(refSub?.current.value);
    setSearchGiro(refGiro?.current.checked);
  }
  // Gerencial Giro Estoque
  useEffect(() => {
    async function getGiroSubGrupo() {
      setLoadingPage(true);
      await apiiscobol.post(`(ESTOQUE_IDEAL)`, {
        filial: atuFiliais
      }
      )
        .then((response) => {

          setMessage(response.data.bi059);
          setGiroSubGrupoFilial(response.data.bi059.bidata.dados);
          setLoadingPage(false);
          if (searchSubGrupo == '' && !searchGiro) {
            const girsub = response.data.bi059.bidata.dados.filter((gs: any) => (
              gs.giroFilial != 0 &&
              gs.giroRede != 0
            ));
            setGiroSubGrupo(girsub);
            setLoadingPage(false);
          }
          if (searchSubGrupo != '' && !searchGiro) {
            const girsub = response.data.bi059.bidata.dados.filter((gs: any) => (
              (parseInt(gs.codigoSubgrupo) === parseInt(searchSubGrupo) || (gs.descricaoSubgrupo.toUpperCase()).includes(searchSubGrupo.toUpperCase())) &&
              gs.giroFilial != 0 &&
              gs.giroRede != 0
            ));
            setGiroSubGrupo(girsub);
            setLoadingPage(false);
          }
          if (searchGiro) {
            const girsub = response.data.bi059.bidata.dados.filter((gs: any) => (
              gs.giroFilial == 0 &&
              gs.giroRede == 0
            ));
            setGiroSubGrupo(girsub);
            setLoadingPage(false);
          }

        })
        .catch(err => {
          console.log(err);
        })
    }

    getGiroSubGrupo();
    if (atualizaDados) {
      getGiroSubGrupo();
      setDataDoGiro(moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
      setAtualizaDados(!atualizaDados);
    }

  }, [setLoadingPage, searchFilial, searchSubGrupo, searchGiro, atuFiliais, atualizaDados]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
          <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
            <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Giro de estoque</h1>
          </div>

          <div className="flex-none">
            <div className="flex items-center justify-center px-2">
              {user?.type === "S" ?
                <select
                  className="bg-solar-gray-dark shadow border border-white h-9 pl-4 uppercase text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light"
                  id="filial"
                  name="filial"
                  onChange={(e) => changeFilial(e.target.value)}
                  value={filialAtiva}
                >
                  <option value="" className="text-sm font-semibold">Selecione a filial</option>
                  {allFiliais.map((filial: any, idxFil: any) => (
                    <option key={idxFil} value={filial.CodFilial} className="text-sm font-medium">{("00" + filial.CodFilial).slice(-2)} - {filial.Filial}</option>
                  ))}
                </select>
                : <div className="w-80 flex items-center justify-center bg-solar-gray-dark shadow border border-white h-9 uppercase text-sm font-semibold text-solar-blue-dark focus:ring-0 focus:border-solar-gray-light">
                  {allFiliais.filter((sf: any) => (sf.CodFilial == atuFiliais)).map((lf: any) => (lf.CodFilial + ' - ' + lf.Filial))}
                </div>
              }
            </div>
          </div>

          <div className="flex-1 pr-2">
            <div className="flex items-center justify-start bg-solar-gray-dark border border-white shadow py-0.5 pl-0.5">
              <InputSearch
                refInput={refSub}
                disabled={defaultCheck}
              />

              <InputCheck
                refCheck={refGiro}
                onchange={() => setDefaultCheck(!defaultCheck)}
              />

              <ButtonSearch />

              <button onClick={() => { setAtualizaDados(true) }}>
                  <IconContext.Provider value={{ className: "text-3xl text-gray-500 text-center" }}>
                    <BiRefresh />
                  </IconContext.Provider>
              </button>
            </div>
          </div>

          <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
            <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Atualização de dados: {dataDoGiro}</h1>
          </div>
        </div>
      </form>
      {loadingPage
        ? <AppLoading />
        : <div className="animate__animated animate__fadeIn mx-4 mb-2">
          <BoxAnalise title="" textColor="!font-semibold text-solar-blue-dark" borderColor="border-transparent">

            <div className="py-1 flex items-center justify-start">

              {message.success && giroSubGrupo.length === 0 ?
                <div className={`w-4/12 flex items-center justify-center py-1 bg-red-500`}>
                  <h1 className="text-sm uppercase text-white font-medium">Não há giro de estoque para a filial de {filialEstoque}!</h1>
                </div>
                :
                ''
              }
              {message.success && giroSubGrupo.length > 0 ?
                <div className={`flex items-center justify-start py-1 uppercase font-semibold text-solar-blue-dark text-sm`}>
                  <span className="text-sm">Valor do estoque para </span>
                  <span className="text-red-400 text-md ml-1"> {filialEstoque}</span>:
                  <span className="mx-2 text-xl font-bold text-green-600">
                    <FormatMoney value={subGrupoEstoque.length > 0 ? subGrupoEstoque.map((ve: any) => (ve.valorAtual)) : 0} />
                  </span>
                </div>
                :
                ''
              }
              {message.success ?
                <div className={`flex items-center justify-center py-1`}>
                  <h1 className="text-sm uppercase text-red-500 font-semibold">{message.message}</h1>
                </div>
                :
                ''
              }

            </div>

            <Pagination data={giroSubGrupo} />

          </BoxAnalise>
        </div>
      }
    </Fragment>
  )
}

export default GiroEstoque;