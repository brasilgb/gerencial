import React, { Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Progress = ({ title, value, colorBar, colorText }) => {

    const options = {
        chart: {
            // width: 300,
            height: 200
        },
        title: {
            text: ""
        },
        subtitle: {
            text: `<div style='font-size: 25px; font-weight: bold; color: ${colorText}'>${value.replace('.', ',')}%</div> <span style='font-size: 15px; font-weight: bold;'>${title}</span>`,
            align: "center",
            verticalAlign: "middle",
            style: {
                "textAlign": "center"
            },
            x: 0,
            y: 8,
            useHTML: true
        },
        series: [{
            type: 'pie',
            enableMouseTracking: false,
            innerSize: '75%',
            dataLabels: {
                enabled: false
            },
            data: [{
                y: parseFloat(value),
                color: colorBar
            }, {
                y: 100,
                color: '#ddd'
            }]
        }]
    };

    return (
        <Fragment>
            <div className="w-full bg-white rounded-md border-gray-300 border p-1">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </Fragment>
    )
}

export default Progress;

/**
 *                 <div>
                    <Progress/>
                </div>
 */