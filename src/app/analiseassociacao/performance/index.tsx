import apiphpmysql from "@/app/api/apiphpmysql";
import LFatCombination from "@/components/Charts/LFatCombination";
import { STable, STd, STh, STr } from "@/components/Tables";
import { AuthContext } from "@/contexts/auth";
import { parseValueMoney, parseValuePercent } from "@/function/valuesConvert";
import React, { Fragment, useContext, useEffect, useState } from 'react'

const Performance = () => {
  const { filialAtiva } = useContext(AuthContext);
  const [resumoGrafico, setResumoGrafico] = useState<any>([]);
  const [resumoFilialTotal, setResumoFilialTotal] = useState<any>([]);

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

  useEffect(() => {
    const getResumoGrafico = async () => {
      await apiphpmysql.get(`gerfilialgrafico/${filialAtiva}`)
        .then((result) => {
          setResumoGrafico(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoGrafico();
  }, [filialAtiva]);

  return (
    <Fragment>
      <div>
        <STable>
          <thead>
            <STr ><STd colspan={6} classname="bg-solar-blue-light !text-gray-50 font-medium">Performance Mês</STd></STr>
            <STr>
              <STh classname="text-left">Meta</STh>
              <STh classname="text-left">Venda</STh>
              <STh classname="text-left">Falta vender</STh>
              <STh classname="text-left">Meta</STh>
              <STh classname="text-left">Atingido</STh>
              <STh classname="text-left">Perf.Atual</STh>
            </STr></thead>
          <tbody>
            {resumoFilialTotal.map((total: any, idx: number) => (
              <STr key={idx}>
                <STd>{parseValueMoney(total.MetaMes)}</STd>
                <STd>{parseValueMoney(total.VendaMes)}</STd>
                <STd>{parseValueMoney(total.FaltaVenderMes)}</STd>
                <STd>{parseValuePercent(total.MetaParcMes)}</STd>
                <STd>{parseValuePercent(total.AtingidoMes)}</STd>
                <STd>{parseValuePercent(total.PerfAtualMes)}</STd>
              </STr>
            ))}
          </tbody>
        </STable>
      </div>
      <div className="my-4">
        <STable>
          <thead>
            <STr ><STd colspan={7} classname="bg-solar-blue-light !text-gray-50 font-medium">Performance Dia</STd></STr>
            <STr>
              <STh classname="text-left">Meta</STh>
              <STh classname="text-left">Venda</STh>
              <STh classname="text-left">Falta vender</STh>
              <STh classname="text-left">Perf.Meta</STh>
              <STh classname="text-left">Juros s/Parc.Dia</STh>
              <STh classname="text-left">Perf.Jur.Dia	</STh>
              <STh classname="text-left">Média Dia</STh>
            </STr></thead>
          <tbody>
            {resumoFilialTotal.map((total: any, idx: number) => (
              <STr key={idx}>
                <STd>{parseValueMoney(total.MetaDia)}</STd>
                <STd>{parseValueMoney(total.VendaDia)}</STd>
                <STd>{parseValueMoney(total.FaltaVenderDia)}</STd>
                <STd>{parseValuePercent(total.PerfMetaDia)}</STd>
                <STd>{parseValuePercent(total.JurSParcDia)}</STd>
                <STd>{parseValuePercent(total.PerfJurDia)}</STd>
                <STd>{parseValuePercent(total.MediaDia)}</STd>
              </STr>
            ))}
          </tbody>
        </STable>
        <div className="mt-8">
          <LFatCombination data={resumoGrafico} />
        </div>
      </div>
    </Fragment>
  )
}

export default Performance