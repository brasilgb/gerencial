import apiphpmysql from "@/app/api/apiphpmysql";
import { STable, STd, STh, STr } from "@/components/Tables"
import { AuthContext } from "@/contexts/auth";
import { parseValueMoney, parseValuePercent } from "@/function/valuesConvert";
import React, { useContext, useEffect, useState } from 'react'

const PerfMes = () => {
  const { filialAtiva } = useContext(AuthContext);
  const [resumoFilialTotalAssoc, setResumoFilialTotalAssoc] = useState<any>([]);
  const [resumoFilialMes, setResumoFilialMes] = useState<any>([]);

  useEffect(() => {
    const getResumoFilialTotalAssoc = async () => {
      await apiphpmysql.get(`gerfilialtotalassoc/${filialAtiva}`)
        .then((result) => {
          setResumoFilialTotalAssoc(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilialTotalAssoc();
  }, [filialAtiva]);

  useEffect(() => {
    const getResumoFilialMes = async () => {
      await apiphpmysql.get(`gerfilialmes/${filialAtiva}`)
        .then((result) => {
          setResumoFilialMes(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
    };
    getResumoFilialMes();
  }, [filialAtiva]);

  return (
    <div className="animate__animated animate__fadeIn">
      <STable>
        <thead>
          <STr>
            <STh classname="text-left">Mes/Ano</STh>
            <STh classname="text-left">Meta</STh>
            <STh classname="text-left">Média Fat.</STh>
            <STh classname="text-left">Margem</STh>
            <STh classname="text-left">Rep.Fat</STh>
            <STh classname="text-left">Meta</STh>
            <STh classname="text-left">Méd.JurS/Parc.</STh>
            <STh classname="text-left">Rep.Juros</STh>
          </STr>
          {resumoFilialTotalAssoc.map((total: any, idx: number) => (
            <STr key={idx}>
              <STd classname="!bg-gray-300 font-medium">Total</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValueMoney(total.MetaMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValueMoney(total.MediaFatuMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValuePercent(total.MargemMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepFatuMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValuePercent(total.MetaAlcancadaMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValueMoney(total.MedJurSParcMes)}</STd>
              <STd classname="!bg-gray-300 font-medium">{parseValuePercent(total.RepJurosMes)}</STd>
            </STr>
          ))}
        </thead>
        <tbody>
          {resumoFilialMes.map((filial: any, idx: number) => (
            <STr key={idx}>
              <STd>{filial.MesAno}</STd>
              <STd>{parseValueMoney(filial.Meta)}</STd>
              <STd>{parseValueMoney(filial.MediaFatu)}</STd>
              <STd>{parseValuePercent(filial.Margem)}</STd>
              <STd>{parseValuePercent(filial.RepFatu)}</STd>
              <STd>{parseValuePercent(filial.MetaAlcancada)}</STd>
              <STd>{parseValueMoney(filial.MedJurSParc)}</STd>
              <STd>{parseValuePercent(filial.RepJuros)}</STd>
            </STr>
          ))}
        </tbody>
      </STable>
    </div>
  )
}

export default PerfMes