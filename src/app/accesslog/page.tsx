"use client"

import React, { Fragment, useContext, useEffect, useState } from 'react'
import apiphpmysql from "../api/apiphpmysql";
import AppLoading from "@/components/AppLoading";
import BoxAnalise from "@/components/Boxes";
import { AuthContext } from "@/contexts/auth";
import { Pagination } from "@/components/Pagination/Users";
import moment from "moment";
import ButtonSearch from "@/components/Buttons";
import { IconContext } from "react-icons";
import { IoCalendar } from "react-icons/io5";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayRange } from '@hassanmojab/react-modern-calendar-datepicker';
import { listUserAuthenticated } from "@/function/list-user-autenticated";
type Props = {}

const Dre = (props: Props) => {

  const { user, filialAtiva, setFilialAtiva } = useContext(AuthContext);
  const [allFiliais, setAllFiliais] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingFilial, setLoadingFilial] = useState(false);
  const [userAccess, setUserAccess] = useState([]);
  const [allUserAccess, setAllUserAccess] = useState([]);
  const userAuthenticated = listUserAuthenticated();
  const atuFiliais = user?.type === "S" ? filialAtiva : userAuthenticated.filial;

  useEffect(() => {
    async function getAllFiliais() {
      setLoadingFilial(true);
      await apiphpmysql.get(`filiaisativas`)
        .then((filiais) => {
          const fsort = filiais.data.sort((a: any, b: any) => a.CodFilial > b.CodFilial ? 1 : -1);
          setTimeout(() => {
            setLoadingFilial(false);
          }, 500);
          setAllFiliais(fsort);
        })
        .catch(err => {
          console.log(err);
        })
    }
    getAllFiliais();
  }, []);

  useEffect(() => {
    const getUserAccess = (async () => {
      setLoadingPage(true);
      await apiphpmysql.post('listusersaccess',
        {
          "IdFilial": atuFiliais
        })
        .then((response) => {
          setAllUserAccess(response.data);
          const userAccess = response.data.filter((fu: any) => (moment(fu.created_at).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD")));
          setUserAccess(userAccess);
          setLoadingPage(false);
        })
        .catch(err => {
          console.log(err);
        })
    });
    getUserAccess();
  }, [atuFiliais]);

  const myCustomLocale = {
    // months list by order
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Augosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],

    // week days by order
    weekDays: [
      {
        name: 'Domingo', // used for acesibility 
        short: 'D', // displayed at the top of days' rows
        isWeekend: true, // is it a formal weekend or not?
      },
      {
        name: 'Segunda',
        short: 'S',
      },
      {
        name: 'Terça',
        short: 'T',
      },
      {
        name: 'Quarta',
        short: 'Q',
      },
      {
        name: 'Quinta',
        short: 'Q',
      },
      {
        name: 'Sexta',
        short: 'S',
      },
      {
        name: 'Sábado',
        short: 'S',
        isWeekend: true,
      },
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 0,

    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject: any) {
      return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date: any) {
      return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date: any) {
      return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit: any) {
      return digit;
    },

    // texts in the date picker
    nextMonth: 'Next Month',
    previousMonth: 'Previous Month',
    openMonthSelector: 'Open Month Selector',
    openYearSelector: 'Open Year Selector',
    closeMonthSelector: 'Close Month Selector',
    closeYearSelector: 'Close Year Selector',
    defaultPlaceholder: 'Select...',

    // for input range value
    from: 'from',
    to: 'to',


    // used for input value when multi dates are selected
    digitSeparator: ',',

    // if your provide -2 for example, year will be 2 digited
    yearLetterSkip: 0,

    // is your language rtl or ltr?
    isRtl: false,
  }
  const [selectedRange, setSelectedRange] = useState<DayRange>({
    from: {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('MM')),
      day: parseInt(moment().format('DD'))
    },
    to: {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('MM')),
      day: parseInt(moment().format('DD'))
    }
  });

  const formatInputRange = () => {
    if (!selectedRange)
      return `${''}`;
    let dataInicial = `${(selectedRange?.from?.day! < 10 ? '0' : '') + selectedRange.from?.day + '/' + (selectedRange?.from?.day! < 10 ? '0' : '') + selectedRange.from?.month + '/' + selectedRange.from?.year}`;
    let dataFinal = `${(selectedRange?.to?.day! < 10 ? '0' : '') + selectedRange?.to?.day + '/' + (selectedRange?.to?.month! < 10 ? '0' : '') + selectedRange.to?.month + '/' + selectedRange.to?.year}`;
    return `${dataInicial}${selectedRange.to ? ' - ' + dataFinal : ''}`;
  };

  const handleSubmit = ((e: any) => {
    e.preventDefault();
    setLoadingPage(true);
    let dataini = moment(selectedRange.from?.year + '/' + selectedRange.from?.month + '/' + selectedRange.from?.day).format("YYYY-MM-DD");
    let datafim = moment(selectedRange.to?.year + '/' + selectedRange.to?.month + '/' + selectedRange.to?.day).format("YYYY-MM-DD");
    const useraccess = allUserAccess.filter((fu: any) => (moment(fu.created_at).format("YYYY-MM-DD") >= dataini && moment(fu.created_at).format("YYYY-MM-DD") <= datafim));
    setUserAccess(useraccess);
    setTimeout(() => {
      setLoadingPage(false);
    }, 200)
  });

  const handleLoadFilial = (filial: any) => {
    setFilialAtiva(filial);
  }

  return (
    <Fragment>

      <div className="flex bg-solar-gray-light border border-white p-1 mx-4 mt-2 shadow">
        <div className="bg-solar-blue-light border border-solar-blue-light flex justify-center flex-1 h-9 items-center">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Log de acessos de usuários</h1>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-center">
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
        <form onSubmit={handleSubmit}>
          <div className="flex-1 pr-2">
            <div className="flex items-center justify-start bg-solar-gray-dark border border-white shadow py-0 h-9">
              <div className="flex items-center px-2 ml-0.5 py-0.5 bg-white">
                <IconContext.Provider value={{ className: "text-solar-blue-light text-2xl" }}>
                  <IoCalendar />
                </IconContext.Provider>
                <DatePicker
                  value={selectedRange}
                  onChange={setSelectedRange}
                  inputPlaceholder={`${moment().format('DD/MM/YYYY')}`} // placeholder
                  formatInputText={formatInputRange} // format value
                  inputClassName="!border-0 outline-none text-gray-500 font-semibold text-[13px] !bg-white w-56" // bg-solar-gray-light mr-2 px-4 py-1 border border-gray-200 text-sm placeholder:text-sm text-gray-500 placeholder:text-gray-500 focus:outline-none focus:ring-0 focus:border-transparent disabled:bg-gray-400
                  calendarClassName="responsive-calendar"
                  shouldHighlightWeekends
                  locale={myCustomLocale}
                />
              </div>
              <ButtonSearch />
            </div>
          </div>
        </form>
        <div className="bg-solar-blue-light border border-solar-blue-light flex flex-1 items-center justify-center h-9">
          <h1 className="text-center text-base font-medium drop-shadow-md text-solar-gray-light">Acessos para a filial de {allFiliais.filter((ffil: any) => (ffil.CodFilial == filialAtiva)).map((fil: any) => (fil.NomeFilial))}
          </h1>
        </div>
      </div>

      {loadingPage
        ? <AppLoading />
        : <div className="animate__animated animate__fadeIn mx-4 mb-2">
          <BoxAnalise title="" textColor="!font-semibold" borderColor="border-transparent">
            <Pagination data={userAccess} />
          </BoxAnalise>
        </div>

      }
    </Fragment>
  )
}

export default Dre;