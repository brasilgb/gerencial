'use client'
import { AuthContext } from "@/contexts/auth";
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { listUserAuthenticated } from "@/function/list-user-autenticated";
import apiphpmysql from "../api/apiphpmysql";
import Resumo from "./resumo";
import Performance from "./performance";
import PerfAssociacao from "./perfassociacao";
import PerfMes from "./perfmes";

type Props = {}

const Analiseassociacao = (props: Props) => {
    const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
    const [loadingFilial, setLoadingFilial] = useState(false);
    const [allFiliais, setAllFiliais] = useState([]);
    const userAuthenticated = listUserAuthenticated();
    const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;
    const handleLoadFilial = (filial: any) => {
        setFilialAtiva(filial);
    };
    const [tipoFaturamento, setTipoFaturamento] = useState('resumodiario');
    const [resumoFilialTotal, setResumoFilialTotal] = useState<any>([]);

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

    useEffect(() => {
        const getResumoFilialTotal = async () => {
          await apiphpmysql.get(`gerfilialfatutotal/${filialAtiva}`)
            .then((result) => {
              setResumoFilialTotal(result.data);
            })
            .catch((err) => {
              console.log(err);
            })
        };
        getResumoFilialTotal();
      }, [filialAtiva]);

    return (
        <Fragment>
            <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
                <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
                    <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Faturamento por filial</h1>
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
                    <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">{resumoFilialTotal[0]?.Atualizacao}</h1>
                </div>
            </div>
            <div className="bg-gray-50 mx-4 p-1 mt-4 shadow border border-white">
                <div className="flex items-center justify-start gap-4">
                    <button
                        onClick={() => setTipoFaturamento('resumodiario')}
                        className={`w-52 text-sm py-2 shadow-md rounded border border-white transition-colors duration-300 hover:bg-solar-blue-light hover:text-gray-50 ${tipoFaturamento === 'resumodiario' ? 'bg-solar-blue-light text-gray-50' : 'bg-gray-100 text-solar-blue-dark'}`}
                    >
                        Resumo diário
                    </button>
                    <button
                        onClick={() => setTipoFaturamento('performance')}
                        className={`w-52 text-sm py-2 shadow-md rounded border border-white transition-colors duration-300 hover:bg-solar-blue-light hover:text-gray-50 ${tipoFaturamento === 'performance' ? 'bg-solar-blue-light text-gray-50' : 'bg-gray-100 text-solar-blue-dark'}`}
                    >
                        Performance
                    </button>
                    <button
                        onClick={() => setTipoFaturamento('performassoc')}
                        className={`w-52 text-sm py-2 shadow-md rounded border border-white transition-colors duration-300 hover:bg-solar-blue-light hover:text-gray-50 ${tipoFaturamento === 'performassoc' ? 'bg-solar-blue-light text-gray-50' : 'bg-gray-100 text-solar-blue-dark'}`}
                    >
                        Performance associação
                    </button>
                    <button
                        onClick={() => setTipoFaturamento('performmes')}
                        className={`w-52 text-sm py-2 shadow-md rounded border border-white transition-colors duration-300 hover:bg-solar-blue-light hover:text-gray-50 ${tipoFaturamento === 'performmes' ? 'bg-solar-blue-light text-gray-50' : 'bg-gray-100 text-solar-blue-dark'}`}
                    >
                        Performance mês
                    </button>
                </div>
                <div className="mt-4">
                    {tipoFaturamento === 'resumodiario' &&
                        <Resumo />
                    }
                    {tipoFaturamento === 'performance' &&
                        <Performance />
                    }
                    {tipoFaturamento === 'performassoc' &&
                        <PerfAssociacao />
                    }
                    {tipoFaturamento === 'performmes' &&
                        <PerfMes />
                    }
                </div>
            </div>
        </Fragment>

    )
}

export default Analiseassociacao