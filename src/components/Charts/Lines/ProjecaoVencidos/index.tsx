import React, { Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface HighProps {
  data: any;
}
const ProjecaoVencidos = ({ data }: HighProps) => {

  const mesano = data.map((value: any) => (value.MesAno));

  const repVencidos = data.map((value: any) => {
    let ab = value.RepVencidos.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const projVencidos = data.map((value: any) => {
    let ab = value.ProjVencidos.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const options = {
    chart: {
      height: (15) + '%',
      type: 'line',
      marginRight: 10,
      marginLeft: 50,
      backgroundColor: "#FAFAFA",
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1
      }
    },
    title: {
      text: 'Análise de Vencidos e Projeção dos Vencidos por Ano/Mês da Emissão do Carnê',
      align: 'left'
    },
    subtitle: {
      text: 'Fonte: Grupo Solar - Lojas',
      align: 'left'
    },
    xAxis: {
      categories: mesano
    },
    yAxis: {
      title: {
        text: 'Mes/Ano',
        enabled: false,
      },
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
      name: 'Rep Vencidos',
      data: repVencidos,
      color: '#00BFFF',
      tooltip: {
        valueSuffix: '%'
      }
    }, {
      name: 'Proj Vencidos',
      data: projVencidos,
      color: '#FF8900',
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

    <Fragment>
      <div className="z-0 w-full">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </Fragment>

  )
}

export default ProjecaoVencidos;