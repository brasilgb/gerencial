import React, { Fragment } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AnaliseVencidos = ({ data }) => {

  const mesano = data.map((value) => (value.MesAno));

  const vcrediario = data.map((value) => {
    let ab = value.ValorCredito.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const repVencer = data.map((value) => {
    let ab = value.RepVencer.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const repVencidos = data.map((value) => {
    let ab = value.RepVencidos.replace('.', '');
    let ok = ab.replace(',', '.');
    return parseFloat(ok);
  });

  const options = {
    chart: {
      // zoomType: 'xy',
      marginRight: 0,
      scrollablePlotArea: {
        minWidth: 700,
        scrollPositionX: 1
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
        style: {
          color: Highcharts.getOptions().colors[0]
        },
        enabled: false,
      },
      title: {
        text: 'Rep Vencidos',
        style: {
          color: Highcharts.getOptions().colors[0]
        },
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
        style: {
          color: Highcharts.getOptions().colors[0]
        },
        enabled: false,
      },
      labels: {
        format: '{value}%',
        style: {
          color: Highcharts.getOptions().colors[0]
        },
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
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || // theme
        'rgba(255,255,255,0.25)'
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
    <Fragment>
      <div id='container'>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>

    </Fragment>
  )
}

export default AnaliseVencidos