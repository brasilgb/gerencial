'use client'
import apiphpmysql from "@/app/api/apiphpmysql";
import FormatMoney from "@/components/FormatMoney";
import { STable, STd, STh, STr } from "@/components/Tables"
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";
import { parseValueMoney, parseValuePercent } from "@/function/valuesConvert";
import { totalmem } from "os";
import React, { useContext, useEffect, useState } from 'react'
import { IoMdHelpCircle } from "react-icons/io";

const Resumo = () => {
  const { user, filialAtiva } = useContext(AuthContext);
  const [resumoFilial, setResumoFilial] = useState<any>([]);
  const [resumoFilialTotal, setResumoFilialTotal] = useState<any>([]);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;

  useEffect(() => {
    const getResumoFilial = async () => {
      await apiphpmysql.get(`gerfilialfatudia/${atuFiliais}`)
        .then((result) => {
          setResumoFilial(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilial();
  }, [atuFiliais]);

  useEffect(() => {
    const getResumoFilialTotal = async () => {
      await apiphpmysql.get(`gerfilialfatutotal/${atuFiliais}`)
        .then((result) => {
          setResumoFilialTotal(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilialTotal();
  }, [atuFiliais]);

  return (
    <div className="animate__animated animate__fadeIn">
      <STable>
        <thead>
          <STr>
            <STh classname="!text-left">Assoc</STh>
            <STh classname="!text-left">Venda dia <span className="bg-blue-500 text-white rounded-full px-1">{resumoFilialTotal[0]?.DiaAtual}</span></STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda dia <span className="bg-red-500 text-white rounded-full px-1">{resumoFilialTotal[0]?.DiaAnterior}</span></STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda semana</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left">Venda mês</STh>
            <STh classname="!text-left">Margem</STh>
            <STh classname="!text-left"><span className="flex items-center">{('Dif. Margem Mês s/ Margem 12 Meses').slice(0,11)}<IoMdHelpCircle title="Dif. Margem Mês s/ Margem 12 Meses" className="ml-0.5 text-blue-500 text-lg cursor-help" /></span></STh>
            <STh classname="!text-left"><span className="flex items-center">{('Cresc. Venda Mês s/ Venda 12 Meses').slice(0,12)}<IoMdHelpCircle title="Cresc. Venda Mês s/ Venda 12 Meses" className="ml-0.5 text-blue-500 text-lg cursor-help" /></span></STh>
            <STh classname="!text-left"><span className="flex items-center">{('Venda Mês Atual s/ Total Mês').slice(0,12)}<IoMdHelpCircle title="Venda Mês Atual s/ Total Mês" className="ml-0.5 text-blue-500 text-lg cursor-help" /></span></STh>
            <STh classname="!text-left">Juros S/Parc.Mês</STh>
            <STh classname="!text-left">Rep.S/Fat.</STh>
          </STr>
          {resumoFilialTotal.map((total: any, idx: number) => (
            <STr key={idx}>
              <STd  classname="!bg-gray-300 font-medium">Total</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total?.FatuDia)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.MargemDia)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total?.FatuAnterior)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.MargemAnterior)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total?.FatuSemana)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.MargemSemana)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total?.FatuMes)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.MargemMes)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.CompDia)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.RepFatu)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(1)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total?.JurosSPM)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total?.RepSemFatu)}</STd>
            </STr>
          ))}
        </thead>
        <tbody>
          {resumoFilial.sort((a:any, b:any) => (a.FatuMes < b.FatuMes ? 1 : -1)).map((resumo: any, idx: number) => (
            <STr key={idx}>
              <STd>{resumo?.Associacao}</STd>
              <STd>{parseValueMoney(resumo?.FatuDia)}</STd>
              <STd>{parseValuePercent(resumo?.MargemDia)}</STd>
              <STd>{parseValueMoney(resumo?.FatuAnterior)}</STd>
              <STd>{parseValuePercent(resumo?.MargemAnterior)}</STd>
              <STd>{parseValueMoney(resumo?.FatuSemana)}</STd>
              <STd>{parseValuePercent(resumo?.MargemSemana)}</STd>
              <STd>{parseValueMoney(resumo?.FatuMes)}</STd>
              <STd>{parseValuePercent(resumo?.MargemMes)}</STd>
              <STd>{parseValuePercent(resumo?.CompDia)}</STd>
              <STd>{parseValuePercent(resumo?.RepFatu)}</STd>
              <STd>{parseValuePercent(resumo?.CompMes)}</STd>
              <STd>{parseValueMoney(resumo?.JurosSPM)}</STd>
              <STd>{parseValuePercent(resumo?.RepSemFatu)}</STd>
            </STr>
          ))}
        </tbody>
      </STable>
    </div>
  )
}

export default Resumo