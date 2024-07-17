import apiphpmysql from "@/app/api/apiphpmysql";
import { STable, STd, STh, STr } from "@/components/Tables"
import { AuthContext } from "@/contexts/auth";
import { listUserAuthenticated } from "@/function/list-user-autenticated";
import { parseValueMoney, parseValuePercent } from "@/function/valuesConvert";
import React, { useContext, useEffect, useState } from 'react'

const PerfAssociacao = () => {
  const { user, filialAtiva } = useContext(AuthContext);
  const [resumoGrafico, setResumoGrafico] = useState<any>([]);
  const [resumoFilialTotalAssoc, setResumoFilialTotalAssoc] = useState<any>([]);
  const [resumoFilialAssoc, setResumoFilialAssoc] = useState<any>([]);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated?.filial;
  
  useEffect(() => {
    const getResumoFilialTotalAssoc = async () => {
      await apiphpmysql.get(`gerfilialtotalassoc/${atuFiliais}`)
        .then((result) => {
          setResumoFilialTotalAssoc(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilialTotalAssoc();
  }, [atuFiliais]);
  
  useEffect(() => {
    const getResumoFilialAssoc = async () => {
      await apiphpmysql.get(`gerfilialassoc/${atuFiliais}`)
        .then((result) => {
          setResumoFilialAssoc(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilialAssoc();
  }, [atuFiliais]);

  return (
    <div className="animate__animated animate__fadeIn">
    <STable>
      <thead>
        <STr>
          <STh classname="text-left">Assoc</STh>
          <STh classname="text-left">Faturamento</STh>
          <STh classname="text-left">Margem</STh>
          <STh classname="text-left">Rep.Fat.	</STh>
          <STh classname="text-left">Jur.S/Fat.</STh>
          <STh classname="text-left">Rep.Juros	</STh>
          <STh classname="text-left">Estoque</STh>
          <STh classname="text-left">Giro</STh>
          <STh classname="text-left">Rep.Estoque</STh>
        </STr>
        {resumoFilialTotalAssoc.map((total: any, idx: number) => (
            <STr key={idx}>
              <STd  classname="!bg-gray-300 font-medium">Total</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.FaturamentoAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepFatAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.JurSFatAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepJurosAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValueMoney(total.EstoqueAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{Math.round(total.GiroAss)}</STd>
              <STd  classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepEstoqueAss)}</STd>
            </STr>
          ))}
      </thead>
      <tbody>
      {resumoFilialAssoc.sort((a:any, b:any) => (a.Faturamento < b.Faturamento ? 1 : -1)).map((filial: any, idx: number) => (
            <STr key={idx}>
              <STd>{filial.Assoc}</STd>
              <STd>{parseValueMoney(filial.Faturamento)}</STd>
              <STd>{parseValuePercent(filial.Margem)}</STd>
              <STd>{parseValuePercent(filial.RepFat)}</STd>
              <STd>{parseValueMoney(filial.JurSFat)}</STd>
              <STd>{parseValuePercent(filial.RepJuros)}</STd>
              <STd>{parseValueMoney(filial.Estoque)}</STd>
              <STd>{Math.round(filial.Giro)}</STd>
              <STd>{parseValuePercent(filial.RepEstoque)}</STd>
            </STr>
          ))}
      </tbody>
    </STable>
  </div>
  )
}

export default PerfAssociacao