import React, { Fragment } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ProgressProps {
    title?: string;
    value?: any;
    colorBar?: any;
    colorText?: any;
}

const ProgressBar = ({ title, value, colorBar, colorText }: ProgressProps) => {

    const options = {
        chart: {
            type: 'bar',
            height: 130,
            padding: 0,

        },
        title: {
            text: "",
            align: 'center',
            margin: 0
        },
        subtitle: {
            text: '',
            verticalAlign: "bottom",
            /* y: 10 */
        },
        credits: false,
        legend: false,
        tooltip: false,
        plotOptions: {
            bar: {
                /* stacking: 'normal', */
                borderWidth: 0,
                borderRadius: 3
            }
        },
        xAxis: {
            visible: false
        },
        yAxis: {
            visible: true,
            min: 0,
            max: 100,
            title: {
                text: null
            },
            gridLineWidth: 0,
            labels: {
                y: -2
            }
        },
        series: [
            {
                name: "",
                data: [100],
                color: '#ddd',
                grouping: false
                // enableMouseTracking: false, disable tooltip on just this data element
            },
            {
                name: "Percentage",
                data: [parseFloat(value)],
                color: colorBar,
                dataLabels: {
                    enabled: true,
                    inside: true,
                    align: 'right',
                    format: '{point.y}%',
                    style: {
                        color: colorText,
                        textOutline: false,
                    }
                }
            }
        ]
    }

    return (
        <div className="w-full bg-white border border-gray-200 p-3 relative flex items-start justify-center">
            <div className="text-lg text-gray-600 font-medium drop-shadow-md -mb-4 absolute z-10">{title}</div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

export default ProgressBar;