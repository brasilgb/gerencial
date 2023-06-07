"use client"

import React, { Fragment } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
interface HighProps {
  data: any;
}
const AnaliseVencidos = ({ data }: HighProps) => {

  const mesano = data.map((value: any) => (value.MesAno));

  const vcrediario = data.map((value: any) => {
    let ab = value.ValorCredito.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const repVencer = data.map((value: any) => {
    let ab = value.RepVencer.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const repVencidos = data.map((value: any) => {
    let ab = value.RepVencidos.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const options = {
    chart: {
      // zoomType: 'xy',
      height: (15) + '%',
      marginRight: 10,
      marginLeft: 70,
      backgroundColor: "#FAFAFA",
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1,
        rounded: 0,
      }
    },
    title: {
      text: 'Análise de Vencidos e No Vencimento Sobre o Crediário aberto por Ano/Mês da Emissão do Carnê',
      align: 'left'
    },
    subtitle: {
      text: 'Fonte: Grupo Solar - Lojas',
      align: 'left'
    },
    xAxis: [{
      categories: mesano,
      crosshair: true,
    }],
    plotOptions: {
      series: {
        pointWidth: 20
      }
    },
    yAxis: [{ // Primary yAxis
      labels: {
        format: '{value}%',
        enabled: false,
      },
      title: {
        text: 'Rep Vencidos',
        enabled: false,
      },
      opposite: true

    }, { // Secondary yAxis
      gridLineWidth: 0,
      title: {
        text: 'Valor Crediário',
        style: {
          color: '#6e6d6d'
        },
        enabled: false,
      },
      labels: {
        format: '{value}',
        style: {
          color: '#6e6d6d'
        },
      }

    }, { // Tertiary yAxis
      gridLineWidth: 0,
      title: {
        text: 'Representa vencer',
        enabled: false,
      },
      labels: {
        format: '{value}%',
        enabled: false,
      },
      opposite: true
    }],
    tooltip: {
      shared: true
    },
    legend: {
      layout: 'horizontal',
      align: 'left',
      x: 50,
      // verticalAlign: 'top',
      y: 20,
      floating: false,
      backgroundColor: 'rgba(255,255,255,0.25)'
    },
    series: [{
      name: 'Valor Crediário',
      type: 'column',
      yAxis: 1,
      data: vcrediario,
      color: '#00BFFF',
      tooltip: {
        valuePrefix: 'R$'
      }

    }, {
      name: '% Rep. à Vencer S/ Crediário',
      type: 'spline',
      yAxis: 2,
      data: repVencer,
      color: '#46C646',
      marker: {
        enabled: true
      },
      // dashStyle: 'shortdot',
      tooltip: {
        valueSuffix: '%'
      }

    }, {
      name: '% Rep. Vencido S/ Crediário',
      type: 'spline',
      data: repVencidos,
      color: '#F93F17',
      tooltip: {
        valueSuffix: '%'
      }
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            floating: false,
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0
          },
          yAxis: [{
            labels: {
              align: 'right',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            labels: {
              align: 'left',
              x: 0,
              y: -6
            },
            showLastLabel: false
          }, {
            visible: false
          }]
        }
      }]
    }
  }
  return (

    <div className="z-0 w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  )
}

export default AnaliseVencidos