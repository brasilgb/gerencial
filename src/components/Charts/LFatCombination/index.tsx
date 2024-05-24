import React, { Fragment, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: any;
};

const LFatCombination = ({ data }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const colors = Highcharts.getOptions().colors;
  const diasemana = data.map((value: any) => value.DiaSemana);

  const margem = data.map((value: any) => value.Margem * 100);

  const meta = data.map((value: any) => value.Meta);
  const vendas = data.map((value: any) => value.Venda);

  Highcharts.setOptions({
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  });

  const options = {
    chart: {
      marginRight: 0,
      inverted: width > 640 ? false : true,
    },
    title: {
      text: 'Gráfico de Evolução de Vendas',
      align: 'left',
    },
    // subtitle: {
    //     text: 'Fonte: Grupo Solar - Lojas',
    //     align: 'left'
    // },
    xAxis: [
      {
        categories: diasemana,
        crosshair: true,
      },
    ],
    plotOptions: {
      series: {
        maxPointWidth: 50,
      },
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}%',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        //softMax: 6000,
        title: {
          text: '',
          style: {
            color: '#6e6d6d',
          },
          enabled: false,
        },
        labels: {
          format: '{value}',
          style: {
            color: '#6e6d6d',
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        labels: {
          format: '{value}%',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'horizontal',
      align: 'left',
      x: 50,
      // verticalAlign: 'top',
      y: 20,
      floating: false,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Vendas',
        type: 'column',
        yAxis: 1,
        data: vendas,
        color: '#00BFFF',
        tooltip: {
          valuePrefix: 'R$ ',
          valueDecimals: 2,
          shared: true,
        },
      },
      {
        name: '% Margem',
        type: 'spline',
        yAxis: 2,
        data: margem,
        color: '#46C646',
        marker: {
          enabled: true,
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%',
        },
      },
      {
        name: 'Meta',
        type: 'line',
        yAxis: 1,
        data: meta,
        color: '#F93F17',
        tooltip: {
          thousandsSep: ',',
          valuePrefix: 'R$ ',
          valueDecimals: 2,
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              floating: false,
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 0,
            },
            yAxis: [
              {
                labels: {
                  align: 'right',
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                labels: {
                  align: 'left',
                  x: 0,
                  y: -6,
                },
                showLastLabel: false,
              },
              {
                visible: false,
              },
            ],
          },
        },
      ],
    },
  };
  return (
    <Fragment>
      <div id="container">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </Fragment>
  );
};

export default LFatCombination;
