'use client'
import apiphpmysql from "@/app/api/apiphpmysql";
import FormatMoney from "@/components/FormatMoney";
import { STable, STd, STh, STr } from "@/components/Tables"
import { AuthContext } from "@/contexts/auth";
import { parseValueMoney, parseValuePercent } from "@/function/valuesConvert";
import React, { useContext, useEffect, useState } from 'react'

const Resumo = () => {
  const { filialAtiva } = useContext(AuthContext);
  const [resumoFilial, setResumoFilial] = useState<any>([]);
  const [resumoFilialTotal, setResumoFilialTotal] = useState<any>([]);

  useEffect(() => {
    const getResumoFilial = async () => {
      await apiphpmysql.get(`gerfilialfatudia/${filialAtiva}`)
        .then((result) => {
          setResumoFilial(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilial();
  }, [filialAtiva]);

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
    <div className="animate__animated animate__fadeIn">
      <STable>
        <thead>
          <STr>
            <STh classname="!text-left">Assoc</STh>
            <STh classname="!text-left">Venda dia 20</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda dia 18</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda semana</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda mês</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">-</STh>
            <STh classname="!text-left">Representa</STh>
            <STh classname="!text-left">-</STh>
            <STh classname="!text-left">Juros S/Parc.Mês</STh>
            <STh classname="!text-left">Rep.S/Fat.</STh>
          </STr>
          {resumoFilialTotal.map((total: any, idx: number) => (
            <STr key={idx}>
              <STd  classname="!bg-gray-300 font-medium">Total</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.FatuDia)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemDia)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.FatuAnterior)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemAnterior)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.FatuSemana)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemSemana)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.FatuMes)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemMes)}</STd>
              <STd  classname="!bg-gray-300 font-medium"></STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepFatu)}</STd>
              <STd  classname="!bg-gray-300 font-medium"></STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.JurosSPM)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepSemFatu)}</STd>
            </STr>
          ))}
        </thead>
        <tbody>
          {resumoFilial.map((resumo: any, idx: number) => (
            <STr key={idx}>
              <STd>{resumo.Associacao}</STd>
              <STd>{parseValueMoney(resumo.FatuDia)}</STd>
              <STd>{parseValuePercent(resumo.MargemDia)}</STd>
              <STd>{parseValueMoney(resumo.FatuAnterior)}</STd>
              <STd>{parseValuePercent(resumo.MargemAnterior)}</STd>
              <STd>{parseValueMoney(resumo.FatuSemana)}</STd>
              <STd>{parseValuePercent(resumo.MargemSemana)}</STd>
              <STd>{parseValueMoney(resumo.FatuMes)}</STd>
              <STd>{parseValuePercent(resumo.MargemMes)}</STd>
              <STd>{parseValuePercent(resumo.CompDia)}</STd>
              <STd>{parseValuePercent(resumo.CompMes)}</STd>
              <STd>{parseValuePercent(resumo.RepFatu)}</STd>
              <STd>{parseValueMoney(resumo.JurosSPM)}</STd>
              <STd>{parseValuePercent(resumo.RepSemFatu)}</STd>
            </STr>
          ))}
        </tbody>
      </STable>
    </div>
  )
}

export default Resumo