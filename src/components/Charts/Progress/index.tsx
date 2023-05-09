import React, { Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ProgressProps {
    title?: string;
    value?: any;
    colorBar?: string;
    colorText?: string;
}
const Progress = ({ title, value, colorBar, colorText }: ProgressProps) => {

    const options = {
        chart: {
            type: 'pie',
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
            enableMouseTracking: false,
            innerSize: '75%',
            dataLabels: {
                enabled: false
            },
            data: [{
                y: parseFloat(value),
                color: colorBar
            }, {
                y: 100 - parseFloat(value),
                color: '#ddd'
            }]
        }]
    };

    return (
        <Fragment>
            <div className="w-full bg-white border-gray-200 border p-1">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </Fragment>
    )
}

export default Progress;