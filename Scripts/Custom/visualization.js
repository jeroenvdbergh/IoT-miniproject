/**
 * Created by Jeroen on 25/02/2016.
 */

/****/

(function ($) {

    $.fn.drawLineChart = function (xAxis, verbruik) {

        (this).highcharts({
            title: {
                text: '',
            },
            xAxis: {
                categories: xAxis
            },
            yAxis: {
                title: {
                    text: 'Verbruik (kWh)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'kWh'
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'Verbruik',
                data: verbruik
            }]
        });
    }

    $.fn.drawGaugeChart = function (name, data) {

        (this).highcharts({
                chart: {
                    type: 'gauge',
                    className: name,
                    alignTicks: false,
                    plotBackgroundColor: null,
                    plotBackgroundImage: null,
                    plotBorderWidth: 0,
                    plotShadow: false,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0,
                    spacingBottom: 0
                },
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y,4);
                    }
                },

                title: {
                    text: ''
                },

                pane: {
                    startAngle: -150,
                    endAngle: 150
                },
                yAxis: [{
                    min: 0,
                    max: 3,
                    tickPosition: 'outside',
                    lineColor: '#C7053D',
                    lineWidth: 2,
                    minorTickPosition: 'outside',
                    tickColor: '#C7053D',
                    minorTickColor: '#C7053D',
                    tickLength: 5,
                    minorTickLength: 5,
                    labels: {
                        distance: 12,
                        rotation: 'auto'
                    },
                    offset: -20,
                    endOnTick: false
                }],

                series: [{
                    name: 'Verbruik',
                    data: [data],
                    dataLabels: {
                        backgroundColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, '#DDD'],
                                [1, '#FFF']
                            ]
                        }
                    },
                    tooltip: {
                        valueSuffix: 'kWh'
                    }
                }]

            },
            function (chart) {
                /*setInterval(function () {
                    var point = chart.series[0].points[0];
                    point.update(Math.random()*100);

                }, 1000);*/
            });
    }

}(jQuery));

$(window).resize(function () {
    $.each(Chart.instances, function (index, value) {
        value.resize(value.render, true);
    });
});

